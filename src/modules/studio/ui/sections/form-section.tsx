"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { APP_URL } from "@/constants";
import { videoUpdateSchema } from "@/db/schema";
import { snakeCaseToTitle } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyCheckIcon, CopyIcon, Globe2Icon, ImagePlusIcon, Loader2Icon, LockIcon, MoreVerticalIcon, RotateCcwIcon, SparklesIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ThumbnailGenerateModal } from "../components/thumbnail-generate-modal";
import { ThumbnailUploadModal } from "../components/thumbnail-upload-modal";
import { useIsAdmin } from "@/hooks/use-is-admin";
interface FormSectionProps {
    videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
    return (
        <Suspense fallback={<FromSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const FromSectionSkeleton = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-9 w-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="space-y-8 lg:col-span-3">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-[220px] w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-[84px] w-[153px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-8 lg:col-span-2">
                    <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden">
                        <Skeleton className="aspect-video" />
                        <div className="px-4 py-4 space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
    const router = useRouter();
    const utils = trpc.useUtils();

    const isAdmin = useIsAdmin();

    const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false)
    const [thumbnailGenerateModalOpen, setThumbnailGenerateModalOpen] = useState(false)

    const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const update = trpc.videos.update.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({ id: videoId });
            toast.success("Video updated");
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const remove = trpc.videos.remove.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            toast.success("Video removed");
            router.push("/studio");
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const revalidate = trpc.videos.revalidate.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({ id: videoId });
            toast.success("Video revalidated");
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const generateDescription = trpc.videos.generateDescription.useMutation({
        onSuccess: () => {
            toast.success("Backgroud job stated", { description: "This may take some time" });
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const generateTitle = trpc.videos.generateTitle.useMutation({
        onSuccess: () => {
            toast.success("Backgroud job stated", { description: "This may take some time" });
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({ id: videoId });
            toast.success("Thumbnail restored");
        },
        onError: () => {
            toast.error("Something went wrong");
        },
    });

    const form = useForm<z.infer<typeof videoUpdateSchema>>({
        resolver: zodResolver(videoUpdateSchema),
        defaultValues: video,
    });

    const onSubmit = (data: z.infer<typeof videoUpdateSchema>) => {
        update.mutate(data);
    }

    const fullUrl = `${APP_URL}/videos/${videoId}`;
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = async () => {
        await navigator.clipboard.writeText(fullUrl);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
            <ThumbnailGenerateModal
                open={thumbnailGenerateModalOpen}
                onOpenChange={setThumbnailGenerateModalOpen}
                videoId={videoId}

            />

            <ThumbnailUploadModal
                open={thumbnailModalOpen}
                onOpenChange={setThumbnailModalOpen}
                videoId={videoId}

            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Video details</h1>
                            <p className="text-xs text-muted-foreground">Manage your video details</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={update.isPending || !form.formState.isDirty}>
                                Save
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
                                        <TrashIcon className="size-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => revalidate.mutate({ id: videoId })}>
                                        <RotateCcwIcon className="size-4 mr-2" />
                                        Revalidate
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="space-y-8 lg:col-span-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-x-2">
                                                Title
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    type="button"
                                                    className="rounded-full size-6 [&_svg]:size-3"
                                                    onClick={() => generateTitle.mutate({
                                                        id: videoId,
                                                    })}
                                                    disabled={generateTitle.isPending || !video.muxTrackId}
                                                >
                                                    {generateTitle.isPending
                                                        ? <Loader2Icon className="animate-spin" />
                                                        : <SparklesIcon />
                                                    }
                                                </Button>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                readOnly={!isAdmin}
                                                disabled={!isAdmin}
                                                placeholder="Add a title to your video"
                                                className={`${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-x-2">
                                                Description
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    type="button"
                                                    className="rounded-full size-6 [&_svg]:size-3"
                                                    onClick={() => generateDescription.mutate({ id: videoId })}
                                                    disabled={generateDescription.isPending || !video.muxTrackId}
                                                >
                                                    {generateDescription.isPending
                                                        ? <Loader2Icon className="animate-spin" />
                                                        : <SparklesIcon />
                                                    }
                                                </Button>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value ?? ""}
                                                rows={10}
                                                placeholder="Add a description to your video"
                                                readOnly={!isAdmin}
                                                disabled={!isAdmin}
                                                className={`resize-none pr-10 ${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""
                                                    }`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Video url field here */}
                            {/* {isAdmin && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="videoUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <span>Video URL (480p)</span>
                                                        <FormField
                                                            control={form.control}
                                                            name="videoUrlSize"
                                                            render={({ field }) => (
                                                                <Input
                                                                    {...field}
                                                                    value={field.value ?? ""} // prevent null error
                                                                    placeholder="Size (e.g., 80MB)"
                                                                    className="h-8 w-36 text-xs"
                                                                    type="text"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        placeholder="Enter video URL (e.g., https://cdn.site.com/video.mp4)"
                                                        type="url"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="downloadUrlOne"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <span>720p Download URL</span>
                                                        <FormField
                                                            control={form.control}
                                                            name="downloadUrlOneSize"
                                                            render={({ field }) => (
                                                                <Input
                                                                    {...field}
                                                                    value={field.value ?? ""} // ✅ prevent null error
                                                                    placeholder="Size (e.g., 100MB, 1GB)"
                                                                    className="h-8 w-36 text-xs"
                                                                    type="text"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        placeholder="Enter video URL (e.g., https://cdn.site.com/video.mp4)"
                                                        type="url"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="downloadUrlTwo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <span>1080p Download URL</span>
                                                        <FormField
                                                            control={form.control}
                                                            name="downloadUrlTwoSize"
                                                            render={({ field }) => (
                                                                <Input
                                                                    {...field}
                                                                    value={field.value ?? ""}
                                                                    placeholder="Size (e.g., 500MB, 2.5GB)"
                                                                    className="h-8 w-36 text-xs"
                                                                    type="text"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        placeholder="Enter video URL (e.g., https://cdn.site.com/video.mp4)"
                                                        type="url"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )} */}
                            <>
                                <FormField
                                    control={form.control}
                                    name="videoUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center gap-4">
                                                    <span>Video URL (480p)</span>
                                                    <FormField
                                                        control={form.control}
                                                        name="videoUrlSize"
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                placeholder="Size (e.g., 80MB)"
                                                                type="text"
                                                                readOnly={!isAdmin}
                                                                disabled={!isAdmin}
                                                                className={`h-8 w-36 text-xs ${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""
                                                                    }`}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    placeholder="Enter video URL (e.g., https://cdn.site.com/video.mp4)"
                                                    type="url"
                                                    readOnly={!isAdmin}
                                                    disabled={!isAdmin}
                                                    className={`${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="downloadUrlOne"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center gap-4">
                                                    <span>720p Download URL</span>
                                                    <FormField
                                                        control={form.control}
                                                        name="downloadUrlOneSize"
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                placeholder="Size (e.g., 100MB, 1GB)"
                                                                type="text"
                                                                readOnly={!isAdmin}
                                                                disabled={!isAdmin}
                                                                className={`h-8 w-36 text-xs ${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""
                                                                    }`}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    placeholder="Enter video URL (e.g., https://cdn.site.com/video.mp4)"
                                                    type="url"
                                                    readOnly={!isAdmin}
                                                    disabled={!isAdmin}
                                                    className={`${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="downloadUrlTwo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center gap-4">
                                                    <span>1080p Download URL</span>
                                                    <FormField
                                                        control={form.control}
                                                        name="downloadUrlTwoSize"
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                placeholder="Size (e.g., 500MB, 2.5GB)"
                                                                type="text"
                                                                readOnly={!isAdmin}
                                                                disabled={!isAdmin}
                                                                className={`h-8 w-36 text-xs ${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""
                                                                    }`}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    placeholder="Enter video URL (e.g., https://cdn.site.com/video.mp4)"
                                                    type="url"
                                                    readOnly={!isAdmin}
                                                    disabled={!isAdmin}
                                                    className={`${!isAdmin ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>

                            {!isAdmin && (
                                <div className="flex flex-col gap-3 items-start bg-muted/40 p-4 rounded-md border mt-4">
                                    <p className="text-muted-foreground text-sm italic">
                                        These fields are view-only. You must be a memeber to modify them.
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href="/membership"
                                            className="inline-block px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black dark:hover:text-white dark:hover:bg-yellow-600"
                                        >
                                            Become a Member of our Team
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Add thumbnail field here */}
                            <FormField
                                name="thumbnailUrl"
                                control={form.control}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Thumbnail</FormLabel>
                                        <FormControl>
                                            <div className="p-0.5 border border-dashed border-neutral-400 relative h-[84px] w-[153px] group">
                                                <Image
                                                    src={video.thumbnailUrl ?? THUMBNAIL_FALLBACK}
                                                    className="object-cover"
                                                    fill
                                                    alt="Thumbnail"
                                                />
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-300 size-7"
                                                        >
                                                            <MoreVerticalIcon className="text-white" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start" side="right">
                                                        <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
                                                            <ImagePlusIcon className="size-4 mr-1" />
                                                            Change
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => setThumbnailGenerateModalOpen(true)}
                                                        >
                                                            <SparklesIcon className="size-4 mr-1" />
                                                            AI-generated
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => restoreThumbnail.mutate({ id: videoId })}
                                                        >
                                                            <RotateCcwIcon className="size-4 mr-1" />
                                                            Restore
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Category
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-8 lg:col-span-2">
                            <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden h-fit">
                                <div className="aspect-video overflow-hidden relative">
                                    <VideoPlayer
                                        playbackId={video.muxPlaybackId}
                                        thumbnailUrl={video.thumbnailUrl}
                                    />
                                </div>
                                <div className="p-4 flex flex-col bg-muted gap-y-6">
                                    <div className="flex justify-between items-center gap-x-2">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">
                                                Video Link
                                            </p>
                                            <div className="flex items-center gap-x-2">
                                                <Link prefetch href={`/videos/${video.id}`}>
                                                    <p className="line-clamp-1 text-sm text-blue-500">
                                                        {fullUrl}
                                                    </p>
                                                </Link>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="shrink-0"
                                                    onClick={onCopy}
                                                    disabled={isCopied}
                                                >
                                                    {isCopied ? <CopyCheckIcon /> : <CopyIcon />}

                                                </Button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">
                                                Video status
                                            </p>
                                            <p className="text-sm">
                                                {snakeCaseToTitle(video.muxStatus || "preparing")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">
                                                Subtitles status
                                            </p>
                                            <p className="text-sm">
                                                {snakeCaseToTitle(video.muxTrackStatus || "no_subtitles")}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Visibility
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select visibility" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>

                                                <SelectItem value="public">
                                                    <div className="flex items-center">
                                                        <Globe2Icon className="size-4 mr-2" />
                                                        Public
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="private">
                                                    <div className="flex items-center">
                                                        <LockIcon className="size-4 mr-2" />
                                                        Private
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end mb-20">
                            <Button
                                type="submit"
                                disabled={update.isPending || !form.formState.isDirty}
                                className="text-sm px-3 py-1.5 lg:hidden"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        This action cannot be undone. This will permanently delete your video.
                    </p>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => remove.mutate({ id: videoId })}
                            disabled={remove.isPending}
                        >
                            {remove.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}