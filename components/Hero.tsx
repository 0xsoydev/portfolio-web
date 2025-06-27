'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Contributions from './Contributions'

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className='flex flex-col items-center relative max-w-4xl mx-auto z-10'>

        <div className='text-4xl md:text-6xl lg:text-7xl font-lexend font-extralight bg-gradient-to-t from-gray-900/30 to-white/60 text-transparent bg-clip-text z-10 relative tracking-widest'>
          HELLO, I'M
        </div>
        
        <div className='text-6xl md:text-8xl lg:text-9xl font-lexend font-bold -mt-4 md:-mt-8 lg:-mt-8 relative z-20 text-center leading-none xl:whitespace-nowrap'>
          <span className='bg-gradient-to-b from-blue-100 via-blue-500 to-neutral-950 bg-clip-text font-dmSerif text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] filter'>
            Wahid Shaikh
          </span>
        </div>
        
        <div className='text-lg md:text-xl text-white/40 mt-2 text-center max-w-2xl font-lexend font-light'>
          DevOps & Full Stack Developer
        </div>

          <div className='mt-10'>
           <div className='flex gap-6'>
           <Button className="px-9 py-7 bg-transparent text-muted-foreground border-2 hover:bg-blue-500 hover:text-white">My Resume</Button>
           <Button className="px-9 py-7 bg-transparent text-white border-2 hover:bg-white hover:text-black">Github</Button>
           </div>
         </div>
      </div>
    </section>
  )
}

export default Hero 