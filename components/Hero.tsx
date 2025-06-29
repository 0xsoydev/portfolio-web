'use client'

import React from 'react'
import Image from 'next/image'
import Contributions from './Contributions'
import RecentActivity from './RecentActivity'

const Hero = () => {
  return (
    <section className='mt-8 sm:mt-12 lg:mt-20'>
      <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-10'>
        <div className='flex-shrink-0'>
          <Image 
            src='/avatar.png' 
            alt='Wahid Shaikh' 
            height={150} 
            width={150} 
            className='rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 ring-3 ring-neutral-800'
          />
        </div>
        <div className='flex-grow text-center lg:text-left'>
          <div className='space-y-4'>
            <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-lexend leading-tight font-semibold'>
              <span className='text-neutral-500'>Hey, I&apos;m</span> Wahid Shaikh. 
            </div>
            <div className='font-lexend text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0'>
              <span className="text-lg md:text-xl font-lexend">
                <span className='text-neutral-500'>I'm a</span> DevOps Engineer 
                <span className='text-neutral-500'> &</span> Full Stack Developer 
                <span className='text-neutral-500'> based in
                  </span> Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className='md:mt-12 mt-8 sm:mt-10'>
        <div className='font-lexend text-lg md:text-2xl mb-6 font-medium'>
          My Contributions
        </div>
        <div>
          <Contributions />
        </div>
        <div className='mt-10'>
          <RecentActivity />
        </div>
      </div>
    </section>
  )
}

export default Hero 