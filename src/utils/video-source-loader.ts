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
    // 1. Cinezo
    {
      name: "Watch Now 1",
      key: "Watch Now 1",
      getMovieUrl: (id) =>
        `https://player.cinezo.live/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, season, episode) =>
        `https://player.cinezo.live/embed/tv/${id}/${season}/${episode}?autoplay=true`,
      requiresAuth: false,
    },

    // 2. NXsha
    {
      name: "Watch Now 2",
      key: "Watch Now 2",
      getMovieUrl: (id) =>
        `https://nxsha.space/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, season, episode) =>
        `https://nxsha.space/embed/tv/${id}/${season}/${episode}?autoplay=true`,
      requiresAuth: false,
    },

    // 3. Cinesrc
    {
      name: "Watch Now 3",
      key: "Watch Now 3",
      getMovieUrl: (id) =>
        `https://cinesrc.st/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, season, episode) =>
        `https://cinesrc.st/embed/tv/${id}?s=${season}&e=${episode}&autoplay=true`,
      requiresAuth: false,
    },

    // 4. Vidrift
    {
      name: "Watch Now 4",
      key: "Watch Now 4",
      getMovieUrl: (id) =>
        `https://embed.vidrift.net/embed/movie/${id}?autoplay=true`,
      getTVUrl: (id, season, episode) =>
        `https://embed.vidrift.net/embed/tv/${id}/${season}/${episode}?autoplay=true`,
      requiresAuth: false,
    },

    // 5. Mapple
    {
      name: "Watch Now 5",
      key: "Watch Now 5",
      getMovieUrl: (id) =>
        `https://mapple.fun/watch/movie/${id}?autoplay=true`,
      getTVUrl: (id, season, episode) =>
        `https://mapple.fun/watch/tv/${id}?season=${season}&episode=${episode}&autoplay=true`,
      requiresAuth: false,
    },
  ];
}