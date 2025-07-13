"use client";

type Category = {
    label: string;
    colorClass: string;
    link: string;
};

const categories: Category[] = [
    {
        label: "BOLLYWOOD MOVIES",
        colorClass: "bg-green-500",
        link: "https://mv-hub.netlify.app/?categoryId=c4459e46-d2c9-4c6c-a878-922b3db79662",
    },
    {
        label: "HINDI DUBBED ANIME",
        colorClass: "bg-red-600",
        link: "https://mv-hub.netlify.app/?categoryId=8df947ff-1bd5-4f78-b075-d7a48ac98b25",
    },
    {
        label: "HOLLYWOOD MOVIES",
        colorClass: "bg-yellow-600",
        link: "https://mv-hub.netlify.app/?categoryId=6ef6af5b-ba7c-42d2-a7fa-ae5daa8a755e",
    },
    {
        label: "JOIN OUR TELEGRAM",
        colorClass: "bg-sky-500",
        link: "https://t.me/AnimeEmperorhindi",
    },
];

export const CategoryButtons = () => {
    const handleRedirect = (url: string) => {
        window.location.href = url;
    };

    return (
        <div className="bg-white dark:bg-[#2c2c2c] py-4 px-2 transition-colors duration-300">
            <div className="grid grid-cols-2 gap-3 md:flex md:flex-nowrap md:justify-center md:gap-4 max-w-4xl mx-auto">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleRedirect(category.link)}
                        className={`${category.colorClass} text-white text-sm md:text-base py-2 px-2 rounded font-bold shadow-md hover:opacity-90 transition`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
