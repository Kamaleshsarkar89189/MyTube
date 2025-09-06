import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    MailIcon,
    CopyIcon,
    FacebookIcon,
    LinkedinIcon,
} from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    videoUrl: string;
}

export const ShareModal = ({ open, onOpenChange, videoUrl }: ShareModalProps) => {
    const encodedUrl = encodeURIComponent(videoUrl);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(videoUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-sm sm:max-w-lg bg-background text-foreground rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Share this video
                    </DialogTitle>
                </DialogHeader>

                {/* Copy Box */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted border border-border">
                    <input
                        value={videoUrl}
                        readOnly
                        className="flex-1 bg-transparent outline-none text-sm text-muted-foreground"
                    />
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCopy}
                        className="flex items-center gap-1"
                    >
                        <CopyIcon className="w-4 h-4" />
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <ShareButton
                        href={`https://wa.me/?text=${encodedUrl}`}
                        icon={<FaWhatsapp className="text-green-600 dark:text-green-400 w-4 h-4" />}
                        label="WhatsApp"
                    />
                    <ShareButton
                        href={`https://t.me/share/url?url=${encodedUrl}`}
                        icon={<FaTelegramPlane className="text-blue-500 dark:text-blue-400 w-4 h-4" />}
                        label="Telegram"
                    />
                    <ShareButton
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                        icon={<FacebookIcon className="text-blue-600 dark:text-blue-400 w-4 h-4" />}
                        label="Facebook"
                    />
                    <ShareButton
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                        icon={<LinkedinIcon className="text-blue-700 dark:text-blue-400 w-4 h-4" />}
                        label="LinkedIn"
                    />
                    <ShareButton
                        href={`mailto:?subject=Check out this video&body=${encodedUrl}`}
                        icon={<MailIcon className="text-pink-600 dark:text-pink-400 w-4 h-4" />}
                        label="Email"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Reusable Share Button Component
const ShareButton = ({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) => (
    <Button
        asChild
        variant="outline"
        size="sm"
        className="flex items-center justify-start gap-2 text-sm bg-muted hover:bg-muted/80 transition"
    >
        <a href={href} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2">
                {icon}
                <span>{label}</span>
            </div>
        </a>
    </Button>
);
