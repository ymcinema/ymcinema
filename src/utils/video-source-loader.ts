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
    name: "Watch Now 1",
    key: "Watch Now 1",
    getMovieUrl: (id) => `https://vidcore.net/movie/${id}?autoplay=true`,
    getTVUrl: (id, s, e) => `https://vidcore.net/tv/${id}/${s}/${e}?autoplay=true`,
    requiresAuth: false,
  });

  sources.push({
    name: "Watch Now 2",
    key: "Watch Now 2",
    getMovieUrl: (id) => `https://vidsrc.wtf/api/1/movie/${id}`,
    getTVUrl: (id, s, e) => `https://vidsrc.wtf/api/1/tv/${id}/${s}/${e}`,
    requiresAuth: false,
  });

  sources.push({
    name: "Watch Now 3",
    key: "Watch Now 3",
    getMovieUrl: (id) => `https://embed.cinevo.site/movie/${id}?autoplay=true`,
    getTVUrl: (id, s, e) => `https://embed.cinevo.site/tv/${id}/${s}/${e}?autoplay=true`,
    requiresAuth: false,
  });

  return sources;
}
