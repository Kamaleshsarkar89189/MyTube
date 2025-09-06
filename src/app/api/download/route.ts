import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const videoUrl = req.nextUrl.searchParams.get("url");
    const title = req.nextUrl.searchParams.get("title");

    if (!videoUrl) {
        return new NextResponse("Missing video URL", { status: 400 });
    }

    try {
        const videoResponse = await fetch(videoUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/58.0.3029.110 Safari/537.3",
            },
        });

        const videoStream = videoResponse.body;
        const contentType = videoResponse.headers.get("content-type") ?? "video/mp4";

        // Use title if provided, else fallback to filename from URL
        let fileName = title
            ? title.replace(/[^a-zA-Z0-9 \-]/g, "") // allow letters, numbers, spaces, hyphens
            : decodeURIComponent(videoUrl.split("/").pop()?.split("?")[0] || "video");

        // Ensure .mp4 or relevant extension is added if missing
        if (!fileName.endsWith(".mp4")) {
            fileName += ".mp4";
        }

        return new NextResponse(videoStream, {
            headers: {
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Type": contentType,
            },
        });
    } catch (error) {
        console.log("Download API Error:", error);
        return new NextResponse("Error fetching video", { status: 500 });
    }
}
