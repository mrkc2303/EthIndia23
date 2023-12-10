"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
import Image from "next/image";
import Features1 from "../images/features1.svg";
import Features2 from "../images/features2.svg";

export default function features() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  return (
    <div className="xl:mx-20 mx-3  my-12 xl:my-20 flex flex-col xl:gap-16 gap-6">
    <div className=" border p-8 rounded-[50px] border-[#01C3F1] bg-gradient-to-tl from-[#d52bff49] to-transparent via-transparent overflow-hidden relative" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <div className="flex flex-col ">
        <div>
          <h1 className="font-bold text-center xl:text-left font-primary text-3xl xl:text-5xl">
          Freelancer's Marketplace:
          </h1>
          <p className="xl:w-2/3  xl:text-left text-center font-secondary mt-10 text-sm xl:text-xl text-[#ffffffa5]">
          -> Access a vast pool of skilled freelancers ready to tackle your projects.<br />
          -> Find the perfect match based on skills, reviews, and ratings.
          </p>
        </div>
        <div className={`overflow-hidden xl:absolute right-0 duration-500  ease-in-out ${isHovered ? "scale-125 right-10 duration-500  ease-in-out" : ""} `}>
          <Image src={Features2} alt="" objectFit="cover"  />
        </div>
      </div>
    </div>

    <div className=" border p-8 rounded-[50px] border-[#01C3F1] bg-gradient-to-tr from-[#d52bff49] to-transparent via-transparent overflow-hidden relative" onMouseEnter={()=>setIsHovered1(true)} onMouseLeave={()=>setIsHovered1(false)}>
      <div className="flex flex-col-reverse xl:flex-col">
        <div className={`overflow-hidden xl:absolute left-0 duration-500  ease-in-out ${isHovered1 ? "scale-125 left-10 duration-500  ease-in-out" : ""} `}>
          <Image src={Features1} alt="" objectFit="cover"  />
        </div>
        <div className="flex flex-col justify-center items-center xl:justify-end xl:items-end">
          <h1 className="font-bold text-center xl:text-right font-primary text-3xl xl:text-5xl">
          Project Management Excellence
          </h1>
          <p className=" xl:w-2/3 font-secondary text-center xl:text-right mt-10 text-xl text-[#ffffffa5]">
          -> Utilize project management tools inspired by Jira to streamline your workflow.<br />
          -> Organize tasks, track progress, and collaborate effortlessly.

          </p>
        </div>
      </div>
    </div>
    
    <div className=" border p-8 rounded-[50px] border-[#01C3F1] bg-gradient-to-tl from-[#d52bff49] to-transparent via-transparent overflow-hidden relative" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <div className="flex flex-col ">
        <div>
          <h1 className="font-bold text-center xl:text-left font-primary text-3xl xl:text-5xl">
          Unified Communication Hub
          </h1>
          <p className="xl:w-2/3  xl:text-left text-center font-secondary mt-10 text-sm xl:text-xl text-[#ffffffa5]">
          -> Access a vast pool of skilled freelancers ready to tackle your projects.<br />
          -> Find the perfect match based on skills, reviews, and ratings.
          </p>
        </div>
        <div className={`overflow-hidden xl:absolute right-0 duration-500  ease-in-out ${isHovered ? "scale-125 right-10 duration-500  ease-in-out" : ""} `}>
          <Image src={Features2} alt="" objectFit="cover"  />
        </div>
      </div>
    </div>
  

    <div className=" border p-8 rounded-[50px] border-[#01C3F1] bg-gradient-to-tr from-[#d52bff49] to-transparent via-transparent overflow-hidden relative" onMouseEnter={()=>setIsHovered1(true)} onMouseLeave={()=>setIsHovered1(false)}>
      <div className="flex flex-col-reverse xl:flex-col">
        <div className={`overflow-hidden xl:absolute left-0 duration-500  ease-in-out ${isHovered1 ? "scale-125 left-10 duration-500  ease-in-out" : ""} `}>
          <Image src={Features1} alt="" objectFit="cover"  />
        </div>
        <div className="flex flex-col justify-center items-center xl:justify-end xl:items-end">
          <h1 className="font-bold text-center xl:text-right font-primary text-3xl xl:text-5xl">
          Decentralized Approach:
          </h1>
          <p className=" xl:w-2/3 font-secondary text-center xl:text-right mt-10 text-xl text-[#ffffffa5]">
          -> Break free from centralization constraints and collaborate in a truly decentralized environment.<br />
          
          -> Embrace borderless communication and freelancing without geographical limitations.

          </p>
        </div>
      </div>
    </div>
    
    
    
    
    </div>
  );
}
