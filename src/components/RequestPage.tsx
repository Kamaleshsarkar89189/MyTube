"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const RequestPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        request: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.name && form.email && form.request) {
            setSubmitted(true);
            setTimeout(() => {
                setForm({ name: "", email: "", request: "" });
                setSubmitted(false);
            }, 4000);
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-12 text-foreground">
            {/* Greeting */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-yellow-500 mb-2">Hello, Movie Lover! 🎬</h1>
                <p className="text-lg text-muted-foreground">
                    Welcome to <span className="font-semibold text-yellow-600">MovieHub</span> — your favorite platform to
                    explore movies and web series. Can&apos;t find what you&apos;re looking for? No worries! Submit a request and
                    we&apos;ll try our best to bring it to you.
                </p>
            </div>

            {/* Form */}
            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" className="text-sm">Full Name</Label>
                        <Input
                            required
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="text-sm">Email Address</Label>
                        <Input
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Request Field */}
                    <div>
                        <Label htmlFor="request" className="text-sm">Movie/Web Series/IMDB url You&apos;re Requesting</Label>
                        <Textarea
                            required
                            id="request"
                            name="request"
                            placeholder="e.g., Interstellar Hindi Dubbed or Breaking Bad Season 2"
                            value={form.request}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white transition-all"
                    >
                        Submit Request
                    </Button>
                </form>
            ) : (
                <div className="text-center text-xl text-green-600 font-semibold mt-10">
                    🎉 Thank you for your request!<br />
                    We will make it available soon!
                </div>
            )}
        </section>
    );
};
