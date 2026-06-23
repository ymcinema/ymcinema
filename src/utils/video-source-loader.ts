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
    getMovieUrl: (id) => `https://cinemaos.tech/movie/watch/${id}?autoplay=true&server=Titan`,
    getTVUrl: (id, s, e) => `https://cinemaos.tech/tv/watch/${id}?season=${s}&episode=${e}?autoplay=true&embed=true`,
    requiresAuth: false,
  });

  sources.push({
    name: "Watch Now 1",
    key: "Watch Now 1",
    getMovieUrl: (id) => `https://www.vidsrc.wtf/2/movie/${id}?autoplay=true`,
    getTVUrl: (id, s, e) => `https://www.vidsrc.wtf/2/tv/${id}/${s}/${e}?autoplay=true`,
    requiresAuth: false,
  });

  sources.push({
  name: "VidSrcMe",
  key: "VidSrcMe",
  getMovieUrl: (id) =>
    `https://vidsrc-embed.ru/embed/movie?tmdb=${id}&autoplay=1`,
  getTVUrl: (id, s, e) =>
    `https://vidsrc-embed.ru/embed/tv?tmdb=${id}&season=${s}&episode=${e}`,
  requiresAuth: false,
});

  return sources;
}
