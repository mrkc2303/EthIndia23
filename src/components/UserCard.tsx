import { ProgressCircle } from '@tremor/react'
import React from 'react'

type props = {
    walletAddr: string;
    desc: string;
    github: number;
  };

export default function UserCard({walletAddr, desc, github }: props) {
    // const userA = await PushAPI.initialize(signer);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#4b0082] dark:border-gray-700">
        <a href="#">
            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{walletAddr?.slice(0,11) + "..."}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}</p>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>GitHub Score:</p>
            <ProgressCircle
                value={github}
                radius={40}
                strokeWidth={10}
            >{github}</ProgressCircle>
            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" >
                Want to Work?
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>

        </div>
        
    </div>
  )
}
