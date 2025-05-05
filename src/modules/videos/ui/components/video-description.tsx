import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

interface VideoDescriptionProps {
    compactViews: string;
    expandeViews: string;
    compactDate: string;
    expandedDate: string;
    description?: string | null;
};

export const VideoDescription = ({
    compactViews,
    expandeViews,
    compactDate,
    expandedDate,
    description,
}: VideoDescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderDescription = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, i) =>
            urlRegex.test(part) ? (
                <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {part}
                </a>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <div
            onClick={() => setIsExpanded((current) => !current)}
            className="bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition"
        >
            <div className="flex gap-2 text-sm mb-2">
                <span className="font-medium">
                    {isExpanded ? expandeViews : compactViews} views
                </span>
                <span className="font-medium">
                    {isExpanded ? expandedDate : compactDate}
                </span>
            </div>
            <div className="relative">
                <p className={cn(
                    "text-sm whitespace-pre-wrap",
                    !isExpanded && "line-clamp-2",
                )}>
                    {description ? renderDescription(description) : "No description"}
                </p>
                <div className="flex items-center gap-1 mt-4 text-sm font-medium">
                    {isExpanded ? (
                        <>
                            Show less <ChevronUpIcon className="size-4" />
                        </>
                    ) : (
                        <>
                            Show more <ChevronDownIcon className="size-4" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}