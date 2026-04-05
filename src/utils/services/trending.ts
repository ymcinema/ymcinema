import { tmdb } from "./tmdb";
import { Media } from "../types";
import { TMDBMovieResult, TMDBTVResult } from "../types/tmdb";
import { formatMediaResult } from "./media";

export async function getTrending(): Promise<Media[]> {
  try {
    const res1 = await tmdb.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        sort_by: "popularity.desc",
        page: 1,
      },
    });

    const res2 = await tmdb.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        sort_by: "popularity.desc",
        page: 2,
      },
    });

    const res3 = await tmdb.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        sort_by: "popularity.desc",
        page: 3,
      },
    });

    const allMovies = [
      ...(res1.data as any).results,
      ...(res2.data as any).results,
      ...(res3.data as any).results,
    ];

    // ✅ LIGHT FILTER ONLY (NO DISAPPEAR)
    const filtered = allMovies
      .filter((item: any) => item.poster_path) // only valid posters
      .map((item: any) =>
        formatMediaResult({ ...item, media_type: "movie" })
      );

    // ✅ ALWAYS RETURN SOMETHING
    if (filtered.length === 0) {
      return [];
    }

    return filtered.slice(0, 50);
  } catch (error) {
    console.error("Error fetching Bollywood trending:", error);
    return [];
  }
}