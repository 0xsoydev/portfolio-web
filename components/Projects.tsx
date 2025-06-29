'use client'

import React, { useState } from 'react'

const BASE_URL = 'https://github.com/0xsoydev'

const projectsList = [
    {
        id: 1,
        name: 'eBatwa',
        description: 'React Native cryptocurrency wallet using Polygon Amoy testnet',
        technologies: ['React Native', 'Ethers.js', 'Infura RPC'],
        link: {
            website: null,
            github: `${BASE_URL}/eBatwa`
        }
    },
    {
        id: 2,
        name: 'Serenity',
        description: 'AI-powered Mental Wellness, Assessment & Tracking',
        technologies: ['Next.js', 'Tailwind CSS', 'shadcn/ui', 'MongoDB', 'Llama 3.3 80B'],
        link: {
            website: null,
            github: `${BASE_URL}/serenity`
        }
    },
    {
        id: 3,
        name: 'EventSeal',
        description: 'Blockchain-Verified Event Ticketing Platform (Won $300 Superteam bounty)',
        technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Metaplex SDK', 'solana/web3.js', 'Lighthouse IPFS', 'Docker'],
        link: {
            website: null,
            github: `${BASE_URL}/EventSeal`
        }
    }
]

const Projects = () => {
    // Sort projects in descending order by id (most recent first)
    const sortedProjects = [...projectsList].sort((a, b) => b.id - a.id)
    
    // State to track which projects have expanded technologies
    const [expandedTech, setExpandedTech] = useState<Record<number, boolean>>({})

    const toggleTechExpansion = (projectId: number) => {
        setExpandedTech(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }))
    }

    return (
        <div>
            <h3 className="font-lexend text-lg md:text-2xl mb-6 font-medium">Projects</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {sortedProjects.map((project) => {
                    const isExpanded = expandedTech[project.id] || false
                    const techToShow = isExpanded ? project.technologies : project.technologies.slice(0, 4)
                    const hasMoreTech = project.technologies.length > 4

                    return (
                        <div 
                            key={project.id} 
                            className="group bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-200"
                        >
                            {/* Header with project name and links */}
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-lexend text-base md:text-lg font-semibold text-white group-hover:text-neutral-100 transition-colors">
                                    {project.name}
                                </h4>
                                <div className="flex gap-3">
                                    {project.link.github && (
                                        <a
                                            href={project.link.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-lexend text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            Code
                                        </a>
                                    )}
                                    {project.link.website && (
                                        <a
                                            href={project.link.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-lexend text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {techToShow.map((tech, index) => (
                                    <span 
                                        key={index} 
                                        className="text-xs font-lexend text-neutral-300 bg-neutral-800/60 px-2 py-1 rounded-md border border-neutral-700/50"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {hasMoreTech && (
                                    <button
                                        onClick={() => toggleTechExpansion(project.id)}
                                        className="text-xs font-lexend text-neutral-500 hover:text-neutral-300 transition-colors px-2 py-1 rounded-md border border-neutral-700/30 hover:border-neutral-600"
                                    >
                                        {isExpanded 
                                            ? 'Show less' 
                                            : `+${project.technologies.length - 4}`
                                        }
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
                {sortedProjects.length === 0 && (
                    <p className="text-neutral-500 text-sm font-lexend">No projects found.</p>
                )}
            </div>
        </div>
    )
}

export default Projects