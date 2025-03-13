"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetRecipesByCategoryQuery } from "@/lib/services/recipeApi"

interface RelatedRecipesProps {
    category: string
    currentRecipeId: string
}

export function RelatedRecipes({ category, currentRecipeId }: RelatedRecipesProps) {
    const { data: recipes, isLoading, error } = useGetRecipesByCategoryQuery(category)

    const filteredRecipes = recipes ? recipes.filter((recipe) => recipe.idMeal !== currentRecipeId).slice(0, 5) : []

    if (isLoading) {
        return (
            <div className="sticky top-4">
                <Skeleton className="h-8 w-40 mb-4" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        )
    }

    if (error || !recipes || filteredRecipes.length === 0) {
        return (
            <div className="sticky top-4">
                <h2 className="text-xl font-semibold mb-4">More {category} Recipes</h2>
                <Card>
                    <CardContent className="p-4 text-center text-muted-foreground">No related recipes found</CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">More {category} Recipes</h2>

            <div className="space-y-4">
                {filteredRecipes.map((recipe) => (
                    <Link key={recipe.idMeal} href={`/recipes/${recipe.idMeal}`}>
                        <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 p-3">
                                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                                    <Image
                                        src={recipe.strMealThumb || "/placeholder.svg"}
                                        alt={recipe.strMeal}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>
                                <CardContent className="p-0">
                                    <h3 className="font-medium line-clamp-2">{recipe.strMeal}</h3>
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

