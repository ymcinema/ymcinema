
export interface VideoSource {
  name: string;
  key: string;
  getMovieUrl: (tmdbId: number) => string;
  getTVUrl: (tmdbId: number, season: number, episode: number) => string;
  requiresAuth: boolean;
  isApiSource?: boolean;
}

export async function fetchVideoSources(): Promise<VideoSource[]> {
  return [
    {
      name: "Watch Now 1",
      key: "Watch Now 1",
      getMovieUrl: (id) =>
        `https://vidstuck.cc/embed/movie/${id}`,
      getTVUrl: (id, s, e) =>
        `https://vidstuck.cc/embed/tv/${id}/${s}/${e}`,
      requiresAuth: false,
    },
    {
      name: "Watch Now 2",
      key: "Watch Now 2",
      getMovieUrl: (id) =>
        `https://player.cinezo.live/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, s, e) =>
        `https://player.cinezo.live/embed/tv/${id}/${s}/${e}?autoplay=true`,
      requiresAuth: false,
    },
    {
      name: "Watch Now 3",
      key: "Watch Now 3",
      getMovieUrl: (id) =>
        `https://embed.vidrift.net/embed/movie/${id}`,
      getTVUrl: (id, s, e) =>
        `https://embed.vidrift.net/embed/tv/${id}/${s}/${e}`,
      requiresAuth: false,
    },
  ];
}
