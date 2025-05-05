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
import { FaWhatsapp, FaTelegramPlane, FaInstagram } from "react-icons/fa";
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share this video</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                    <input
                        value={videoUrl}
                        readOnly
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                        <CopyIcon className="size-4 mr-1" />
                        {copied ? "Copied" : "Copy"}
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button variant="outline" asChild>
                        <a
                            href={`https://wa.me/?text=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaWhatsapp className="mr-2" />
                            WhatsApp
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a
                            href={`https://t.me/share/url?url=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTelegramPlane className="mr-2" />
                            Telegram
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookIcon className="mr-2" />
                            Facebook
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedinIcon className="mr-2" />
                            LinkedIn
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a
                            href={`mailto:?subject=Check out this video&body=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MailIcon className="mr-2" />
                            Email
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="mr-2" />
                            Instagram
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
