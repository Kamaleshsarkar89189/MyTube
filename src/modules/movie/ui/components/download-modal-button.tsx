"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadModalButton({ downloadOptions }: {
    downloadOptions: {
        quality: string;
        size: string;
        url: string;
        title: string;
    }[];
}) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition">
                    ⚡ Click to Download ⚡
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#1e1e1e] p-6 border border-gray-700 text-white">
                    <div className="text-center border-b pb-2 mb-4 text-cyan-400 font-bold text-lg">
                        ⭑⭑ Download Links ⭑⭑
                    </div>

                    {downloadOptions.map((option, index) => (
                        <div key={index} className="mb-4 text-center">
                            <div className="text-red-500 font-bold mb-2">{option.quality}</div>
                            <a
                                href={`/api/download?url=${encodeURIComponent(option.url)}&title=${encodeURIComponent(option.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 rounded transition"
                            >
                                ⚡CLICK HERE TO DOWNLOAD ({option.size})⚡
                            </a>
                        </div>
                    ))}

                    <Dialog.Close asChild>
                        <button className="absolute top-3 right-3 text-gray-300 hover:text-white transition">
                            <X />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
