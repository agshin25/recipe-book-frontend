import { Skeleton } from "@/components/ui/skeleton"

export function RecipeListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                    <Skeleton className="w-full aspect-video rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                </div>
            ))}
        </div>
    )
}

