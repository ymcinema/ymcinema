import { tmdb } from "./tmdb";
import { Media, Episode } from "../types";
import { TVDetails } from "../types/tv";
import {
  TMDBTVResult,
  TMDBTVDetailsResult,
  TMDBImagesResponse,
  TMDBKeyword,
  TMDBNetwork,
  TMDBContentRating,
  TMDBEpisodeDetails,
  CastMember,
} from "../types/tmdb";
import { formatMediaResult } from "./media";
import { TMDB } from "../config/constants";

// 🔥 FINAL FIX: Bollywood OTT (NO SERIALS + NO HOLLYWOOD SPAM)
export async function getPopularTVShows(page = 1): Promise<Media[]> {
  try {
    const response = await tmdb.get<{ results: TMDBTVResult[] }>(
      "/discover/tv",
      {
        params: {
          with_original_language: "hi",

          // 🔥 REMOVE SERIALS
          without_genres: 10766, // soap operas

          // 🔥 OTT TYPE CONTENT
          with_genres: "18,80,9648,10765", // drama, crime, mystery, sci-fi

          sort_by: "popularity.desc",

          // 🔥 QUALITY FILTER
          "vote_count.gte": 50,

          // 🔥 MODERN CONTENT ONLY
          "first_air_date.gte": "2018-01-01",

          page,
        },
      }
    );

    let results = response.data.results;

    // ✅ SAFETY FALLBACK (still Hindi but less strict)
    if (!results || results.length < 5) {
      const fallback = await tmdb.get<{ results: TMDBTVResult[] }>(
        "/discover/tv",
        {
          params: {
            with_original_language: "hi",
            without_genres: 10766,
            sort_by: "popularity.desc",
            page,
          },
        }
      );

      results = fallback.data.results;
    }

    return results.map(item =>
      formatMediaResult({ ...item, media_type: "tv" })
    );
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
}

// 🔥 TOP RATED (KEEP AS IS — already good)
export async function getTopRatedTVShows(page = 1): Promise<Media[]> {
  try {
    let response = await tmdb.get<{ results: TMDBTVResult[] }>(
      "/discover/tv",
      {
        params: {
          with_original_language: "hi",
          sort_by: "vote_average.desc",
          "vote_count.gte": 50,
          page,
        },
      }
    );

    let results = response.data.results;

    if (!results || results.length === 0) {
      const fallback = await tmdb.get<{ results: TMDBTVResult[] }>(
        "/tv/top_rated",
        { params: { page } }
      );
      results = fallback.data.results;
    }

    return results.map(item =>
      formatMediaResult({ ...item, media_type: "tv" })
    );
  } catch (error) {
    console.error("Error fetching top rated TV:", error);
    return [];
  }
}

export async function getTrendingTVShows(
  timeWindow: "day" | "week" = "week",
  page = 1
): Promise<Media[]> {
  const response = await tmdb.get<{ results: TMDBTVResult[] }>(
    `/trending/tv/${timeWindow}`,
    {
      params: { page },
    }
  );
  return response.data.results.map(formatMediaResult);
}

export async function getTVEpisode(
  id: number,
  season: number,
  episode: number
): Promise<Episode> {
  const response = await tmdb.get<TVEpisodeResult>(
    `/tv/${id}/season/${season}/episode/${episode}`
  );
  return {
    id: response.data.id,
    name: response.data.name,
    overview: response.data.overview,
    episode_number: response.data.episode_number,
    season_number: response.data.season_number,
    still_path: response.data.still_path,
    air_date: response.data.air_date,
    vote_average: response.data.vote_average,
  };
}

// Get TV show recommendations
export async function getTVRecommendations(id: number): Promise<Media[]> {
  try {
    const response = await tmdb.get<{ results: TMDBTVResult[] }>(
      `/tv/${id}/recommendations`
    );
    return response.data.results.map(item =>
      formatMediaResult({ ...item, media_type: "tv" })
    );
  } catch (error) {
    console.error("Error fetching TV recommendations:", error);
    return [];
  }
}

interface TVEpisodeResult {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  air_date: string;
  vote_average: number;
}

// Get TV show details
export async function getTVDetails(id: number): Promise<TVDetails | null> {
  try {
    const [detailsResponse, imagesResponse] = await Promise.all([
      tmdb.get<TMDBTVDetailsResult>(
        `/tv/${id}?append_to_response=content_ratings`
      ),
      tmdb.get<TMDBImagesResponse>(`/tv/${id}/images`),
    ]);

    const detailsData = detailsResponse.data;
    const imagesData = imagesResponse.data;

    let certification = "";
    if (detailsData.content_ratings && detailsData.content_ratings.results) {
      const usRating = detailsData.content_ratings?.results.find(
        country => country.iso_3166_1 === "US"
      );
      if (usRating) {
        certification = usRating.rating || "";
      }
    }

    let bestLogo = null;
    if (imagesData.logos && imagesData.logos.length > 0) {
      const englishLogos = imagesData.logos.filter(
        logo => logo.iso_639_1 === "en"
      );
      if (englishLogos.length > 0) {
        bestLogo = englishLogos.reduce((prev, current) =>
          prev.vote_average > current.vote_average ? prev : current
        );
      }
    }

    const formattedData = formatMediaResult({
      ...detailsData,
      media_type: "tv",
    });

    return {
      ...formattedData,
      name: formattedData.name || detailsData.name || "Unknown TV Show",
      first_air_date:
        formattedData.first_air_date || detailsData.first_air_date || "",
      episode_run_time: detailsData.episode_run_time || [],
      genres: detailsData.genres || [],
      status: detailsData.status || "",
      tagline: detailsData.tagline || "",
      number_of_episodes: detailsData.number_of_episodes || 0,
      number_of_seasons: detailsData.number_of_seasons || 0,
      seasons: detailsData.seasons || [],
      production_companies: detailsData.production_companies || [],
      certification: certification,
      logo_path: bestLogo ? bestLogo.file_path : null,
    };
  } catch (error) {
    console.error(`Error fetching TV details for id ${id}:`, error);
    return null;
  }
}

// creators
export async function getTVShowCreators(id: number): Promise<CastMember[]> {
  try {
    const response = await tmdb.get<{ created_by: CastMember[] }>(`/tv/${id}`);
    return response.data.created_by || [];
  } catch (error) {
    console.error(`Error fetching creators for TV show ${id}:`, error);
    return [];
  }
}

// images
export async function getTVShowImages(id: number): Promise<TMDBImagesResponse> {
  try {
    const response = await tmdb.get<TMDBImagesResponse>(`/tv/${id}/images`);
    return response.data;
  } catch (error) {
    return { backdrops: [], posters: [] };
  }
}

// keywords
export async function getTVShowKeywords(id: number): Promise<TMDBKeyword[]> {
  try {
    const response = await tmdb.get<{ results: TMDBKeyword[] }>(
      `/tv/${id}/keywords`
    );
    return response.data.results || [];
  } catch {
    return [];
  }
}

// networks
export async function getTVShowNetworks(id: number): Promise<TMDBNetwork[]> {
  try {
    const response = await tmdb.get<{ networks: TMDBNetwork[] }>(`/tv/${id}`);
    return response.data.networks || [];
  } catch {
    return [];
  }
}

// ratings
export async function getTVShowContentRatings(
  id: number
): Promise<TMDBContentRating[]> {
  try {
    const response = await tmdb.get<{ results: TMDBContentRating[] }>(
      `/tv/${id}/content_ratings`
    );
    return response.data.results || [];
  } catch {
    return [];
  }
}

// seasons
export async function getSeasonDetails(
  id: number,
  seasonNumber: number
): Promise<Episode[]> {
  try {
    const response = await tmdb.get<{ episodes: Episode[] }>(
      `/tv/${id}/season/${seasonNumber}`
    );
    return response.data.episodes;
  } catch {
    return [];
  }
}

// episode with guests
export async function getTVEpisodeWithGuests(
  id: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<TMDBEpisodeDetails | null> {
  try {
    const response = await tmdb.get<TMDBEpisodeDetails>(
      `/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?append_to_response=credits`
    );
    return response.data;
  } catch {
    return null;
  }
}