import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ImageGallery from 'react-image-gallery'

const ImageCarousel = ({ images }) => {
  return (
    // <ImageGallery items={imagesProcessed} />
    <>
<div className="carousel carousel-center h-96 w-96 p-4 space-x-4 rounded-box">
        {images.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img src={image} className="rounded-box" />
          </div>
        ))}
      </div>

    </>
  )
}

export default ImageCarousel
