'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()
  
  const navOptions = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-4 z-50 mb-8">
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg" />
          
          {/* Navigation items */}
          <div className="relative flex items-center gap-1 p-2">
            {navOptions.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                  hover:bg-accent hover:text-accent-foreground
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                  ${isActive(item.href) 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
                
                {/* Active indicator dot */}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar