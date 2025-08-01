"use client";

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";

interface ResultsSectionProps {
    query: string | undefined;
    categoryId: string | undefined;
}


export const ResultsSection = (props: ResultsSectionProps) => {
    return (
        <Suspense
            key={`${props.query}-${props.categoryId}`}
            fallback={<ResultsSectionSkeleton />}
        >
            <ErrorBoundary fallback={<p>Error</p>}>
                <ResultsSectionSuspense {...props} />
            </ErrorBoundary>
        </Suspense>
    );
};

const ResultsSectionSkeleton = () => {
    return (
        <div>
            <div className="hidden flex-col gap-4 md:flex">
                {Array.from({ length: 5 }).map((_, index) => (
                    <VideoRowCardSkeleton key={index} />
                ))}
            </div>
            <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
                {Array.from({ length: 5 }).map((_, index) => (
                    <VideoGridCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

const ResultsSectionSuspense = ({
    query,
    categoryId,
}: ResultsSectionProps) => {
    const [results, resultQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
        { query, categoryId, limit: DEFAULT_LIMIT },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    return (
        <>
            {/* Search result label */}
            {query && (
                <div className="px-1 py-2 text-sm text-muted-foreground">
                    Search result for: <span className="font-medium text-white">{query}</span>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4 gap-y-6 px-2 md:hidden">
                {results.pages
                    .flatMap((page) => page.items)
                    .map((video) => (
                        <VideoGridCard key={video.id} data={video} />
                    ))}
            </div>
            <div className="hidden flex-col gap-4 md:flex">
                {results.pages
                    .flatMap((page) => page.items)
                    .map((video) => (
                        <VideoRowCard key={video.id} data={video} />
                    ))}
            </div>
            <InfiniteScroll
                hasNextPage={resultQuery.hasNextPage}
                isFetchingNextPage={resultQuery.isFetchingNextPage}
                fetchNextPage={resultQuery.fetchNextPage}
            />

        </>
    )
};
