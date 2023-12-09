import React from 'react'
import Image from 'next/image'
import Laptop from '../images/laptop.svg'


export default function laptop() {
  return (
    <div className='flex py-12 xl:py-28 px-3 xl:px-20 max-h-fit iframe-cover flex-col xl:flex-row gap-8'>
      <div className='xl:basis-2/3 h-full iframe-cover'>      
      <Image src={Laptop} alt="Dextr Hero Image" objectFit='contain' />
      </div>
      <div className='flex justify-evenly flex-col xl:basis-1/3'>
        <h1 className='font-primary font-bold text-3xl xl:text-6xl text-center xl:text-right'>Smartest way to exchange value!</h1>
        <p className='text-[#ffffffa5] font-secondary text-base xl:text-xl text-center xl:text-right xl:flex hidden justify-end '>Experience unmatched security, seamless convenience and prosperous profitability. Say goodbye to key loss, front-running attacks, wash trading, bridge hacks, plutocratic governance and sheild yourself from multi-billion-dollar losses.</p>
        <p className='text-[#ffffffa5] font-secondary text-base text-center xl:hidden '>Experience unmatched security, seamless convenience and prosperous profitability. Say goodbye to key loss, front-running attacks, wash trading, bridge hacks, plutocratic governance and sheild yourself from multi-billion-dollar losses.</p>
      </div>
    </div>
  )
}


