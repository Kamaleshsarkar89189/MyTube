"use client";
type Category = {
    label: string;
    colorClass: string;
    link: string;
};

const categories: Category[] = [
    {
        label: "Bollywood Movies",
        colorClass: "bg-green-600",
        link: "mv-hub.netlify.app/?categoryId=c4459e46-d2c9-4c6c-a878-922b3db79662", // TODO: Add specific link
    },
    {
        label: "Hindi Dubbed Anime",
        colorClass: "bg-red-600",
        link: "mv-hub.netlify.app/?categoryId=8df947ff-1bd5-4f78-b075-d7a48ac98b25",// TODO: Add specific link
    },
    {
        label: "Hollywood Movies",
        colorClass: "bg-yellow-600",
        link: "mv-hub.netlify.app/?categoryId=6ef6af5b-ba7c-42d2-a7fa-ae5daa8a755e",
    },
    {
        label: "Join Our Telegram",
        colorClass: "bg-sky-500",
        link: "https://t.me/AnimeEmperorhindi",
      },
];

export const CategoryButtons = () => {
    const handleRedirect = (url: string) => {
        window.location.href = url;
      };
    return (
        <div className="bg-muted text-white">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleRedirect(category.link)}
                        className={`${category.colorClass} text-white px-4 py-2 rounded font-semibold`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
  