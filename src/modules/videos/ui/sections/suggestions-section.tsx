"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { VideoRowCard, VideoRowCardSkeleton } from "../components/video-row-card";
import { VideoGridCard, VideoGridCardSkeleton } from "../components/video-grid-card";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface SuggestionsSectionProps {
    videoId: string;
    isManual?: boolean;
};

export const SuggestionSection = ({
    videoId,
    isManual,
}: SuggestionsSectionProps) => {
    return (
        <Suspense fallback={<SuggestionsSectionSkeleton/>}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <SuggestionSectionSuspense videoId={videoId} isManual={isManual}/>
            </ErrorBoundary>
        </Suspense>
    )
}

const SuggestionsSectionSkeleton = () => {
    return (
        <>
            <div className="hidden md:block space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <VideoRowCardSkeleton key={index} size="compact" />
                ))}
            </div>
            <div>
                {Array.from({ length: 6 }).map((_, index) => (
                    <VideoGridCardSkeleton key={index} />
                ))}
            </div>
        </>
    );
};

const SuggestionSectionSuspense = ({
    videoId,
    isManual,
}: SuggestionsSectionProps) => {
    const [suggestions, query] = trpc.suggestions.getMany.useSuspenseInfiniteQuery({
        videoId,
        limit: DEFAULT_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
    return (
        <>
            <div className="hidden md:block space-y-2">
                {suggestions.pages.flatMap((page) => page.items.map((video) => (
                    <VideoRowCard
                        key={video.id}
                        data={video}
                        size="compact"
                    />
                )))}
            </div>
            <div className="grid grid-cols-2 gap-4 gap-y-6 px-2 md:hidden">
                {suggestions.pages.flatMap((page) => page.items.map((video) => (
                    <VideoGridCard
                        key={video.id}
                        data={video}
                    />
                )))}
            </div>
            <InfiniteScroll
             isManual={isManual}
             hasNextPage={query.hasNextPage}
             isFetchingNextPage={query.isFetchingNextPage}
             fetchNextPage={query.fetchNextPage}
            />
        </>
    )
}