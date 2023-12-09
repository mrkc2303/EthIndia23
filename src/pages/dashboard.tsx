import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import Navbar from "../components/navbar";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import FreelanceDashboard from "@/components/FreelanceDashboard";

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
  
  return (
    <div className=" text-white bg-[#211d34]">
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
                        onClick={() => {setUserType("Freelancer"); setFlowState(2)}}
                        rel="noopener noreferrer"
                        className="text-[#00091B] buttonNotch font-primary font-bold text-xs md:text-sm md:px-10 py-3"
                    >
                        Continue as a Freelancer
                    </button>
                    <button
                        onClick={() => {setUserType("Client"); setFlowState(2)}}
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
            session && session.user && session?.user?.image && (
                <FreelanceDashboard />
            )
        }
        
      </div>
    </div>
  );
}
