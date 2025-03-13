import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Recipe {
    idMeal: string
    strMeal: string
    strMealThumb: string
    strCategory?: string
    strArea?: string
    strInstructions?: string
    strYoutube?: string
    [key: string]: any 
}
export interface SearchParams {
    s?: string
    i?: string
    a?: string
    c?: string
}

export const recipeApi = createApi({
    reducerPath: "recipeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://recipe-book-backend-k6m8gn2b7-agsins-projects.vercel.app/api" }),
    endpoints: (builder) => ({
        getRecipes: builder.query<Recipe[], SearchParams>({
            query: (params) => {
                const queryParams = new URLSearchParams()

                if (params.s) queryParams.append("s", params.s)
                if (params.i) queryParams.append("i", params.i)
                if (params.a) queryParams.append("a", params.a)
                if (params.c) queryParams.append("c", params.c)

                return `recipes?${queryParams.toString()}`
            },
        }),

        getRecipeById: builder.query<Recipe, string>({
            query: (id) => `recipes/item/${id}`,
        }),

        getRecipesByCategory: builder.query<Recipe[], string>({
            query: (category) => `recipes?c=${encodeURIComponent(category)}`,
        }),

        getCategories: builder.query<{meals: []}, void>({
            query: () => "recipes/categories",
        }),

        getAreas: builder.query<{ meals: [] }, void>({
            query: () => "recipes/areas",
        }),

        getIngredients: builder.query<{ meals: [] }, void>({
            query: () => "recipes/ingredients",
        }),
    }),
})

export const {
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useGetRecipesByCategoryQuery,
    useGetCategoriesQuery,
    useGetAreasQuery,
    useGetIngredientsQuery,
} = recipeApi

