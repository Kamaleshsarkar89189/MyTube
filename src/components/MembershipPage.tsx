"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useState } from "react";

export const MembershipPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        rating: 0,
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRating = (value: number) => {
        setForm({ ...form, rating: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.name && form.email && form.contact && form.rating > 0) {
            try {
                const res = await fetch("/api/send-membership", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                const data = await res.json();

                if (data.success) {
                    setSubmitted(true);
                    setTimeout(() => {
                        setForm({ name: "", email: "", contact: "", rating: 0 });
                        setSubmitted(false);
                    }, 4000);
                } else {
                    alert("Something went wrong. Try again.");
                }
            } catch (err) {
                console.error(err);
                alert("Failed to send email.");
            }
        }
    };      

    return (
        <section className="max-w-3xl mx-auto px-4 py-10 text-foreground">
            <h1 className="text-3xl font-bold text-center mb-8">Join MovieHub Membership</h1>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            required
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            required
                            name="email"
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <Label htmlFor="contact">Contact Number</Label>
                        <Input
                            required
                            name="contact"
                            id="contact"
                            type="tel"
                            value={form.contact}
                            onChange={handleChange}
                            placeholder="Enter your contact number"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <Label>How would you rate MovieHub?</Label>
                        <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={28}
                                    className={`cursor-pointer ${star <= form.rating ? "text-yellow-500" : "text-muted-foreground"
                                        }`}
                                    onClick={() => handleRating(star)}
                                    fill={star <= form.rating ? "#facc15" : "none"}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white transition-all"
                    >
                        Submit
                    </Button>
                </form>
            ) : (
                <div className="text-center text-green-600 text-xl font-semibold mt-10">
                    🎉 Thank you for joining MovieHub!<br />
                    We appreciate your feedback and support.
                </div>
            )}

            {/* Note Section */}
            <div className="mt-10 p-4 rounded-md bg-muted text-muted-foreground border border-border text-sm space-y-2">
                <p className="text-yellow-500 font-semibold">Note:</p>
                <p>
                    Every registered MovieHub member gets a chance to <span className="font-semibold text-foreground">earn with us</span>.
                    We offer a referral program, affiliate opportunities, early-access content, and special team roles.
                </p>
                <p>
                    As a member, you&apos;ll be notified about open positions, featured rewards, and future earning programs.
                    It&apos;s more than just watching movies — it&apos;s growing with our community.
                </p>
            </div>
        </section>
    );
};
