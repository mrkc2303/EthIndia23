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
                    Hey, there!
                </div>
                </div>

                <div className="place-self-start text-left">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none">
                   What's the update on the SDK we were working on?
                </div>
                </div>

                {/* <div className="place-self-start text-left">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none">
                    Or next week. I'm also free during the evenings next week.
                </div>
                </div> */}

                <div className="place-self-end text-right">
                <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                    We are running late of deadline
                </div>
                </div>

                <div className="place-self-end text-right">
                <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                    It would take atleast a week more to execute it
                </div>
                </div>

                <div className="place-self-end text-right">
                <div className="bg-green-50 text-green-900 p-5 rounded-2xl rounded-tr-none">
                    We have to meet the production rules and techniques.
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}