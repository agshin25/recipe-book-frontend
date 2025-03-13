"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "./input"

export function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/recipes?s=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <Link href="/" className="font-bold text-xl">
                    Recipe Explorer
                </Link>

                <div className="flex items-center gap-4">
                    {pathname !== "/" && (
                        <form onSubmit={handleSearch} className="relative w-full max-w-sm hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search recipes..."
                                className="pl-8 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    )}

                    <nav className="flex items-center gap-2">
                        <Link href="/recipes">
                            <Button variant={pathname.startsWith("/recipes") ? "default" : "ghost"}>Recipes</Button>
                        </Link>
                    </nav>
                </div>
            </div>

            {pathname !== "/" && (
                <div className="md:hidden border-t p-2">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search recipes..."
                            className="pl-8 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            )}
        </header>
    )
}

