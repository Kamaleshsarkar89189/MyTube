"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import { useAuth } from "@clerk/nextjs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";



export const HistoryVideosSection = () => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return <HistoryVideosSectionSkeleton />;
    }

    if (!isSignedIn) {
        return <p className="text-center text-muted-foreground">Please sign in to see your subscriptions.</p>;
    }
    return (
        <Suspense fallback={<HistoryVideosSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <HistoryVideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    );
};

const HistoryVideosSectionSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
                {Array.from({ length: 18 }).map((_, index) => (
                    <VideoGridCardSkeleton key={index} />
                ))}
            </div>
            <div className="hidden flex-col gap-4 md:flex">
                {Array.from({ length: 18 }).map((_, index) => (
                    <VideoRowCardSkeleton key={index} size="compact" />
                ))}
            </div>
        </div>

    );
};

const HistoryVideosSectionSuspense = () => {

    const [videos, query] = trpc.playlists.getHistory.useSuspenseInfiniteQuery(
        { limit: DEFAULT_LIMIT },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    return (
            <>
                <div className="grid grid-cols-2 gap-4 gap-y-10 md:hidden">
                {/* <div className="flex flex-col gap-4 gap-y-10 md:hidden"> */}
                    {videos.pages
                        .flatMap((page) => page.items)
                        .map((video) => (
                            <VideoGridCard key={video.id} data={video} />
                        ))}
                </div>
                <div
                    className="hidden flex-col gap-4 md:flex">
                    {videos.pages
                        .flatMap((page) => page.items)
                        .map((video) => (
                            <VideoRowCard key={video.id} data={video} size="compact" />
                        ))}
                </div>
                <InfiniteScroll
                    hasNextPage={query.hasNextPage}
                    isFetchingNextPage={query.isFetchingNextPage}
                    fetchNextPage={query.fetchNextPage}
                />
            </>

    )
}