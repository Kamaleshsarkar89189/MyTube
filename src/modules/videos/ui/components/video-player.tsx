"use client";
import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FALLBACK } from "../../constants";

interface VideoPlayerProps {
    playbackId?: string | null | undefined;
    videoUrl?: string | null;
    thumbnailUrl?: string | null | undefined;
    autoPlay?: boolean;
    onPlay?: () => void;
}

export const VideoPalyerSkeleton = () => {
    return <div className="aspect-video bg-black rounded-xl" />;
};

export const VideoPlayer = ({
    playbackId,
    videoUrl,
    thumbnailUrl,
    autoPlay,
    onPlay,
}: VideoPlayerProps) => {
    if (playbackId) {
        return (
            <MuxPlayer
                playbackId={playbackId}
                poster={thumbnailUrl || THUMBNAIL_FALLBACK}
                playerInitTime={0}
                autoPlay={autoPlay}
                thumbnailTime={0}
                className="w-full h-full object-contain"
                accentColor="#FF2056"
                onPlay={onPlay}
            />
        );
    }
    if (videoUrl) {
        return (
            <video
                src={videoUrl}
                controls
                autoPlay={autoPlay}
                poster={thumbnailUrl ?? THUMBNAIL_FALLBACK}
                onPlay={onPlay}
                className="w-full h-full rounded-xl object-contain"
            />
        );
    }


    return (
        <div className="aspect-video bg-black rounded-xl flex items-center justify-center text-white">
            No video source found
        </div>
    );
};

// Past Code

// "use client";
// import MuxPlayer from "@mux/mux-player-react"
// import { THUMBNAIL_FALLBACK } from "../../constants";
// interface VideoPlayerProps {
//     playbackId?: string | null | undefined;
//     thumbnailUrl?: string | null | undefined;
//     autoPlay?: boolean;
//     onPlay?: () => void;
// }


// export const VideoPalyerSkeleton = () => {
//     return <div className="aspect-video bg-black rounded-xl " />
// };
// export const VideoPlayer = ({
//     playbackId,
//     thumbnailUrl,
//     autoPlay,
//     onPlay,
// }: VideoPlayerProps) => {
//     // if (!playbackId) return null;

//     return (
//         <MuxPlayer
//             playbackId={playbackId || ""}
//             poster={thumbnailUrl || THUMBNAIL_FALLBACK}
//             playerInitTime={0}
//             autoPlay={autoPlay}
//             thumbnailTime={0}
//             className="w-full h-full object-contain"
//             accentColor="#FF2056"
//             onPlay={onPlay}
//         />
//     )
// }
