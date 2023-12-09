import React from 'react'
import Image from 'next/image'
import Arbitrum from '../images/arbitrum.svg'
import Arcana from '../images/arcana.svg'
import Aurora from '../images/aurora.svg'
import Biconomy from '../images/biconomy.svg'
import Bsc from '../images/bsc.svg'
import Ef from '../images/ef.svg'
import Polybase from '../images/polybase.svg'
import Polygontech from '../images/polygontech.svg'
import Router from '../images/router.svg'
import Transak from '../images/transak.svg'
import Ethereum from '../images/Ethereum.svg'

export default function partners() {
    const images = [
        Arbitrum, Arcana, Aurora, Biconomy, Bsc, Ethereum, Polybase, Polygontech, Router, Transak     
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
