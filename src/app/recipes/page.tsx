"use client"

import { useSearchParams } from "next/navigation"
import { RecipeCard } from "@/components/recipe-card"
import { RecipeFilters } from "@/components/recipe-filters"
import { RecipeListSkeleton } from "@/components/recipe-list-skeleton"
import { useGetRecipesQuery } from "@/lib/services/recipeApi"

export default function RecipesPage() {
    const searchParams = useSearchParams()

    const params = {
        s: searchParams.get("s") || undefined,
        i: searchParams.get("i") || undefined,
        a: searchParams.get("a") || undefined,
        c: searchParams.get("c") || undefined,
    }

    const { data: recipes, isLoading, error } = useGetRecipesQuery(params)

    const activeFilters = []

    if (params.s) {
        activeFilters.push({
            type: "name",
            value: params.s,
            param: "s"
        })
    }

    if (params.c) {
        activeFilters.push({
            type: "category",
            value: params.c,
            param: "c"
        })
    }

    if (params.a) {
        activeFilters.push({
            type: "country",
            value: params.a,
            param: "a"
        })
    }

    if (params.i) {
        activeFilters.push({
            type: "ingredient",
            value: params.i,
            param: "i"
        })
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Recipes</h1>

            <RecipeFilters activeFilters={activeFilters} />

            {isLoading ? (
                <RecipeListSkeleton />
            ) : error ? (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold mb-4">Error loading recipes</h2>
                    <p className="text-muted-foreground">Please try again later or check your connection.</p>
                </div>
            ) : recipes && recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold mb-4">No recipes found</h2>
                    <p className="text-muted-foreground">Try adjusting your filters or search for something else.</p>
                </div>
            )}
        </div>
    )
}