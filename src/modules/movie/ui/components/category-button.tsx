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
        link: "https://kamalesh-sarkar.vercel.app/", // TODO: Add specific link
    },
    {
        label: "Hindi Dubbed Anime",
        colorClass: "bg-red-600",
        link: "/category/dual-audio",// TODO: Add specific link
    },
    {
        label: "Hollywood Movies",
        colorClass: "bg-yellow-600",
        link: "/category/hollywood",
    },
    {
        label: "Join Our Telegram",
        colorClass: "bg-sky-500",
        link: "https://t.me/your_telegram_channel",// TODO: Add specific link
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
  