import React from 'react'
import Image from 'next/image'
import Push from '../images/pushProtocol.png'
import Inch from '../images/1inch.png'
import Metamask from '../images/metamask.webp'
import Scroll from '../images/scroll.png'
import Ethereum from '../images/Ethereum.svg'

export default function partners() {
    const images = [
         Ethereum, Push, Inch, Metamask, Scroll
    ].map((image) => ({
        id: crypto.randomUUID(),
        image
    }));

    var speed = 5000
  return (
    <div className="inner pt-12">
      <div className="wrapper">
        <section className='imgSection' >
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <Image src={image} className='sliderImg' alt={id} height={1000} width={1000} />
            </div>
          ))}
        </section>
        <section className='imgSection' >
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <Image src={image} className='sliderImg' alt={id} height={1000} width={1000} />
            </div>
          ))}
        </section>
        <section className='imgSection' >
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <Image src={image} className='sliderImg' alt={id} height={1000} width={1000} />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
