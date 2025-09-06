"use client";

export const AboutPage = () => {
    return (
        <section className="max-w-4xl mx-auto px-4 py-10 text-foreground">
            <h1 className="text-3xl font-bold border-b pb-2 mb-6 text-center">
                About Us
            </h1>

            <ul className="space-y-4 text-base leading-relaxed">
                <li>
                    <strong className="text-yellow-500">MovieHub</strong> is the best platform for downloading Bollywood and Hollywood movies in HD quality.
                </li>
                <li>
                    We provide direct download links with no irritating ads or pop-ups.
                </li>
                <li>
                    We host links from various trusted filesharing services in multiple formats such as BluRay, HDRip, BRRip, Web-DL, and more.
                </li>
                <li className="text-yellow-400 font-semibold">
                    MovieHub – Download Hindi Movies, 300MB Movies, 480p Movies, 720p Movies, 1080p Movies.
                </li>
                <li>
                    Download dual/multi-audio, high-quality movies and TV/Web series with zero popup ads. We offer English Movies, Dual Audio, Bollywood Movies, Web Series, Anime, and more.
                </li>
            </ul>

            <div className="mt-6 text-base">
                <p className="font-semibold text-yellow-500">
                    Our Official Domain is: <span className="text-white dark:text-gray-300">MovieHub.in</span>
                </p>
            </div>

            <div className="mt-8">
                <p className="text-red-500 font-bold">Disclaimer:</p>
                <p className="text-sm mt-2">
                    All the content available on this website is freely available on the internet and posted by third parties.
                    MovieHub does not violate any copyright laws. If any content is found in violation of the law, please notify us at
                    <span className="text-yellow-400 font-semibold ml-1">moviehubteam@protonmail.com</span>.
                </p>
            </div>

            <div className="mt-6 text-sm">
                <p>
                    If you believe your copyrighted content is being shared without your permission, please use our DMCA contact page to file a complaint.
                    We do not host any files on our servers. All links point to third-party sites.
                </p>
            </div>

            <div className="mt-6 text-sm font-semibold text-pink-600">
                <p>Note: MovieHub is a completely independent entity.</p>
            </div>
        </section>
    );
};
