import { z } from "zod"
import { db } from "@/db";
import { subscriptions, users, videoReactions, videos, videoUpdateSchema, videoViews } from "@/db/schema";
import { mux } from "@/lib/mux";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, getTableColumns, inArray, isNotNull, lt, or } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { workflow } from "@/lib/workflow";



export const videosRouter = createTRPCRouter({
    getManySubscribed: protectedProcedure
        .input(
            z.object({
                cursor: z.object({
                    id: z.string().uuid(),
                    updatedAt: z.date(),
                })
                    .nullish(),
                limit: z.number().min(1).max(100),
            })
        )
        .query(async ({ input, ctx }) => {
            const { id: userId } = ctx.user;
            const { cursor, limit } = input;

            const viewerSubscriptions = db.$with("viewer_subscriptions").as(
                db
                    .select({
                        userId: subscriptions.creatorId,
                    })
                    .from(subscriptions)
                    .where(eq(subscriptions.viewerId, userId))
            );

            const data = await db
                .with(viewerSubscriptions)
                .select({
                    ...getTableColumns(videos),
                    user: users,
                    viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
                    likeCount: db.$count(videoReactions, and(
                        eq(videoReactions.videoId, videos.id),
                        eq(videoReactions.type, "like")
                    )),
                    dislikeCount: db.$count(videoReactions, and(
                        eq(videoReactions.videoId, videos.id),
                        eq(videoReactions.type, "dislike")
                    )),
                })
                .from(videos)
                .innerJoin(users, eq(videos.userId, users.id))
                .innerJoin(
                    viewerSubscriptions,
                    eq(viewerSubscriptions.userId, users.id)
                )
                .where(and(
                    eq(videos.visibility, "public"),
                    cursor
                        ? or(
                            lt(videos.updatedAt, cursor.updatedAt),
                            and(
                                eq(videos.updatedAt, cursor.updatedAt),
                                lt(videos.id, cursor.id)
                            )
                        )
                        : undefined,
                )).orderBy(desc(videos.updatedAt), desc(videos.id))
                // Add 1 to the limit to check if there is more data
                .limit(limit + 1)

            const hasMore = data.length > limit;
            // Remove the last item if there is more data
            const items = hasMore ? data.slice(0, -1) : data;
            // set the next cursor to the last item it there is more data
            const lastItem = items[items.length - 1];
            const nextCursor = hasMore
                ? {
                    id: lastItem.id,
                    updatedAt: lastItem.updatedAt,
                }
                : null
            return {
                items,
                nextCursor
            };
        }),

    getManyTrending: baseProcedure
        .input(
            z.object({
                cursor: z.object({
                    id: z.string().uuid(),
                    viewCount: z.number(),
                })
                    .nullish(),
                limit: z.number().min(1).max(100),
            })
        )
        .query(async ({ input }) => {
            const { cursor, limit } = input;

            const viewCountSubquery = db.$count(
                videoViews,
                eq(videoViews.videoId, videos.id),
            );
            const data = await db
                .select({
                    ...getTableColumns(videos),
                    user: users,
                    viewCount: viewCountSubquery,
                    likeCount: db.$count(videoReactions, and(
                        eq(videoReactions.videoId, videos.id),
                        eq(videoReactions.type, "like")
                    )),
                    dislikeCount: db.$count(videoReactions, and(
                        eq(videoReactions.videoId, videos.id),
                        eq(videoReactions.type, "dislike")
                    )),
                })
                .from(videos)
                .innerJoin(users, eq(videos.userId, users.id))
                .where(and(
                    eq(videos.visibility, "public"),
                    cursor
                        ? or(
                            lt(viewCountSubquery, cursor.viewCount),
                            and(
                                eq(viewCountSubquery, cursor.viewCount),
                                lt(videos.id, cursor.id)
                            )
                        )
                        : undefined,
                )).orderBy(desc(viewCountSubquery), desc(videos.id))
                // Add 1 to the limit to check if there is more data
                .limit(limit + 1)

            const hasMore = data.length > limit;
            // Remove the last item if there is more data
            const items = hasMore ? data.slice(0, -1) : data;
            // set the next cursor to the last item it there is more data
            const lastItem = items[items.length - 1];
            const nextCursor = hasMore
                ? {
                    id: lastItem.id,
                    viewCount: lastItem.viewCount,
                }
                : null
            return {
                items,
                nextCursor
            };
        }),
    getMany: baseProcedure
        .input(
            z.object({
                categoryId: z.string().uuid().nullish(),
                userId: z.string().uuid().nullish(),
                cursor: z.object({
                    id: z.string().uuid(),
                    updatedAt: z.date(),
                })
                    .nullish(),
                limit: z.number().min(1).max(100),
            })
        )
        .query(async ({ input }) => {
            const { cursor, limit, categoryId, userId } = input;
            const data = await db
                .select({
                    ...getTableColumns(videos),
                    user: users,
                    viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
                    likeCount: db.$count(videoReactions, and(
                        eq(videoReactions.videoId, videos.id),
                        eq(videoReactions.type, "like")
                    )),
                    dislikeCount: db.$count(videoReactions, and(
                        eq(videoReactions.videoId, videos.id),
                        eq(videoReactions.type, "dislike")
                    )),
                })
                .from(videos)
                .innerJoin(users, eq(videos.userId, users.id))
                .where(and(
                    eq(videos.visibility, "public"),
                    categoryId ? eq(videos.categoryId, categoryId) : undefined,
                    userId ? eq(videos.userId, userId) : undefined,
                    cursor
                        ? or(
                            lt(videos.updatedAt, cursor.updatedAt),
                            and(
                                eq(videos.updatedAt, cursor.updatedAt),
                                lt(videos.id, cursor.id)
                            )
                        )
                        : undefined,
                )).orderBy(desc(videos.updatedAt), desc(videos.id))
                // Add 1 to the limit to check if there is more data
                .limit(limit + 1)

            const hasMore = data.length > limit;
            // Remove the last item if there is more data
            const items = hasMore ? data.slice(0, -1) : data;
            // set the next cursor to the last item it there is more data
            const lastItem = items[items.length - 1];
            const nextCursor = hasMore
                ? {
                    id: lastItem.id,
                    updatedAt: lastItem.updatedAt,
                }
                : null
            return {
                items,
                nextCursor
            };
        }),

    getOne: baseProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ input, ctx }) => {
            const { clerkUserId } = ctx;
            let userId;
            const [user] = await db
                .select()
                .from(users)
                .where(inArray(users.clerkId, clerkUserId ? [clerkUserId] : []));

            if (user) {
                userId = user.id;
            }

            const viewerReactions = db.$with("viewer_reactions").as(
                db
                    .select({
                        videoId: videoReactions.videoId,
                        type: videoReactions.type,
                    })
                    .from(videoReactions)
                    .where(inArray(videoReactions.userId, userId ? [userId] : []))
            );

            const viewerSubscriptions = db.$with("viewer_subscriptions").as(
                db
                    .select()
                    .from(subscriptions)
                    .where(inArray(subscriptions.viewerId, userId ? [userId] : []))
            );

            const [existingVideo] = await db
                .with(viewerReactions, viewerSubscriptions)
                .select({
                    ...getTableColumns(videos),
                    user: {
                        ...getTableColumns(users),
                        subscriberCount: db.$count(subscriptions, eq(subscriptions.creatorId, users.id)),
                        viwerSubscribed: isNotNull(viewerSubscriptions.viewerId).mapWith(Boolean),
                    },
                    viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
                    likeCount: db.$count(
                        videoReactions,
                        and(
                            eq(videoReactions.videoId, videos.id),
                            eq(videoReactions.type, "like"),
                        ),
                    ),
                    dislikeCount: db.$count(
                        videoReactions,
                        and(
                            eq(videoReactions.videoId, videos.id),
                            eq(videoReactions.type, "dislike"),
                        ),
                    ),
                    viewerReaction: viewerReactions.type,
                })
                .from(videos)
                .innerJoin(users, eq(videos.userId, users.id))
                .leftJoin(viewerReactions, eq(viewerReactions.videoId, videos.id))
                .leftJoin(viewerSubscriptions, eq(viewerSubscriptions.creatorId, users.id))
                .where(eq(videos.id, input.id))
            // .groupBy(
            //     videos.id,
            //     users.id,
            //     viewerReactions.type,
            // )

            if (!existingVideo) {
                throw new TRPCError({ code: "NOT_FOUND" })
            }

            return existingVideo;
        }),
    generateDescription: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            const { workflowRunId } = await workflow.trigger({
                url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/description`,
                body: { userId, videoId: input.id },
                // retries: 3,
            });
            return workflowRunId;
        }),
    generateTitle: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            const { workflowRunId } = await workflow.trigger({
                url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/title`,
                body: { userId, videoId: input.id },
                // retries: 3,
            });
            return workflowRunId;
        }),

    generateThumbnail: protectedProcedure
        .input(z.object({ id: z.string().uuid(), prompt: z.string().min(10) }))
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            const { workflowRunId } = await workflow.trigger({
                url: `${process.env.UPSTASH_WORKFLOW_URL}/api/videos/workflows/thumbnail`,
                body: { userId, videoId: input.id, prompt: input.prompt },
                // retries: 3,
            });
            return workflowRunId;
        }),

    revalidate: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            const [existingVideo] = await db
                .select()
                .from(videos)
                .where(
                    and(
                        eq(videos.id, input.id),
                        eq(videos.userId, userId),
                    ),
                );

            if (!existingVideo) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            if (!existingVideo.muxUploadId) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            const upload = await mux.video.uploads.retrieve(
                existingVideo.muxUploadId
            );

            if (!upload || !upload.asset_id) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            const asset = await mux.video.assets.retrieve(
                upload.asset_id
            );

            if (!asset) {
                throw new TRPCError({ code: "BAD_REQUEST" })
            }

            const playbackId = asset.playback_ids?.[0].id;
            const duration = asset.duration ? Math.round(asset.duration * 1000) : 0;

            // TODO: Potentially find a way to revalidate trackId and trackStatus as well

            const [uploadedVideo] = await db
                .update(videos)
                .set({
                    muxStatus: asset.status,
                    muxPlaybackId: playbackId,
                    muxAssetId: asset.id,
                    duration,
                })
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId),
                ))
                .returning();

            return uploadedVideo;

        }),

    restoreThumbnail: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            const [existingVideo] = await db
                .select()
                .from(videos)
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId),
                ));

            if (!existingVideo) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            if (existingVideo.thumbnailKey) {
                const utapi = new UTApi();

                await utapi.deleteFiles(existingVideo.thumbnailKey);
                await db
                    .update(videos)
                    .set({ thumbnailKey: null, thumbnailUrl: null })
                    .where(and(
                        eq(videos.id, input.id),
                        eq(videos.userId, userId)
                    ));
            }

            if (!existingVideo.muxPlaybackId) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            const utapi = new UTApi();

            const tempThumbnailUrl = `https://image.mux.com/${existingVideo.muxPlaybackId}/thumbnail.jpg`

            const uploadedThumbnail = await utapi.uploadFilesFromUrl(tempThumbnailUrl);

            if (!uploadedThumbnail.data) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
            }

            const { key: thumbnailKey, url: thumbnailUrl } = uploadedThumbnail.data;

            const [updatedVideo] = await db
                .update(videos)
                .set({ thumbnailUrl, thumbnailKey })
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId),
                ))
                .returning()
            return updatedVideo
        }),
    remove: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            const [removedVideo] = await db
                .delete(videos)
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId)
                ))
                .returning();

            if (!removedVideo) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }
            return removedVideo
        }),

    update: protectedProcedure
        .input(videoUpdateSchema)
        .mutation(async ({ ctx, input }) => {
            const { id: userId } = ctx.user;

            if (!input.id) {
                throw new TRPCError({ code: "BAD_REQUEST" })
            }
            const [updatedVideo] = await db
                .update(videos)
                .set({
                    title: input.title,
                    description: input.description,
                    videoUrl: input.videoUrl,
                    videoUrlSize: input.videoUrlSize,
                    videoQuality: input.videoQuality,
                    downloadUrlOne: input.downloadUrlOne,
                    downloadUrlOneSize: input.downloadUrlOneSize,
                    downloadQualityOne: input.downloadQualityOne,
                    downloadUrlTwo: input.downloadUrlTwo,
                    downloadUrlTwoSize: input.downloadUrlTwoSize,
                    downloadQualityTwo: input.downloadQualityTwo,
                    downloadUrlThree: input.downloadUrlThree,
                    downloadUrlThreeSize: input.downloadUrlThreeSize,
                    downloadQualityThree: input.downloadQualityThree,
                    categoryId: input.categoryId,
                    visibility: input.visibility,
                    updatedAt: new Date(),
                })
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId)
                ))
                .returning();

            if (!updatedVideo) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }
            return updatedVideo;
        }),
    create: protectedProcedure.mutation(async ({ ctx }) => {
        const { id: userId } = ctx.user;

        const upload = await mux.video.uploads.create({
            new_asset_settings: {
                passthrough: userId,
                playback_policy: ["public"],
                // mp4_support: "standard",
                input: [
                    {
                        generated_subtitles: [
                            {
                                language_code: "en",
                                name: "English",
                            },
                        ],
                    },
                ],
            },
            cors_origin: "*", // TODO: In production, set to your url
        })
        const [video] = await db
            .insert(videos)
            .values({
                userId,
                title: "Untitled",
                muxStatus: "waiting",
                muxUploadId: upload.id,
            })
            .returning();

        return {
            video: video,
            url: upload.url,
        };
    }),
});