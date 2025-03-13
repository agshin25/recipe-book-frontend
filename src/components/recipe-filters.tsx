"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useGetCategoriesQuery, useGetAreasQuery, useGetIngredientsQuery } from "@/lib/services/recipeApi"
import { Badge } from "@/components/ui/badge"

interface ActiveFilter {
    type: string
    value: string
    param: string
}

interface RecipeFiltersProps {
    activeFilters: ActiveFilter[]
}

interface CategoryItem {
    strCategory: string
}

interface AreaItem {
    strArea: string
}

interface IngredientItem {
    strIngredient: string
}

export function RecipeFilters({ activeFilters }: RecipeFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery()
    const { data: areasData, isLoading: areasLoading } = useGetAreasQuery()
    const { data: ingredientsData, isLoading: ingredientsLoading } = useGetIngredientsQuery()

    const [categories, setCategories] = useState<string[]>([])
    const [areas, setAreas] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<string[]>([])

    useEffect(() => {
        if (categoriesData?.meals) {
            setCategories(categoriesData.meals.map((item: CategoryItem) => item.strCategory))
        }
    }, [categoriesData])

    useEffect(() => {
        if (areasData?.meals) {
            setAreas(areasData.meals.map((item: AreaItem) => item.strArea))
        }
    }, [areasData])

    useEffect(() => {
        if (ingredientsData?.meals) {
            setIngredients(ingredientsData.meals.map((item: IngredientItem) => item.strIngredient))
        }
    }, [ingredientsData])

    const loading = categoriesLoading || areasLoading || ingredientsLoading

    const handleFilterChange = (value: string, type: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value && type) {
            params.set(type, value)
        }

        router.push(`/recipes?${params.toString()}`)
    }

    const removeFilter = (paramKey: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(paramKey)
        router.push(`/recipes?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push("/recipes")
    }

    const hasActiveFilters = activeFilters.length > 0

    const categoryFilter = activeFilters.find(f => f.type === "category")?.value || ""
    const countryFilter = activeFilters.find(f => f.type === "country")?.value || ""
    const ingredientFilter = activeFilters.find(f => f.type === "ingredient")?.value || ""

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-auto">
                    <Select
                        disabled={loading}
                        onValueChange={(value) => handleFilterChange(value, "c")}
                        value={categoryFilter}
                    >
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-auto">
                    <Select
                        disabled={loading}
                        onValueChange={(value) => handleFilterChange(value, "a")}
                        value={countryFilter}
                    >
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filter by country" />
                        </SelectTrigger>
                        <SelectContent>
                            {areas.map((area) => (
                                <SelectItem key={area} value={area}>
                                    {area}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-auto">
                    <Select
                        disabled={loading}
                        onValueChange={(value) => handleFilterChange(value, "i")}
                        value={ingredientFilter}
                    >
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filter by ingredient" />
                        </SelectTrigger>
                        <SelectContent>
                            {ingredients.map((ingredient) => (
                                <SelectItem key={ingredient} value={ingredient}>
                                    {ingredient}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {hasActiveFilters && (
                    <Button variant="outline" size="icon" onClick={clearFilters} className="h-10 w-10">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear filters</span>
                    </Button>
                )}
            </div>

            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm font-medium">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                        {activeFilters.map((filter) => (
                            <Badge
                                key={`${filter.type}-${filter.value}`}
                                variant="secondary"
                                className="flex items-center gap-1 px-2 py-1"
                            >
                                <span>
                                    {filter.type === "name" && `Search: "${filter.value}"`}
                                    {filter.type === "category" && `Category: ${filter.value}`}
                                    {filter.type === "country" && `Country: ${filter.value}`}
                                    {filter.type === "ingredient" && `Ingredient: ${filter.value}`}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                                    onClick={() => removeFilter(filter.param)}
                                >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove filter</span>
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
