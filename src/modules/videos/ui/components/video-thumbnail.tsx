import { formatDuration } from "@/lib/utils";
import Image from "next/image"
import { THUMBNAIL_FALLBACK, THUMBNAIL_FALLBACK_PIC } from "../../constants";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoThumbnailProps {
    title: string;
    duration: number;
    imageUrl?: string | null;
    previewUrl?: string | null;
    playbackId?: string | null;
}

export const VideoThumbnailSkeleton = () => {
    return (
        <div className="relative w-full overflow-hidden rounded-xl aspect-video">
            <Skeleton className="size-full"/>
        </div>
    )
}

export const VideoThumbnail = ({
    title,
    imageUrl,
    previewUrl,
    duration,
    playbackId,
}: VideoThumbnailProps) => {
    return (
        <div className="relative group">
            {/* Thumbnail wrapper */}
            <div className="relative w-full overflow-hidden rounded-xl aspect-video">
                <Image
                    src={imageUrl || THUMBNAIL_FALLBACK}
                    alt={title}
                    fill
                    className="h-full w-full object-cover group-hover:opacity-0:"
                />
                <Image
                    unoptimized={!!previewUrl}
                    src={previewUrl || THUMBNAIL_FALLBACK_PIC}
                    alt={title}
                    fill
                    className="h-full w-full object-cover opacity-0
                    group-hover:opacity-100"
                />
            </div>

            {/* Video duration box */}
            {playbackId && (
                <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
                    {formatDuration(duration)}
                </div>
            )}
        </div>
    )
}