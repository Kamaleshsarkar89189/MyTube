"use client";

import Link from "next/link";

export const CategoryButtons = () => {
    return (
        <div className="bg-white dark:bg-[#2c2c2c] py-4 px-2 transition-colors duration-300">
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-nowrap md:justify-center md:gap-4 max-w-4xl mx-auto">
                <Link
                    href="/?categoryId=c4459e46-d2c9-4c6c-a878-922b3db79662"
                    className="bg-green-500 text-white text-sm md:text-base py-2 px-2 rounded font-bold shadow-md hover:opacity-90 transition text-center"
                >
                    BOLLYWOOD MOVIES
                </Link>
                <Link
                    href="/?categoryId=8df947ff-1bd5-4f78-b075-d7a48ac98b25"
                    className="bg-red-600 text-white text-sm md:text-base py-2 px-2 rounded font-bold shadow-md hover:opacity-90 transition text-center"
                >
                    HINDI DUBBED ANIME
                </Link>
                <Link
                    href="/?categoryId=6ef6af5b-ba7c-42d2-a7fa-ae5daa8a755e"
                    className="bg-yellow-600 text-white text-sm md:text-base py-2 px-2 rounded font-bold shadow-md hover:opacity-90 transition text-center"
                >
                    HOLLYWOOD MOVIES
                </Link>
                <a
                    href="https://t.me/AnimeEmperorhindi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-500 text-white text-sm md:text-base py-2 px-2 rounded font-bold shadow-md hover:opacity-90 transition text-center"
                >
                    JOIN OUR TELEGRAM
                </a>
            </div>
        </div>
    );
};
