"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export const SearchInput = ({ inputRef }: { inputRef?: React.RefObject<HTMLInputElement | null> }) => {
    return (
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <SearchInputSuspense inputRef={inputRef} />
        </Suspense>
    )
}
export const SearchInputSuspense = ({ inputRef }: { inputRef?: React.RefObject<HTMLInputElement | null> }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const categoryId = searchParams.get("categoryId") || "";

    const [value, setValue] = useState(query);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanedQuery = value.trim().replace(/\s+/g, " ");

        const url = new URL("/search", APP_URL);

        if (cleanedQuery) {
            url.searchParams.set("query", cleanedQuery);
        } else {
            url.searchParams.delete("query");
        }

        if (categoryId) {
            url.searchParams.set("categoryId", categoryId);
        }

        setValue(cleanedQuery);
        router.push(url.toString());
    }
    return (
        <form className="flex w-full max-w-[600px]" onSubmit={handleSearch}>
            <div className="relative w-full">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    ref={inputRef} 
                    type="text"
                    placeholder="Search"
                    className="w-full pl-4 py-2 pr-12 bg-background rounded-l-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                />
                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setValue("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                    >
                        <XIcon className="text-gray-500" />
                    </Button>
                )}
            </div>
            <button
                disabled={!value.trim()}
                type="submit"
                className="px-5 py-2 bg-muted-foreground bg-gray-100 border border-gray-300 border-l-0 rounded-r-full hover:bg-gray-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <SearchIcon className="size-5" />
            </button>
        </form>
    )
}