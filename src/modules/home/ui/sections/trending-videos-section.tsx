"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT_FEED } from "@/constants";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";



export const TrendingVideosSection = () => {
    return (
        <Suspense fallback={<TrendingVideosSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <TrendingVideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    );
};

const TrendingVideosSectionSkeleton = () => {
    return (
        <div
            className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 
             [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6"
        >
            {Array.from({ length: 18 }).map((_, index) => (
                <VideoGridCardSkeleton key={index} />
            ))}
        </div>
    );
};

const TrendingVideosSectionSuspense = () => {
    const [videos, query] = trpc.videos.getManyTrending.useSuspenseInfiniteQuery(
        { limit: DEFAULT_LIMIT_FEED },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    return (
        <div>
            {/* Foe movie grid card */}
            <div
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 [@media(min-width:2200px)]:grid-cols-12 gap-4"
            >
            {/* <div
                className="gap-4 gap-y-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 
                [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6"
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