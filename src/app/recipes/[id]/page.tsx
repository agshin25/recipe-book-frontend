"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RelatedRecipes } from "@/components/related-recipes"
import { useGetRecipeByIdQuery } from "@/lib/services/recipeApi"
import { Skeleton } from "@/components/ui/skeleton"

export default function RecipeDetailPage() {
    const { id } = useParams()
    const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id as string)

    if (error) {
        notFound()
    }

    if (isLoading) {
        return <RecipeDetailSkeleton />
    }

    if (!recipe) {
        notFound()
    }

    
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                name: ingredient,
                measure: measure || "",
            })
        }
    }

    const instructionSteps = recipe.strInstructions
        ? recipe.strInstructions.split(/\r\n|\r|\n/).filter((step: string) => step.trim() !== "")
        : []

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="lg:col-span-3">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <div className="md:w-1/3">
                            <div className="relative rounded-lg overflow-hidden aspect-square">
                                <Image
                                    src={recipe.strMealThumb || "/placeholder.svg"}
                                    alt={recipe.strMeal}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {recipe.strArea && (
                                    <Link href={`/recipes?a=${encodeURIComponent(recipe.strArea)}`}>
                                        <Badge variant="outline" className="cursor-pointer">
                                            {recipe.strArea}
                                        </Badge>
                                    </Link>
                                )}
                                {recipe.strCategory && (
                                    <Link href={`/recipes?c=${encodeURIComponent(recipe.strCategory)}`}>
                                        <Badge variant="outline" className="cursor-pointer">
                                            {recipe.strCategory}
                                        </Badge>
                                    </Link>
                                )}
                            </div>

                            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                            <ul className="space-y-1 mb-6">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-start">
                                        <Link href={`/recipes?i=${encodeURIComponent(ingredient.name)}`}>
                                            <span className="text-primary hover:underline">
                                                {ingredient.measure} {ingredient.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                        <div className="space-y-4">
                            {instructionSteps.map((step, index) => (
                                <Card key={index}>
                                    <CardContent className="p-4">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
                                                {index + 1}
                                            </div>
                                            <p>{step}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {recipe.strYoutube && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Video Tutorial</h2>
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={recipe.strYoutube.replace("watch?v=", "embed/")}
                                    title={`${recipe.strMeal} video tutorial`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    {recipe.strCategory && <RelatedRecipes category={recipe.strCategory} currentRecipeId={recipe.idMeal} />}
                </div>
            </div>
        </div>
    )
}

function RecipeDetailSkeleton() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <div className="md:w-1/3">
                            <Skeleton className="aspect-square w-full rounded-lg" />
                        </div>

                        <div className="md:w-2/3">
                            <Skeleton className="h-10 w-3/4 mb-4" />

                            <div className="flex gap-2 mb-4">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                            </div>

                            <Skeleton className="h-6 w-40 mb-4" />
                            <div className="space-y-2 mb-6">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-5 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <Skeleton className="h-8 w-40 mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-lg" />
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <Skeleton className="h-8 w-40 mb-4" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

