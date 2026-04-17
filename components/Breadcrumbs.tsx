"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show on home page
  if (pathname === "/") return null

  const paths = pathname.split("/").filter(Boolean)

  return (
    <div className="bg-muted/10 border-b">
      <nav aria-label="Breadcrumb" className="container py-3 text-sm text-muted-foreground flex items-center space-x-2 overflow-x-auto">
        <Link href="/" className="hover:text-primary transition-colors flex items-center flex-shrink-0" title="Home">
          <Home className="w-4 h-4" />
        </Link>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/")
          const isLast = index === paths.length - 1
          // Format the path nicely
          const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")

          return (
            <div key={path} className="flex items-center space-x-2 flex-shrink-0">
              <ChevronRight className="w-4 h-4 opacity-50" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">{title}</span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">{title}</Link>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
