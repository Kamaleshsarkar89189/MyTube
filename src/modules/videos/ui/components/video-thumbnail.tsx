import { formatDuration } from "@/lib/utils";
import Image from "next/image"
// import { THUMBNAIL_FALLBACK, THUMBNAIL_FALLBACK_PIC } from "../../constants";
import { Skeleton } from "@/components/ui/skeleton";
import { THUMBNAIL_FALLBACK, THUMBNAIL_FALLBACK_PIC } from "@/modules/videos/constants";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

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
            <Skeleton className="size-full" />
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
    const pathname = usePathname();
    const imageWrapperClass = useMemo(() => {
        return pathname === "/studio"
            ? "relative w-full overflow-hidden rounded-xl aspect-video"
            : "relative h-60 md:h-60 lg:h-60 w-full";
    }, [pathname]);
    const isStudioPage = pathname === "/studio";
    return (
        // <div className="relative group">
        // For movie grid
        <div className="relative bg-[#1e1e1e] text-white rounded-md overflow-hidden shadow-md hover:scale-[1.01] transition-transform">
            {/* Thumbnail wrapper */}
            {/* For Movie grid */}
            <div className={imageWrapperClass}>
            {/* <div className="relative h-60 md:h-60 lg:h-60 w-full"> */}
                {/* <div className="relative w-full overflow-hidden rounded-xl aspect-video"> */}
                <Image
                    src={imageUrl || THUMBNAIL_FALLBACK}
                    alt={title}
                    fill
                    className="h-full w-full object-cover group-hover:opacity-0"
                />
                <Image
                    unoptimized={!!previewUrl}
                    src={previewUrl || THUMBNAIL_FALLBACK_PIC}
                    alt={title}
                    fill
                    className="h-full w-full object-cover opacity-0
                    group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
                    {/* <p className="text-xs text-gray-300">{movie.date}</p> */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
                        {!isStudioPage && (
                            <p className="font-semibold text-sm leading-tight">{title}</p>
                        )}
                    </div>
                    {/* <p className="text-xs text-gray-400">{movie.quality}</p> */}
                </div>
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