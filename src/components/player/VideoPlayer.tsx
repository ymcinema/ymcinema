
import { m } from "framer-motion";
import { useRef, useMemo, memo, lazy, Suspense } from "react";
import type { LabeledStreamLink } from "@/utils/types";

const EMPTY_STREAM_LINKS: LabeledStreamLink[] = [];

const VideoJsPlayer = lazy(() => import("./VideoJsPlayer"));

interface VideoPlayerProps {
  isLoading: boolean;
  iframeUrl: string;
  title: string;
  poster?: string;
  onLoaded: () => void;
  onError: (error: string) => void;
  isApiSource?: boolean;
  streamLinks?: LabeledStreamLink[];
  apiLoading?: boolean;
  apiError?: string | null;
}

const VideoPlayerComponent = ({
  isLoading,
  iframeUrl,
  title,
  poster,
  onLoaded,
  onError,
  isApiSource = false,
  streamLinks = EMPTY_STREAM_LINKS,
  apiLoading = false,
  apiError = null,
}: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeElement = useMemo(() => {
    let sandbox: string | undefined =
      "allow-scripts allow-same-origin allow-presentation";

    try {
      const hostname = new URL(iframeUrl).hostname.toLowerCase();

      // Vidrift runs without the iframe sandbox.
      // CinemaOS and all other providers keep the sandbox enabled.
      if (hostname === "embed.vidrift.net") {
        sandbox = undefined;
      }
    } catch {
      // Keep sandbox enabled if the URL is invalid.
    }

    return (
      <iframe
        key={iframeUrl}
        ref={iframeRef}
        src={iframeUrl}
        title={title}
        className="h-full w-full border-0"
        allowFullScreen
        {...(sandbox ? { sandbox } : {})}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => {
          if (iframeUrl) {
            onLoaded();
          }
        }}
        onError={() => {
          onError("Failed to load iframe content");
        }}
      />
    );
  }, [iframeUrl, onError, onLoaded, title]);

  if (isApiSource) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-black/60">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            </div>
          }
        >
          <VideoJsPlayer
            links={streamLinks}
            title={title}
            poster={poster}
            onLoaded={onLoaded}
            onError={onError}
            isLoading={apiLoading}
            apiError={apiError}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      )}

      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full"
      >
        {iframeElement}
      </m.div>
    </div>
  );
};

const VideoPlayer = memo(VideoPlayerComponent, (prevProps, nextProps) => {
  return (
    prevProps.iframeUrl === nextProps.iframeUrl &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.title === nextProps.title &&
    prevProps.poster === nextProps.poster &&
    prevProps.onLoaded === nextProps.onLoaded &&
    prevProps.onError === nextProps.onError &&
    prevProps.isApiSource === nextProps.isApiSource &&
    prevProps.streamLinks === nextProps.streamLinks &&
    prevProps.apiLoading === nextProps.apiLoading &&
    prevProps.apiError === nextProps.apiError
  );
});

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
