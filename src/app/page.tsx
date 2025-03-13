import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Recipe Explorer</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">Discover delicious recipes from around the world</p>
      <Link href="/recipes">
        <Button size="lg">Browse Recipes</Button>
      </Link>
    </main>
  )
}

