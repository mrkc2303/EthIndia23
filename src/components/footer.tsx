import React from 'react'
import Image from 'next/image'
import Logo from '../images/companylogo.svg'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillMediumCircle} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'

export default function footer() {
  return (
    <div className='border-t bg-gradient-to-b to-[#0466c879]  from-transparent via-[#00091b5b]'>
      <div className='xl:px-20 xl:pt-20 px-3 pt-8 flex flex-col justify-center items-center'>
        <div>          
            <h1 className='font-primary text-center font-bold text-white text-4xl xl:text-7xl'>Stay In Touch With Us</h1>
        </div>
      </div>
      <div className='flex xl:px-20 justify-between xl:py-20 px-3 py-12 flex-col xl:flex-row'>
        <div className='flex flex-col justify-center xl:justify-start'>
          <div className='flex justify-center xl:justify-start'></div>
          <p className='xl:w-1/3 text-[#ffffffcb] font-secondary text-center xl:text-left font-normal' ></p>
        </div>
      </div>
      <div className='border-t xl:mx-16 mx-6'>
        <h3 className=' pt-8 py-12 font-secondary text-center font-normal text-[#ffffffa5]'>All Rights Reserved ©2023 </h3>
      </div>
    </div>
  )
}
