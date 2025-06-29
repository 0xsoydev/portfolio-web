import React from 'react'

const contactInfo = [
    {
        id: 1,
        type: 'Email',
        value: 'wahid@example.com', // Replace with your actual email
        href: 'mailto:wahidshaikh.dev@gmail.com',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        id: 2,
        type: 'GitHub',
        value: '@0xsoydev',
        href: 'https://github.com/0xsoydev',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        )
    },
    {
        id: 3,
        type: 'LinkedIn',
        value: 'Wahid Shaikh',
        href: 'https://linkedin.com/in/0xwahidshaikh', // Replace with your actual LinkedIn
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        )
    },
    {
        id: 4,
        type: 'Twitter',
        value: '@0xsoydev',
        href: 'https://x.com/0xsoydev', // Replace with your actual Twitter
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        )
    }
]

const Contact = () => {
    return (
        <div className="mb-10">
            <h3 className="font-lexend text-lg md:text-2xl mb-6 font-medium">Get in Touch</h3>
            
            {/* Introduction */}
            <div className="mb-8">
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl">
                    I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. 
                    Feel free to reach out through any of the channels below.
                </p>
            </div>

            {/* Contact Icons - Side by Side */}
            <div className="flex flex-wrap gap-4 justify-start">
                {contactInfo.map((contact) => (
                    <a
                        key={contact.id}
                        href={contact.href}
                        target={contact.type !== 'Email' ? '_blank' : undefined}
                        rel={contact.type !== 'Email' ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/30 transition-all duration-200"
                        title={`${contact.type}: ${contact.value}`}
                    >
                        {/* Icon */}
                        <div className="w-10 h-10 bg-neutral-800/50 rounded-lg flex items-center justify-center text-neutral-400 group-hover:text-neutral-300 group-hover:bg-neutral-800/70 transition-all duration-200">
                            {contact.icon}
                        </div>
                        
                        {/* Label */}
                        <p className="text-sm font-lexend font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors whitespace-nowrap">
                            {contact.type}
                        </p>
                    </a>
                ))}
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
                <p className="text-xs text-neutral-500 font-lexend">
                    Currently based in Mumbai, India • Available for remote work
                </p>
            </div>
        </div>
    )
}

export default Contact