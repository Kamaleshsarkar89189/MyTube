import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { name, email, request } = await req.json();

    try {
        const data = await resend.emails.send({
            from: "Request Form <onboarding@resend.dev>", // or your custom verified domain
            to: "circumstanceskamalesh@gmail.com", // Change to your email
            subject: "🎬 New Movie Request from MovieHub",
            html: `
        <h2>New Content Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Requested:</strong> ${request}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
