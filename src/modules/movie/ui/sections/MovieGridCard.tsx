import Image from "next/image";

// const categories = [
//     "Bollywood Movies",
//     "Dual Audio Content",
//     "Hollywood Movies",
//     "Join Our Telegram",
// ];

const tags = [
    "Dual Audio (Hindi) 720P",
    "Hollywood Movies 1080P",
    "Telugu",
    "Action",
    "Adventure",
    "Animation",
    "Cartoon",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "War",
    "Web Series",
    "Tamil 720P",
    "Pakistani",
    "Punjabi Movies 720P",
];

const movies = [
    {
        title: "Sardaar Ji 3 2025 Punjabi CAMRip",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "DD Next Level 2025 Hindi Dual Audio WEB-DL",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "Metro in Dino 2025 Hindi HDTC",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "Jurassic World: Rebirth 2025 Hindi HDCAM",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "Kaalidhar Laapata 2025 Hindi WEB-DL",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "Uppu Kappurambu 2025 Hindi Dual Audio WEB-DL",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "Pune Highway 2025 Hindi WEB-DL",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
    {
        title: "Out Come the Wolves 2024 Hindi Dual Audio WEB-DL",
        date: "04 Jul 2025",
        quality: "720p - 480p - 1080p",
        img: "https://m.media-amazon.com/images/M/MV5BMDE1N2EzMjAtMDY1My00YWE5LWEyYjYtYmE3YjZjNzQwNDhmXkEyXkFqcGc%40._V1_.jpg",
    },
];

export default function MovieGrid() {
    return (
        <div className="bg-[#2c2c2c] px-4 py-6 text-white">
            {/* Top Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">
                    Bollywood Movies
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded font-semibold">
                    Dual Audio Content
                </button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded font-semibold">
                    Hollywood Movies
                </button>
                <button className="bg-sky-500 text-white px-4 py-2 rounded font-semibold">
                    Join Our Telegram
                </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-[#3d3d3d] hover:bg-[#4d4d4d] text-sm px-3 py-1 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 [@media(min-width:2200px)]:grid-cols-12 gap-4">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className="relative bg-[#1e1e1e] text-white rounded-md overflow-hidden shadow-md hover:scale-[1.01] transition-transform"
                    >
                        {/* Image */}
                        <div className="relative h-60 md:h-60 lg:h-60 w-full">
                            <Image
                                src={movie.img}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />

                            {/* Overlay Text */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-center">
                                <p className="text-xs text-gray-300">{movie.date}</p>
                                <p className="font-semibold text-sm leading-tight">{movie.title}</p>
                                <p className="text-xs text-gray-400">{movie.quality}</p>
                            </div>
                        </div>
                    </div>
                  
                ))}
            </div>

        </div>
    );
}
