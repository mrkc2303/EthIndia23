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
            Fortified “ Decentralized ” Custody
          </h1>
          <p className="xl:w-2/3  xl:text-left text-center font-secondary mt-10 text-sm xl:text-xl text-[#ffffffa5]">
            Experience unrivaled fund security with our decentralized custody
            solution, incorporating on-chain Social Recovery, Will
            Administration, Multi-Factor Authentication, <br /> and Multi-Party
            Authorizations.
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
          Seamless "Cross-Chain" Trading
          </h1>
          <p className=" xl:w-2/3 font-secondary text-center xl:text-right mt-10 text-xl text-[#ffffffa5]">
          Discover the power of On-Chain Orderbook, Dynamic AMMs, Best Price Discovery, and Bridgeless Cross-chain Settlement. Experience transparent, secure, and seamless trading for maximum profit potential.

          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
