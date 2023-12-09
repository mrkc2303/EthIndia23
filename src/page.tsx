import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Partners from "./components/partners"
import Laptop from "./components/laptop"
import Features from "./components/features"
import Difference from "./components/difference"
import FAQs from "./components/faqs"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div className=" text-white bg-[#211d34] h-full">
      <div className="bg-gradient-to-t to-[#6e57e060]  from-transparent via-transparent">
        <Navbar />
        <Hero />
        <Partners />
      </div>
      <Laptop />
      <Features />
      <Difference />
      <FAQs />
      <Footer />
    </div>

  )
}
