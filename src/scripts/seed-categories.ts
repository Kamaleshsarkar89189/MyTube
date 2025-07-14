import { db } from "@/db";
// const { db } = require("@/db")
import { categories } from "@/db/schema";
// const { categories } = require("@/db/schema")

const categoryNames = [
    "Dual Audio",
    "Anime",
    "Web Series",
    "TV Shows",
];

async function main() {
    console.log("Seeding categories...");

    try {
        const values = categoryNames.map((name) => ({
            name,
            description: `Videos related to ${name.toLowerCase()}`,
        }));

        await db.insert(categories).values(values);
        console.log("Categories seeded successfully");
        
    } catch (error) {
        console.error("Error seeding categories: ", error);
        process.exit(1);
    }
    
}

main();