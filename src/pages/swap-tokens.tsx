import Swap from "@/components/swap"
import Navbar from "../components/navbar"

export default function SwapTokens() {
  return (
    <div className=" text-white bg-[#211d34] h-full">
      <div className="bg-gradient-to-t to-[#6e57e060]  from-transparent via-transparent">
        <Navbar />
        <Swap />
      </div>
    </div>
  )
}
