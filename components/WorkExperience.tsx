'use client'

import React, { useState } from 'react'

const workExp = [
    {
        id: 1,
        company: 'RAFFL',
        projectName: 'Web3 Raffle Platform',
        position: 'UI/UX Designer',
        employmentType: 'Freelance',
        location: 'Remote',
        technologies: ['Figma'],
        links: {
            website: 'https://raffl.io', // if available
            github: null, // if available
            demo: null // if available
        }
    },
    {
        id: 2,
        company: '$KNUT',
        projectName: 'Memecoin Landing Page',
        position: 'UI/UX Designer',
        employmentType: 'Freelance',
        location: 'Remote',
        technologies: ['Figma'],
        links: {
            website: null, // if available
            github: null, // if available
            demo: null // if available
        }
    },
    {
        id: 3,
        company: 'CryptoDash',
        projectName: 'CryptoDash',
        position: 'Full Stack Developer',
        employmentType: 'Freelance',
        location: 'Remote',
        technologies: ['Next.js', 'Tailwind CSS', 'Mailtrap', 'Nodemailer', 'Prisma', 'PostgreSQL', 'Vercel'],
        links: {
            website: null, // if available
            github: null, // if available
            demo: null // if available
        }
    }
]

const WorkExperience = () => {
    // Sort workExp in descending order by id (most recent first)
    const sortedWorkExp = [...workExp].sort((a, b) => b.id - a.id)
    
    // State to track which work items have expanded technologies
    const [expandedTech, setExpandedTech] = useState<Record<number, boolean>>({})

    const toggleTechExpansion = (workId: number) => {
        setExpandedTech(prev => ({
            ...prev,
            [workId]: !prev[workId]
        }))
    }

  return (
    <div>
            <h3 className="font-lexend text-lg md:text-2xl mb-6 font-medium">Work Experience</h3>
            <div className="space-y-6">
                {sortedWorkExp.map((work) => {
                    const isExpanded = expandedTech[work.id] || false
                    const techToShow = isExpanded ? work.technologies : work.technologies.slice(0, 4)
                    const hasMoreTech = work.technologies.length > 4

                    return (
                        <div key={work.id} className="group border-l-2 border-neutral-800 pl-6 hover:border-neutral-600 transition-colors">
                            <div className="space-y-3">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-lexend text-base md:text-lg font-medium text-white">
                                            {work.projectName}
                                        </h4>
                                        <p className="text-sm text-neutral-400 mt-1">
                                            {work.position} at {work.company}
                                        </p>
                                    </div>
                                    <span className="text-xs font-lexend text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded-md">
                                        {work.employmentType}
                                    </span>
                                </div>

                                {/* Technologies */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    {techToShow.map((tech, index) => (
                                        <span 
                                            key={index} 
                                            className="text-xs font-lexend text-neutral-300 bg-neutral-900 border border-neutral-700 px-2 py-1 rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {hasMoreTech && (
                                        <button
                                            onClick={() => toggleTechExpansion(work.id)}
                                            className="text-xs font-lexend text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-2"
                                        >
                                            {isExpanded 
                                                ? 'Show less' 
                                                : `+${work.technologies.length - 4} more`
                                            }
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {sortedWorkExp.length === 0 && (
                    <p className="text-neutral-500 text-sm font-lexend">No work experience found.</p>
                )}
        </div>
    </div>
  )
}

export default WorkExperience