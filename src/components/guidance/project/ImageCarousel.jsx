import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={false}
        autoPlay={false}
      >
        {images.map((image, index) => (
            <img key={index}src={image} alt={`${index}`} className='object-cover rounded-xl'/>
        ))}
      </Carousel>
  )
}

export default ImageCarousel
