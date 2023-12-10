import React from 'react'
import Image from 'next/image'
import Logo from '../images/companylogo.svg'
import { PushAPI } from '@pushprotocol/restapi'

export default function Chat() {
    // const userA = await PushAPI.initialize(signer);
  return (
    <div className='border-t bg-gradient-to-b to-[#0466c879]  from-transparent via-[#00091b5b] mr-5 rounded-lg'>
        <div className=" bg-gray-100 p-8 text-black">
            <div className="max-w-4xl mx-auto space-y-12 grid grid-cols-1">
                <div className="place-self-start">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none">
                    Hey, there! It's been a while!
                </div>
                </div>

                <div className="place-self-start text-left">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none">
                    Wanted to know if you wanted to get lunch sometime this week?
                </div>
                </div>

                <div className="place-self-start text-left">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none">
                    Or next week. I'm also free during the evenings next week.
                </div>
                </div>

                <div className="place-self-end text-right">
                <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                    Oops! Sorry for the late response!
                </div>
                </div>

                <div className="place-self-end text-right">
                <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                    I'd love to get lunch sometime next week!
                </div>
                </div>

                <div className="place-self-end text-right">
                <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                    Do you have any places in mind where you'd want to meet?
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}