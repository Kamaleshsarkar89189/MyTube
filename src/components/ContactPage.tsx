"use client";

export const ContactPage = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
            <h1 className="text-3xl font-bold text-center border-b border-border pb-3 mb-6">
                Contact Us
            </h1>

            <div className="flex flex-col items-center gap-6">
                {/* Contact Info */}
                <div className="space-y-4 text-center text-base leading-relaxed">
                    <h2 className="text-xl font-semibold">Feel free to contact us</h2>

                    <p>
                        Whether you have a question, a request, or just want to say hello —
                        we&apos;re happy to hear from you. You can also send us requests for your favorite movies and TV series.
                    </p>

                    <div>
                        <p className="text-sm text-muted-foreground">Visit us at:</p>
                        <p className="text-yellow-500 font-semibold">www.moviehub.in</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Email us at:</p>
                        <a
                            href="mailto:moviehub@protonmail.com"
                            className="text-yellow-400 font-semibold hover:underline"
                        >
                            moviehub@protonmail.com
                        </a>
                    </div>
                </div>

                {/* Note */}
                <div className="mt-8 text-sm leading-relaxed text-muted-foreground px-2 text-justify">
                    <p>
                        <span className="text-pink-500 font-semibold">NOTE:</span> MovieHub is a free movie information and
                        recommendation platform. We update Bollywood, Hollywood, and web series content in multiple languages
                        and qualities. We do not host any content ourselves. If you discover any broken links or copyright issues,
                        please let us know. Your feedback is appreciated, and we aim to reply within 24 working hours.
                    </p>
                    <p className="mt-2">
                        Also, don&apos;t forget to follow us on all major social media platforms for updates and news!
                    </p>
                </div>
            </div>
        </section>
    );
};
