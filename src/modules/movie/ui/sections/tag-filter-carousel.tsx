"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect: (value: string | null) => void;
    data: {
        value: string;
        label: string;
    }[];
}

export const TagFilterCarousel = ({
    value,
    onSelect,
    data,
    isLoading,
}: FilterCarouselProps) => {
    return (
        <div className="w-full py-3 px-3 bg-white dark:bg-[#2c2c2c] shadow-sm transition-colors duration-300">
            {/* <h1 className="text-2xl font-bold text-center text-foreground mb-4">
                Categories
            </h1> */}
            <div className="flex flex-wrap gap-2">
                {!isLoading && (
                    <div/>
                )}
                {isLoading &&
                    Array.from({ length: 14 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="rounded-lg h-7 w-[100px]" />
                        </div>
                    ))}
                {!isLoading &&
                    [...data].slice(0, 6).map((item) => (
                        <div key={item.value} onClick={() => onSelect(item.value)}>
                            <Badge
                                variant={value === item.value ? "default" : "secondary"}
                                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                            >
                                {item.label}
                            </Badge>
                        </div>
                    ))}
            </div>
        </div>
    );
};
