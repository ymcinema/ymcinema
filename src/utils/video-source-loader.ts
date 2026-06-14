export interface VideoSource {
  name: string;
  key: string;
  getMovieUrl: (tmdbId: number) => string;
  getTVUrl: (tmdbId: number, season: number, episode: number) => string; // uppercase V
  requiresAuth: boolean;
  isApiSource?: boolean;
}

export async function fetchVideoSources(): Promise<VideoSource[]> {
  // No parameters needed - sources are just URL builders
  const sources: VideoSource[] = [];

  sources.push({
    name: "Watch Now",
    key: "Watch Now",
    getMovieUrl: (id) => `https://cinemaos.tech/movie/watch/${id}?autoplay=true`,
    getTVUrl: (id, s, e) => `https://cinemaos.tech/tv/watch/${id}?/${season=s}/&${episode=e}?autoplay=true`,
    requiresAuth: false,
  });

  sources.push({
    name: "Watch Now 2",
    key: "Watch Now 2",
    getMovieUrl: (id) => `https://player.cinezo.live/embed/movie/${id}?autoplay=true`,
    getTVUrl: (id, s, e) => `https://player.cinezo.live/embed/tv/${id}/${s}/${e}?autoplay=true`,
    requiresAuth: false,
  });

  return sources;
}
