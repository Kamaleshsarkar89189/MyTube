import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format, formatDistanceToNow } from "date-fns";
import { LucideShare2 } from "lucide-react";
import { useMemo, useState } from "react";
import { VideoGetOneOutput } from "../../types";
import { ShareModal } from "./share-modal";
import { VideoDescription } from "./video-description";
import VideoMenu from "./video-menu";
import { VideoOwner } from "./video-owner";
import VideoReactions from "./video-reactions";
import { DownloadModalButton } from "@/modules/movie/ui/components/download-modal-button";


interface VideoTopRowProps {
    video: VideoGetOneOutput;
};

export const VideoTopRowSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* Title Skeleton */}
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-4/5 md:w-2/5" />
            </div>

            {/* User & Actions Skeleton */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 w-[70%]">
                    {/* Profile Picture Skeleton */}
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />

                    {/* Username & Info Skeleton */}
                    <div className="flex flex-col gap-2 w-full">
                        <Skeleton className="h-5 w-4/5 md:w-2/6" />
                        <Skeleton className="h-5 w-3/5 md:w-1/5" />
                    </div>
                </div>
                <Skeleton className="h-9 w-2/6 md:1/6 rounded-full" />
            </div>
            <div className="h-[120px] w-full" />
        </div>
    );
};


export const VideoTopRow = ({ video }: VideoTopRowProps) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [hasClickedAd, setHasClickedAd] = useState(false);

    const handleAdClick = () => {
        // Open Monetag link in a new tab
        window.open("https://otieu.com/4/9519564", "_blank");
        setHasClickedAd(true); // Next click shows download
    };

    const comapactViews = useMemo(() => {
        return Intl.NumberFormat("en", {
            notation: "compact"
        }).format(video.viewCount);
    }, [video.viewCount]);
    const expandedViews = useMemo(() => {
        return Intl.NumberFormat("en", {
            notation: "standard"
        }).format(video.viewCount);
    }, [video.viewCount]);

    const compactDate = useMemo(() => {
        return formatDistanceToNow(video.createdAt, { addSuffix: true });
    }, [video.createdAt]);
    const expandedDate = useMemo(() => {
        return format(video.createdAt, "d MMM yyyy");
    }, [video.createdAt])
    return (
        <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-xl font-semibold">{video.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <VideoOwner user={video.user} videoId={video.id} />
                <div className="flex overflow-x-auto sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:pb-0 sm:mb-0 gap-2">
                    {!hasClickedAd ? (
                        <Button
                            onClick={handleAdClick}
                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                        >
                            ⚡ Click to Download ⚡
                        </Button>
                    ) : (
                        // <Button
                        //     asChild
                        //         className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                        // >
                        //     <a
                        //             href={`/api/download?url=${encodeURIComponent(video.videoUrl ?? "")}&title=${encodeURIComponent(video.title ?? "video")}`}
                        //         target="_blank"
                        //         rel="noopener noreferrer"
                        //     >
                        //         Download
                        //     </a>
                        // </Button>
                            <DownloadModalButton
                                downloadOptions={[
                                    {
                                        quality: video.downloadQualityThree ?? "",
                                        size: video.downloadUrlThreeSize ?? "",
                                        url: video.downloadUrlThree ?? "", 
                                        title: video.title,
                                    },
                                    {
                                        quality: video.downloadQualityTwo ?? "",
                                        size: video.downloadUrlTwoSize ?? "",
                                        url: video.downloadUrlTwo ?? "", 
                                        title: video.title,
                                    },
                                    {
                                        quality: video.downloadQualityOne ?? "",
                                        size: video.downloadUrlOneSize ?? "",
                                        url: video.downloadUrlOne ?? "",
                                        title: video.title,
                                    },
                                    {
                                        quality: video.videoQuality ?? "",
                                        size: video.videoUrlSize ?? "",
                                        url: video.videoUrl ?? "",
                                        title: video.title,
                                    },
                                ]}
                            />

                    )}

                    <VideoReactions
                        videoId={video.id}
                        likes={video.likeCount}
                        dislikes={video.dislikeCount}
                        viewerReaction={video.viewerReaction}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsShareModalOpen(true)}
                        className="rounded-full hover:bg-muted transition"
                    >
                        <LucideShare2 className="w-5 h-5" />
                    </Button>
                    <ShareModal
                        open={isShareModalOpen}
                        onOpenChange={setIsShareModalOpen}
                        videoUrl={typeof window !== "undefined" ? window.location.href : ""}
                    />
                    <VideoMenu videoId={video.id} variant="secondary" />
                </div>
            </div>
            <VideoDescription
                compactViews={comapactViews}
                expandeViews={expandedViews}
                compactDate={compactDate}
                expandedDate={expandedDate}
                description={video.description}
            />
        </div>
    )
}