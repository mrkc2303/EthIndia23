import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import Navbar from "../components/navbar";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import FreelanceDashboard from "../components/FreelanceDashboard";
import ClientDashboard from "../components/ClientDashboard";
import { Card, Metric, Text } from "@tremor/react";
import UserCard from "@/components/UserCard";

export default function Home() {
  const { sdk, connected, connecting, account } = useSDK();
  const [flowState, setFlowState] = useState(1)
  const [userType, setUserType] = useState<string>("")
  const { data: session } = useSession()
  useEffect(() => { 
    const getUsername = (async () => {
        console.log(session)
        if(session) {
            setFlowState(3);
            const imgLink = session?.user?.image;
            const userId = imgLink?.slice(imgLink?.indexOf('u/')+2, imgLink?.indexOf('?v'));
            // const res = await fetch('/api/auth/username', {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(userId),
            // });
            // console.log(res);
        }
      })();
  },[session])

//   const 

    type userData = {
        walletAddr: string;
        desc: string;
        github: number;
    };
  const users:userData[] = [
    {
        walletAddr: "0x7d73d45b8837Fe0E7f5F97D7Cb81174eA284ba51",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.",
        github: 72,
    }, 
    {
        walletAddr: "0x24a902cBdc965D4CB27cDfFCB3CCac1F29E3C471",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.",
        github: 48,
    }, 
    {
        walletAddr: "0x8AB95fF8B5e7Ced9bc6dCbf95B91E5FEf0007893",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.",
        github: 91,
    }, 
    {
        walletAddr: "0x02C0AD27c0463168427be27CE245D9D3b81b19e1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.",
        github: 39,
    }, 
  ];
  
  return (
    <div className=" text-white bg-[#211d34] min-h-screen">
      <div className="bg-gradient-to-t to-[#6e57e060]  from-transparent via-transparent">
        <Navbar />
        {/* {
            account == undefined ? (
                <div className="h-screen flex items-center justify-center">
                    <h1>Please Connect the wallet to Continue</h1>
                </div>
            ) : (
                <div>

                </div>
            )
        } */}

        {
            flowState === 1 && (
                <div className="h-screen w-screen flex justify-center items-center gap-16">
                    <button
                        onClick={() => {setFlowState(2); setUserType("Freelancer"); }}
                        rel="noopener noreferrer"
                        className="text-[#00091B] buttonNotch font-primary font-bold text-xs md:text-sm md:px-10 py-3"
                    >
                        Continue as a Freelancer
                    </button>
                    <button
                        onClick={() => {setFlowState(4); setUserType("Client"); }}
                        rel="noopener noreferrer"
                        className="text-[#fff] buttonNotch2 font-primary font-bold text-xs md:text-sm md:px-12 py-3"
                    >
                        Continue as a Client
                    </button>
                </div>
            )
        }

        {
            flowState === 2 && (
                <div className="h-screen w-screen flex justify-center items-center gap-16">
                    <button
                        onClick={() => {signIn();}}
                        rel="noopener noreferrer"
                        className="text-[#fff] buttonNotch2 font-primary font-bold text-xs md:text-sm md:px-12 py-3"
                    >
                        Connect Your GitHub
                    </button>
                </div>
            )
        }

        {
            session && session.user && session?.user?.image && flowState === 3 && (
                <FreelanceDashboard />
            )
        }

        {
            flowState === 4 && (
                // <ClientDashboard />
                <div className="mt-16 ">
                    <h1 className="text-3xl mx-5 mb-10">Client's Dashboard</h1>
                    <div className="mx-5 flex gap-16">
                        {/* <Card className="max-w-xs mx-auto cursor-pointer" decoration="top" decorationColor="indigo" onClick={() => alert("HELLO")}>
                            <Text>Sales</Text>
                            <Metric>$ 34,743</Metric>
                        </Card> */}
                        {
                            users.map((item)=> (
                                <UserCard walletAddr={item.walletAddr} desc={item.desc} github={item.github}/>
                            ))
                        }
                    </div>
                </div>
                
            )
        }
        
      </div>
    </div>
  );
}
