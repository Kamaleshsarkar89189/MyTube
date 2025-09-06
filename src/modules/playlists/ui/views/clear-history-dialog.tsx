// components/clear-history-dialog.tsx
"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ClearHistoryDialogProps {
    onConfirm: () => void;
}

export const ClearHistoryDialog = ({ onConfirm }: ClearHistoryDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Clear all history</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Clear watch history?</DialogTitle>
                    <DialogDescription>
                        Your watch history will be cleared from all devices. Your video recommendations
                        will be reset, but may still be influenced by activity on other services.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            setOpen(false);
                        }}
                    >
                        Clear watch history
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
