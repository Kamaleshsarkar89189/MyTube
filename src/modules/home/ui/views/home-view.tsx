// import { CategoriesSection } from "../sections/categories-section";
import { HomeMovieSection } from "@/modules/movie/ui/sections/home-movie-section";
import { CategoryButtons } from "@/modules/movie/ui/components/category-button";
import { TagButtons } from "@/modules/movie/ui/components/tag-list";
import { Footer } from "@/components/Footer";
// import { HomeVideosSection } from "../sections/home-videos-section";

interface HomeViewProps {
    categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
    return (
        <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2 flex flex-col gap-y-0">
            {/* <CategoriesSection categoryId={categoryId} /> */}
            <CategoryButtons/>
            <TagButtons/>
            {/* For Movie Grid, For youtube type ui go to video-thumbanil.tsx and set it up*/}
            <HomeMovieSection categoryId={categoryId} />
            {/* <HomeVideosSection categoryId={categoryId}/> */}
            <Footer/>
        </div>
    )
}