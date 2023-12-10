// /* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from 'next/image'
import Logo from '../images/companylogo.svg'
import Link from 'next/link'
import { NextPage } from 'next';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react'
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import { useSDK } from '@metamask/sdk-react'
import { MetaMaskProvider } from '@metamask/sdk-react';
import { ConnectWalletButton } from './ConnectWalletButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'


export default function Navbar() {

  const host =
  typeof window !== "undefined" ? window.location.host : "defaultHost";
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };

  
  const [toggleMenu, setToggleMenu] = useState(false);
  
  // const { sdk, connected, connecting, account } = useSDK();

  return (
    <nav className="flex justify-between w-full">
      {/* <MetaMaskProvider debug={false} sdkOptions={sdkOptions}> */}
      <div className='font-primary flex justify-between pt-2 px-1 w-full xl:pt-5 xl:px-12'>
      <div className='flex gap-32 font-bold text-3xl'>
        <Link href="/">SuperFlow</Link>
      <div className='text-[#01C3F1] font-bold hidden xl:flex gap-12 justify-center items-center text-xs'>    
        {/* <a href="#features" className={`hover:underline underline-offset-8 duration-150`} >FEATURES</a> */}
        <Link href="/dashboard" rel="noopener noreferrer" className={`hover:underline underline-offset-8 duration-150 `}  > DASHBOARD </Link>
        
        {/* <a href="mailto:info@dextr.exchange" className={`hover:underline underline-offset-8 duration-150`} >CONTACT</a> */}
      </div>
      </div>
      <div>
      <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
        <ConnectWalletButton />
      </MetaMaskProvider>

        {/* <ConnectButton />        */}
      </div>
    </div>
      <div className="flex relative">
      {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white xl:hidden cursor-pointer h-full pt-3" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul className='z-10 fixed -top-0 -right-4 p-3 w-[60vw] h-full shadow-2xl md:hidden gap-5 list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
            <li className="text-xl w-full my-2 font-primary ">
              <AiOutlineClose onClick={()=> setToggleMenu(false)}/></li>
              <Link href="#features" className={`hover:underline underline-offset-8 duration-150 mr-7`} >FEATURES</Link>
        <a href="https://dextr.gitbook.io/whitepaper/" target="_blank" rel="noopener noreferrer" className={`hover:underline underline-offset-8 duration-150 mr-7`} >WHITEPAPER</a>
         <a href="mailto:info@dextr.exchange" className={`hover:underline underline-offset-8 duration-150 mr-7`} >CONTACT</a>
         <a href='https://forms.zohopublic.com/brainchain/form/DextrBetaProgram1/formperma/jwTVjPwh8O2gVFb0TZSSjuBkc-IluEevhgOxTLzDqeY?utm_source=twitter&utm_medium=Zoho+SocialmG' rel='noopener noreferrer' target='_blank' className={`underline underline-offset-8 duration-150 mr-7`} >App Coming Soon</a>


          </ul>
        )}
      </div>
      {/* </MetaMaskProvider> */}
    </nav>
  );
};