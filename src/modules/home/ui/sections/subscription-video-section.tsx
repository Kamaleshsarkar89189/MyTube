"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT_FEED } from "@/constants";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import { useAuth } from "@clerk/nextjs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";



export const SubscriptionVideosSection = () => {
    const { isLoaded, isSignedIn } = useAuth();

    // ✅ Wait until Clerk is fully loaded
    if (!isLoaded) {
        return <SubscriptionVideosSectionSkeleton />;
    }
    // ✅ If not signed in, show a message (or redirect)
    if (!isSignedIn) {
        return <p className="text-center text-muted-foreground">Please sign in to see your subscriptions.</p>;
    }
    return (
        <Suspense fallback={<SubscriptionVideosSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <SubscriptionVideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    );
};

const SubscriptionVideosSectionSkeleton = () => {
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

const SubscriptionVideosSectionSuspense = () => {
    const [videos, query] = trpc.videos.getManySubscribed.useSuspenseInfiniteQuery(
        { limit: DEFAULT_LIMIT_FEED },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    return (
        <div>
            {/* For movie grid card */}
            <div
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 [@media(min-width:2200px)]:grid-cols-12 gap-4"
            >
            {/* <div
                className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 
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