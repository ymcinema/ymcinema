
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
        `https://embed.vidrift.net/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, s, e) =>
        `https://embed.vidrift.net/embed/tv/${id}/${s}/${e}?autoplay=true`,
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
        `https://nxsha.space/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, s, e) =>
        `https://nxsha.space/embed/tv/${id}/${s}/${e}?autoplay=true`,
      requiresAuth: false,
    },
    {
      name: "Watch Now 4",
      key: "Watch Now 4",
      getMovieUrl: (id) =>
        `https://vidbolt.xyz/movie/${id}?autoplay=true`,
      getTVUrl: (id, s, e) =>
        `https://vidbolt.xyz/tv/${id}/${s}/${e}?autoplay=true`,
      requiresAuth: false,
    },
  ];
}
