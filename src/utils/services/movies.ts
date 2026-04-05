import { tmdb } from "./tmdb";
import { trackEvent } from "@/lib/analytics";
import { Media } from "../types";
import { MovieDetails } from "../types/movie";
import {
  TMDBMovieResult,
  TMDBMovieDetailsResult,
  TMDBImagesResponse,
} from "../types/tmdb";
import { formatMediaResult } from "./media";

// 🔥 BOLLYWOOD POPULAR MOVIES
export async function getPopularMovies(page = 1): Promise<Media[]> {
  const response = await tmdb.get<{ results: TMDBMovieResult[] }>(
    "/discover/movie",
    {
      params: {
        with_original_language: "hi",
        region: "IN",
        sort_by: "popularity.desc",
        page,
      },
    }
  );

  return response.data.results.map(formatMediaResult);
}

// 🔥 BOLLYWOOD TOP RATED MOVIES
export async function getTopRatedMovies(page = 1): Promise<Media[]> {
  const response = await tmdb.get<{ results: TMDBMovieResult[] }>(
    "/discover/movie",
    {
      params: {
        with_original_language: "hi",
        region: "IN",
        sort_by: "vote_average.desc",
        "vote_count.gte": 200,
        page,
      },
    }
  );

  return response.data.results.map(formatMediaResult);
}

// Get movie recommendations
export async function getMovieRecommendations(id: number): Promise<Media[]> {
  try {
    const response = await tmdb.get<{ results: TMDBMovieResult[] }>(
      `/movie/${id}/recommendations`
    );

    return response.data.results.map(item =>
      formatMediaResult({ ...item, media_type: "movie" })
    );
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);

    await trackEvent({
      name: "api_error",
      params: {
        api: "tmdb/movie/recommendations",
        error: error instanceof Error ? error.message : String(error),
        movieId: id,
      },
    });

    return [];
  }
}

// Get movie details
export async function getMovieDetails(
  id: number
): Promise<MovieDetails | null> {
  try {
    const [detailsResponse, imagesResponse] = await Promise.all([
      tmdb.get<TMDBMovieDetailsResult>(
        `/movie/${id}?append_to_response=release_dates,credits`
      ),
      tmdb.get<TMDBImagesResponse>(`/movie/${id}/images`),
    ]);

    const detailsData = detailsResponse.data;
    const imagesData = imagesResponse.data;

    let certification = "";
    const usReleases = detailsData.release_dates?.results?.find(
      c => c.iso_3166_1 === "US"
    );

    if (usReleases?.release_dates?.length) {
      certification = usReleases.release_dates[0].certification || "";
    }

    let bestLogo = null;
    const englishLogos = imagesData.logos?.filter(
      logo => logo.iso_639_1 === "en"
    );

    if (englishLogos?.length) {
      bestLogo = englishLogos.reduce((a, b) =>
        a.vote_average > b.vote_average ? a : b
      );
    }

    const formattedData = formatMediaResult({
      ...detailsData,
      media_type: "movie",
    });

    const directors =
      detailsData.credits?.crew?.filter(
        p => p.job === "Director" && p.department === "Directing"
      ) || [];

    return {
      ...formattedData,
      runtime: detailsData.runtime || 0,
      genres: detailsData.genres || [],
      status: detailsData.status || "",
      tagline: detailsData.tagline || "",
      budget: detailsData.budget || 0,
      revenue: detailsData.revenue || 0,
      production_companies: detailsData.production_companies || [],
      directors,
      certification,
      logo_path: bestLogo ? bestLogo.file_path : null,
    };
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);

    await trackEvent({
      name: "api_error",
      params: {
        api: "tmdb/movie/details",
        error: error instanceof Error ? error.message : String(error),
        movieId: id,
      },
    });

    return null;
  }
}

// Get movie images
export async function getMovieImages(id: number): Promise<TMDBImagesResponse> {
  try {
    const response = await tmdb.get<TMDBImagesResponse>(`/movie/${id}/images`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching images for movie ${id}:`, error);
    return { backdrops: [], posters: [] };
  }
}