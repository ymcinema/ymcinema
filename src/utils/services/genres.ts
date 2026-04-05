import { tmdb } from "./tmdb";
import { Media } from "../types";
import { TMDBMovieResult } from "../types/tmdb";
import { formatMediaResult } from "./media";

// Genre IDs
const GENRES = {
  ACTION: 28,
  DRAMA: 18,
  COMEDY: 35,
  HORROR: 27,
  ROMANCE: 10749,
  SCIFI: 878,
  THRILLER: 53,
  ANIMATION: 16,
  FAMILY: 10751,
  DOCUMENTARY: 99,
  MYSTERY: 9648,
  FANTASY: 14,
} as const;

// 🔥 SMART GENRE FUNCTION
const getGenreContent = async (
  genreId: number,
  page: number = 1
): Promise<Media[]> => {
  try {
    // 🔥 Step 1 — Bollywood first
    let response = await tmdb.get("/discover/movie", {
      params: {
        with_genres: genreId,
        with_original_language: "hi",
        region: "IN",
        sort_by: "popularity.desc",
        page,
      },
    });

    let results = response.data.results;

    // 🔥 Step 2 — If too few → mix global
    if (!results || results.length < 10) {
      const globalRes = await tmdb.get("/discover/movie", {
        params: {
          with_genres: genreId,
          sort_by: "popularity.desc",
          page,
        },
      });

      const globalResults = globalRes.data.results;

      // 🔥 MIX Bollywood + Global (no duplicates)
      const combined = [...results, ...globalResults];

      const unique = Array.from(
        new Map(combined.map(item => [item.id, item])).values()
      );

      results = unique;
    }

    return results
      .slice(0, 30)
      .map((item: TMDBMovieResult) =>
        formatMediaResult({ ...item, media_type: "movie" })
      );
  } catch (error) {
    console.error(`Error fetching genre ${genreId}`, error);
    return [];
  }
};

// 🎬 GENRES
export const getActionMovies = (page = 1) =>
  getGenreContent(GENRES.ACTION, page);

export const getDramaMovies = (page = 1) =>
  getGenreContent(GENRES.DRAMA, page);

export const getComedyMovies = (page = 1) =>
  getGenreContent(GENRES.COMEDY, page);

export const getHorrorMovies = (page = 1) =>
  getGenreContent(GENRES.HORROR, page);

export const getRomanceMovies = (page = 1) =>
  getGenreContent(GENRES.ROMANCE, page);

export const getSciFiMovies = (page = 1) =>
  getGenreContent(GENRES.SCIFI, page);

export const getThrillerMovies = (page = 1) =>
  getGenreContent(GENRES.THRILLER, page);

export const getAnimationMovies = (page = 1) =>
  getGenreContent(GENRES.ANIMATION, page);

export const getFamilyMovies = (page = 1) =>
  getGenreContent(GENRES.FAMILY, page);

export const getDocumentaryMovies = (page = 1) =>
  getGenreContent(GENRES.DOCUMENTARY, page);

export const getMysteryMovies = (page = 1) =>
  getGenreContent(GENRES.MYSTERY, page);

export const getFantasyMovies = (page = 1) =>
  getGenreContent(GENRES.FANTASY, page);

// 🔥 BOLLYWOOD ROW
export const getBollywoodMovies = async (page = 1): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        region: "IN",
        sort_by: "popularity.desc",
        "vote_count.gte": 50,
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "movie" })
    );
  } catch (error) {
    console.error("Bollywood error:", error);
    return [];
  }
};

// 👶 KIDS
export const getMoviesForKids = (page = 1) =>
  getGenreContent(GENRES.FAMILY, page);

// 📺 TV
export const getBingeWorthySeries = async (page = 1): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: {
        with_type: 2,
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "tv" })
    );
  } catch (error) {
    console.error("TV error:", error);
    return [];
  }
};

// 🔥 TRUE STORIES (Bollywood + fallback)
export const getBasedOnTrueStories = async (
  page = 1
): Promise<Media[]> => {
  try {
    let response = await tmdb.get("/discover/movie", {
      params: {
        with_keywords: 9672,
        with_original_language: "hi",
        region: "IN",
        sort_by: "popularity.desc",
        page,
      },
    });

    let results = response.data.results;

    if (!results || results.length < 5) {
      response = await tmdb.get("/discover/movie", {
        params: {
          with_keywords: 9672,
          sort_by: "popularity.desc",
          page,
        },
      });

      results = response.data.results;
    }

    return results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "movie" })
    );
  } catch (error) {
    console.error("True story error:", error);
    return [];
  }
};

// 🌍 HOLLYWOOD
export const getHollywoodMovies = async (page = 1): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        with_original_language: "en",
        region: "US",
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "movie" })
    );
  } catch (error) {
    console.error("Hollywood error:", error);
    return [];
  }
};

// 🇪🇺 EUROPE
export const getEuropeanCinema = async (
  page = 1
): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        region: "FR",
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "movie" })
    );
  } catch (error) {
    console.error("Europe error:", error);
    return [];
  }
};

// 🇰🇷 KOREAN
export const getKoreanDramas = async (page = 1): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: {
        with_original_language: "ko",
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "tv" })
    );
  } catch (error) {
    console.error("Korean error:", error);
    return [];
  }
};

// 🇯🇵 ANIME
export const getJapaneseAnime = async (page = 1): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: {
        with_original_language: "ja",
        with_genres: GENRES.ANIMATION,
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "tv" })
    );
  } catch (error) {
    console.error("Anime error:", error);
    return [];
  }
};

// 🎥 PROVIDERS
const PROVIDERS = {
  YOUTUBE: 192,
  HBOMAX: 384,
  PEACOCK: 386,
  CRUNCHYROLL: 283,
};

const getProviderContent = async (
  providerId: number,
  page: number = 1
): Promise<Media[]> => {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        with_watch_providers: providerId,
        watch_region: "US",
        sort_by: "popularity.desc",
        page,
      },
    });

    return response.data.results.map((item: TMDBMovieResult) =>
      formatMediaResult({ ...item, media_type: "movie" })
    );
  } catch (error) {
    console.error("Provider error:", error);
    return [];
  }
};

export const getYouTubeOriginals = (page = 1) =>
  getProviderContent(PROVIDERS.YOUTUBE, page);

export const getHBOMax = (page = 1) =>
  getProviderContent(PROVIDERS.HBOMAX, page);

export const getPeacock = (page = 1) =>
  getProviderContent(PROVIDERS.PEACOCK, page);

export const getCrunchyroll = (page = 1) =>
  getProviderContent(PROVIDERS.CRUNCHYROLL, page);