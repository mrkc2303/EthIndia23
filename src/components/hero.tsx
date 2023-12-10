'use client'
import React from 'react'
import Image from 'next/image'
import HeroImage from '../images/heroImage.svg'
import Working from '../images/workingss.png'
import Link from 'next/link'

export default function hero() {

  
  return (
    <section className=' '>
      <div className='flex justify-center md:flex-row flex-col px-3 md:px-20 gap-10 pt-12 md:pt-20'>
      <div className='md:basis-1/2 flex flex-col justify-center md:gap-12 gap-5'>
        <div>
          <h1 className='font-primary font-bold text-5xl md:text-8xl md:text-left text-center  md:leading-[6rem] '>The Ultimate Decentralized Work Ecosystem</h1>
        </div>        
        <div>
          <p className='md:text-left text-center font-secondary text-[#ffffffa5] md:text-lg '> <span className='text-white underline underline-offset-4'>Discover WorkRoll :</span> Are you tired of juggling multiple platforms for freelancing, project management, and communication? Look no further! WorkRoll is here to revolutionize the way you work and collaborate in the digital world.</p>
        </div> 
        <div className='mt-4 flex flex-col md:flex-row gap-8 md:justify-start md:text-left text-center justify-center'>
          {/* <a href='https://forms.zohopublic.com/brainchain/form/DextrBetaProgram1/formperma/jwTVjPwh8O2gVFb0TZSSjuBkc-IluEevhgOxTLzDqeY?utm_source=twitter&utm_medium=Zoho+Social' rel="noopener noreferrer" target='_blank' className='text-[#00091B] buttonNotch font-primary font-bold text-xs md:text-sm md:px-10 py-3'>JOIN WAITLIST</a>   */}
          <Link href='/dashboard' rel='noopener noreferrer' className='text-[#fff] buttonNotch2 font-primary font-bold text-xs md:text-sm md:px-12 py-3'>DASHBOARD</Link>  
        </div>       
      </div>
      <div className='md:basis-1/2 card flex justify-center ' >
        <Image src={Working} alt="Dextr Hero Image" objectFit='contain' />
      </div>
      </div>

    </section>
  )
}
