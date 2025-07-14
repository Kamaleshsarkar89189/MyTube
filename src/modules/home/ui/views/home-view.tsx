// import { CategoriesSection } from "../sections/categories-section";
import { HomeMovieSection } from "@/modules/movie/ui/sections/home-movie-section";
import { CategoryButtons } from "@/modules/movie/ui/components/category-button";
// import { TagButtons } from "@/modules/movie/ui/components/tag-list";
import { Footer } from "@/components/Footer";
// import { HomeVideosSection } from "../sections/home-videos-section";

interface HomeViewProps {
    categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {

    const categories = [
        { id: "c4459e46-d2c9-4c6c-a878-922b3db79662", name: "Bollywood Movies" },
        { id: "6ef6af5b-ba7c-42d2-a7fa-ae5daa8a755e", name: "Hollywood Movies" },
        { id: "8df947ff-1bd5-4f78-b075-d7a48ac98b25", name: "Hindi Dubbed Anime" },
        { id: "3d430af7-6cc7-4c11-ba5d-8fb9f9a67b4e", name: "Dual Audio" },
        { id: "74fcebb6-dc84-4464-a742-ceb73acd9d83", name: "Anime" },
        { id: "02cf64dc-4a4f-4f58-ae21-af40cf4efbba", name: "Web Series" },
        { id: "0582ae98-c136-42e9-a84a-337fe44943df", name: "TV Shows" },
    ];

    const selectedCategory = categories.find((c) => c.id === categoryId);
    return (
        <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2 flex flex-col gap-y-0">
            {/* <CategoriesSection categoryId={categoryId} /> */}
            <CategoryButtons/>
            {/* <TagButtons/> */}
            {/* For Movie Grid, For youtube type ui go to video-thumbanil.tsx and set it up*/}
            <HomeMovieSection categoryId={categoryId} categoryName={selectedCategory?.name} />
            {/* <HomeVideosSection categoryId={categoryId}/> */}
            <Footer/>
        </div>
    )
}