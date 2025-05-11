"use client";

import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { HistoryVideosSection } from "../sections/history-videos-section";
import { ClearHistoryDialog } from "./clear-history-dialog";

export const HistoryView = () => {
    const utils = trpc.useUtils();
    const clearHistory = trpc.playlists.clearHistory.useMutation({
        onSuccess: () => {
            toast.success("Watch history cleared.");
            utils.playlists.getHistory.invalidate();
        },
        onError: () => {
            toast.error("Failed to clear history.");
        },
    });


    return (
        <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">History</h1>
                    <p className="text-xs text-muted-foreground">
                        Videos you have watched
                    </p>
                </div>
                <ClearHistoryDialog onConfirm={() => clearHistory.mutate()} />
            </div>
            <HistoryVideosSection />
        </div>
    );
};
