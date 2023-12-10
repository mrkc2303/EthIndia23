import { ProgressCircle } from '@tremor/react'
import React, { useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import Link from 'next/link';

type props = {
    walletAddr: string;
    desc: string;
    github: number;
  };

export default function UserCard({walletAddr, desc, github }: props) {
    const [openModal, setOpenModal] = useState(false);

    const [clientWallet, setClientWallet] = useState("");
    const [freelancerWallet, setFreelancerWallet] = useState("");
    const [totalAmt, setTotalAmt] = useState("");
    const [mil1Amt, setMil1Amt] = useState("");
    const [mil2Amt, setMil2Amt] = useState("");
    const [mil3Amt, setMil3Amt] = useState("");
    const [mil1Desc, setMil1Desc] = useState("");
    const [mil2Desc, setMil2Desc] = useState("");
    const [mil3Desc, setMil3Desc] = useState("");

    function onCloseModal() {
        setOpenModal(false);
    }
    
    function handleClick(): void {
        const arr = [{
            mil1Amt,
            mil1Desc
        }, {
            mil2Amt,
            mil2Desc
        },{
            mil3Amt,
            mil3Desc
        }]
        const obj = {
            clientWallet,
            freelancerWallet,
            totalAmt,
            arr
        }
        console.log(obj);
    }

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
            >
                {github}
            </ProgressCircle>
            <Button onClick={() => setOpenModal(true)} className="block text-white bg-blue-700 hover:bg-blue-800 my-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Want to Work?
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Button>

            <Link href="/dashboard/clientCall">Talk on Video Call</Link>

        </div>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 text-black">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Work through our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="wallet"
                placeholder="Your Wallet Address"
                className='mt-2'
                value={clientWallet}
                onChange={(event) => setClientWallet(event.target.value)}
                required
              />

            <TextInput
                id="freelancerWallet"
                placeholder="Freelancers Wallet Address"
                className='mt-2'
                value={freelancerWallet}
                onChange={(event) => setFreelancerWallet(event.target.value)}
                required
              />

            <TextInput
                id="totalAmt"
                placeholder="Total Amount"
                className='mt-2'
                value={totalAmt}
                onChange={(event) => setTotalAmt(event.target.value)}
                required
              />    
              
              <label className='mt-3'>Milestone - 1</label>
              <div className='mt-2'>
                <TextInput
                    id="amtMil1"
                    placeholder="Milestone 1 Amount"
                    className=''
                    value={mil1Amt}
                    onChange={(event) => setMil1Amt(event.target.value)}
                    required
                /> 
                <TextInput
                    id="milDesc1"
                    placeholder="Milestone 1 Description"
                    className=''
                    value={mil1Desc}
                    onChange={(event) => setMil1Desc(event.target.value)}
                    required
                /> 
              </div>
              <label className='mt-3'>Milestone - 2</label>
              <div className='mt-2'>
                <TextInput
                    id="amtMil2"
                    placeholder="Milestone 2 Amount"
                    className=''
                    value={mil2Amt}
                    onChange={(event) => setMil2Amt(event.target.value)}
                    required
                /> 
                <TextInput
                    id="milDesc2"
                    placeholder="Milestone 2 Description"
                    className=''
                    value={mil2Desc}
                    onChange={(event) => setMil2Desc(event.target.value)}
                    required
                /> 
              </div>

              <label className='mt-3'>Milestone - 3</label>
              <div className='mt-2'>
                <TextInput
                    id="amtMil3"
                    placeholder="Milestone 3 Amount"
                    className=''
                    value={mil3Amt}
                    onChange={(event) => setMil3Amt(event.target.value)}
                    required
                /> 
                <TextInput
                    id="milDesc3"
                    placeholder="Milestone 3 Description"
                    className=''
                    value={mil3Desc}
                    onChange={(event) => setMil3Desc(event.target.value)}
                    required
                /> 
              </div>

            </div>

            <div className="w-full">
              <Button onClick={()=> handleClick()}>Quote!</Button>
            </div>
        
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
