'use client'

import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  const navOptions = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  // Handle smooth scrolling to sections
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '')
    
    // Manually set active section immediately for better UX
    setActiveSection(targetId)
    
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = 100 // Account for sticky navbar
        const elementPosition = element.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    closeMobileMenu()
  }

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'projects', 'experience', 'home'] // Reverse order for proper detection
      const scrollPosition = window.scrollY + 150 // Offset for navbar height

      // Check if we're at the very top
      if (window.scrollY < 50) {
        setActiveSection('home')
        return
      }

      // Find the current section
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  const isActive = (href: string) => {
    const sectionId = href.replace('#', '')
    return activeSection === sectionId
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-4 z-50 mb-8">
      <div className="flex items-center justify-center px-4">
        <div className="relative w-full max-w-fit">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full shadow-lg" />
          
          {/* Desktop Navigation */}
          <div className="relative hidden md:flex items-center gap-1 p-2">
            {navOptions.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-lexend font-medium transition-all duration-200 ease-in-out
                  hover:bg-neutral-800 hover:text-neutral-100
                  focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-900
                  ${isActive(item.href) 
                    ? 'bg-neutral-100 text-neutral-900 shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-100'
                  }
                `}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
                
                {/* Active indicator dot */}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-neutral-900 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="relative md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="relative flex items-center justify-center w-12 h-12 rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-900"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {/* Hamburger icon */}
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-4 h-0.5 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                <span className={`block w-4 h-0.5 bg-current transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-4 h-0.5 bg-current transition-all duration-200 ${isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`} />
              </div>
            </button>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-lg p-2">
                {navOptions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      block w-full px-4 py-3 rounded-xl text-sm font-lexend font-medium transition-all duration-200 ease-in-out text-center
                      hover:bg-neutral-800 hover:text-neutral-100
                      focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-900
                      ${isActive(item.href) 
                        ? 'bg-neutral-100 text-neutral-900 shadow-sm' 
                        : 'text-neutral-400 hover:text-neutral-100'
                      }
                    `}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay (for closing when clicking outside) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 -z-10 md:hidden" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

export default Navbar