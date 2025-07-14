"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT_FEED } from "@/constants";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface HomeVideosSectionProps {
    categoryId?: string;
    categoryName?: string;
}

export const HomeMovieSection = (props: HomeVideosSectionProps) => {
    return (
        <Suspense key={props.categoryId} fallback={<HomeVideosSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <HomeVideosSectionSuspense {...props} />
            </ErrorBoundary>
        </Suspense>
    );
};

const HomeVideosSectionSkeleton = () => {
    return (
        <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 [@media(min-width:2200px)]:grid-cols-8 gap-4"
        >
            {Array.from({ length: 18 }).map((_, index) => (
                <VideoGridCardSkeleton key={index} />
            ))}
        </div>

    );
};

const HomeVideosSectionSuspense = ({ categoryId, categoryName }: HomeVideosSectionProps) => {
    const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
        { categoryId, limit: DEFAULT_LIMIT_FEED },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    return (
        <div className="bg-muted px-4 py-8 text-white">
            <div className="my-2">
                <div className="border-t border-white/20 mb-2" />
                <p className="text-sm text-muted-foreground">MovieHub
                    {categoryName ? (
                        <span className="text-white"> &nbsp;&gt;&gt;&nbsp; {categoryName}</span>
                    ) : null}
                </p>
            </div>
            <div
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 [@media(min-width:2200px)]:grid-cols-12 gap-4"
            >
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