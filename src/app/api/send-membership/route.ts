import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const body = await req.json();

    const { name, email, contact, rating } = body;

    try {
        const data = await resend.emails.send({
            from: "MovieHub <onboarding@resend.dev>", // Use verified sender domain
            to: "circumstanceskamalesh@gmail.com", // Your admin email
            subject: "New Membership Request - MovieHub",
            html: `
        <h2>New Membership Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Rating:</strong> ${rating} stars</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Resend Error:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
