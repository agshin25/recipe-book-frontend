import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecipeCardProps {
    recipe: {
        idMeal: string
        strMeal: string
        strMealThumb: string
        strCategory?: string
        strArea?: string
    }
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Link href={`/recipes/${recipe.idMeal}`}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="relative aspect-video">
                    <Image
                        src={recipe.strMealThumb || "/placeholder.svg"}
                        alt={recipe.strMeal}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{recipe.strMeal}</h3>
                </CardContent>
                {(recipe.strCategory || recipe.strArea) && (
                    <CardFooter className="p-4 pt-0 flex gap-2 flex-wrap">
                        {recipe.strCategory && (
                            <Badge variant="secondary" className="text-xs">
                                {recipe.strCategory}
                            </Badge>
                        )}
                        {recipe.strArea && (
                            <Badge variant="outline" className="text-xs">
                                {recipe.strArea}
                            </Badge>
                        )}
                    </CardFooter>
                )}
            </Card>
        </Link>
    )
}

