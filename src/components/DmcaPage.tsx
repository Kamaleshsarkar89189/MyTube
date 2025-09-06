"use client";

export const DmcaPage = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
            <h1 className="text-3xl font-bold text-center border-b border-border pb-3 mb-6">
                DMCA Policy
            </h1>

            <div className="space-y-6 text-base leading-relaxed">
                <p>
                    At <span className="font-semibold text-yellow-500">MovieHub</span>, we respect the intellectual property
                    rights of others and are committed to complying with the **Digital Millennium Copyright Act (DMCA)**.
                    It is our policy to respond to any infringement notices and take appropriate actions under the
                    **DMCA** and other applicable intellectual property laws.
                </p>

                <h2 className="text-xl font-semibold">Content Policy</h2>
                <p>
                    All content provided on MovieHub is either freely available on the internet or submitted by users.
                    We do not host any media files such as movies, series, or music on our own servers. All links are provided by third parties or publicly accessible sources.
                </p>

                <h2 className="text-xl font-semibold">What to Do If You Are the Copyright Owner</h2>
                <p>
                    If you believe that your copyrighted work has been posted on MovieHub without permission,
                    please submit a DMCA takedown request including the following details:
                </p>

                <ul className="list-disc list-inside space-y-2">
                    <li>Your full legal name and electronic or physical signature.</li>
                    <li>A description of the copyrighted work you claim has been infringed.</li>
                    <li>The exact URL or link to the content you believe is infringing your rights.</li>
                    <li>Your contact information (email, address, phone number).</li>
                    <li>A statement that you believe in good faith that the disputed use is not authorized by you, your agent, or the law.</li>
                    <li>
                        A statement, under penalty of perjury, that the above information is accurate and that you are the copyright
                        owner or authorized to act on behalf of the owner.
                    </li>
                </ul>

                <div className="p-4 bg-muted rounded-md border border-border">
                    <p className="font-semibold mb-1">Send your DMCA complaint to:</p>
                    <p>Email: <a href="mailto:moviehub@protonmail.com" className="text-yellow-500 font-medium">moviehub@protonmail.com</a></p>
                    <p>Subject: DMCA Takedown Request</p>
                </div>

                <h2 className="text-xl font-semibold">Response Timeline</h2>
                <p>
                    Upon receiving your DMCA notice, we will review it carefully. If the request is valid,
                    we will remove the infringing content within **48 hours** and notify the user who submitted it.
                </p>

                <h2 className="text-xl font-semibold">Counter Notification</h2>
                <p>
                    If content is removed due to a DMCA complaint and the user believes it was wrongly taken down,
                    they may submit a counter-notice including:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Their full name and signature</li>
                    <li>The content and its URL that was removed</li>
                    <li>A statement under penalty of perjury that they believe the content was removed in error</li>
                    <li>Consent to jurisdiction of a federal court in their district</li>
                </ul>

                <h2 className="text-xl font-semibold">Final Note</h2>
                <p>
                    We take copyright issues seriously and encourage all users and contributors to follow proper legal and ethical
                    standards. For any clarification, feel free to reach out.
                </p>

                <p className="text-pink-500 font-semibold">Thank you for supporting MovieHub ❤️</p>
            </div>
        </section>
    );
};
