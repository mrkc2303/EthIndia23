"use client"
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import Diff1 from '../images/diff1.png'
import Diff2 from '../images/diff2.png'
import Diff3 from '../images/diff3.png'
import Diff4 from '../images/diff4.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const FeatureCard = (props:any) =>{
  return(
    <div className='flex flex-col transition-colors justify-center border border-[#01C3F1] rounded-[50px] p-8 xl:pb-24 hover:bg-gradient-to-br from-[#d52bffac] duration-300 ease-in to-[#01c1f1b1] relative overflow-hidden min-h-full gap-5 mb-10'>
      <div>
        <h3 className='font-bold font-primary xl:text-left text-center text-xl xl:text-4xl'>{props.title}</h3>
        <p className='font-normal mt-5  text-xs xl:text-xl xl:text-left text-center font-secondary xl:w-2/5'>{props.description}</p>
      </div>
      <div className='xl:absolute right-0 top-12 '>
        <Image src={props.image} alt={props.title} objectFit="contain" />
      </div>
    </div>
  )
}


export default function difference() {

  const content:any = [
    {
      id: 1,
      title: 'Create Your Profile  ',
      description: 'Join WorkRoll and set up your freelancer or business profile.',
      image: Diff1
    },
    {
      id: 2,
      title: 'Explore Opportunities: ',
      description: 'Browse through a diverse range of projects or find the perfect freelancer for your needs.',
      image: Diff2
    },
    {
      id: 3,
      title: 'Efficient Project Management:',
      description: "Utilize Jira-inspired tools to manage tasks, milestones, and project timelines effortlessly.",
      image: Diff3
    },
    {
      id: 4,
      title: 'Real-Time Communication:',
      description: 'Connect with collaborators instantly using integrated chat, calls, and video sharing features.',
      image: Diff4
    }
  ]

  return (
    <div id="features" className='py-12 xl:py-28 '>
      <div className='text-center flex justify-center mx-3 xl:mx-20 flex-col gap-3'>
        <h1 className='text-3xl xl:text-6xl font-primary font-bold ' >How WorkRoll Works:</h1>
        <p className=' text-center xl:mx-64 text-sm xl:text-xl text-[#ffffffa5]'> Experience the synergy of freelancing, project management, and communication on a single, decentralized platform. WorkRoll empowers you to work smarter, collaborate seamlessly, and embrace the future of decentralized work ecosystems. Join WorkRoll—where freelancing meets efficiency in the digital age!
        </p>
      </div>
      <div className='pt-6 xl:pt-12  mx-3 xl:mx-20'>
      <Swiper
      spaceBetween={50}      
      slidesPerView={1.5}
      loop={true}
      grabCursor={true}
      navigation={true}      
      autoplay={{ delay: 2500 }}
      parallax={true}
      pagination={{ clickable: true }}
      modules={[ Pagination, Navigation]}
      className="mySwiper"
      

    >
      {content.map((item:any) => (
        <SwiperSlide key={item.id}>
          <FeatureCard title={item.title} description={item.description} image={item.image}/>
          </SwiperSlide>
      ))}
      
    </Swiper>

          {/* <FeatureCard title="Secure Ownership, Today & Tomorrow!" description="With recoverability in case of lost private keys and facilitation of succession planning, your ownership remains secure and future-proofed. Enjoy peace of mind and long-term security for your digital assets." image={Diff1}/> */}

      </div>
    </div>
  )
}
