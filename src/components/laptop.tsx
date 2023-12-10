import React from 'react'
import Image from 'next/image'
import Home2 from '../images/home2.jpeg'


export default function laptop() {
  return (
    <div className='flex py-12 xl:py-28 px-3 xl:px-20 max-h-fit iframe-cover flex-col xl:flex-row gap-8'>
      <div className='xl:basis-2/3 h-full iframe-cover'>      
      <Image src={Home2} alt="Dextr Hero Image" objectFit='contain' width={500} />
      </div>
      <div className='flex justify-evenly flex-col xl:basis-1/3'>
        <h1 className='font-primary font-bold text-3xl xl:text-6xl text-center xl:text-right'>Smartest way to exchange value!</h1>
        <p className='text-[#ffffffa5] font-secondary text-base xl:text-xl text-center xl:text-right xl:flex hidden justify-end '>WorkRoll seamlessly integrates the best features of leading platforms, creating a unified hub for freelancers and businesses alike. Imagine having the power of Freelancer.com, Jira.</p>
        <p className='text-[#ffffffa5] font-secondary text-base text-center xl:hidden '>a freelancer's marketplace, and communication tools like Slack—all in one decentralized space. Here's why WorkRoll is your go-to solution</p>
      </div>
    </div>
  )
}


