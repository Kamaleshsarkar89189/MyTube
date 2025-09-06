"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT_FEED } from "@/constants";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface VideosSectionProps {
    userId?: string;
}

export const VideosSection = (props: VideosSectionProps) => {
    return (
        <Suspense fallback={<VideosSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <VideosSectionSuspense {...props} />
            </ErrorBoundary>
        </Suspense>
    );
};

const VideosSectionSkeleton = () => {
    return (
        <div
            className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
        >
            {Array.from({ length: 18 }).map((_, index) => (
                <VideoGridCardSkeleton key={index} />
            ))}
        </div>

    );
};

const VideosSectionSuspense = ({ userId }: VideosSectionProps) => {
    const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
        { userId, limit: DEFAULT_LIMIT_FEED },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    return (
        <div>
            {/* For movie grid card */}
            <div
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 [@media(min-width:2200px)]:grid-cols-8 gap-4"
            >
            {/* <div
                className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
            > */}
                {videos.pages
                    .flatMap((page) => page.items)
                    .map((video) => (
                        <VideoGridCard key={video.id} data={video} />
                    ))}
            </div>
            <InfiniteScroll
             hasNextPage={query.hasNextPage}
             isFetchingNextPage={query.isFetchingNextPage}
             fetchNextPage={query.fetchNextPage}
            />
        </div>

    )
}