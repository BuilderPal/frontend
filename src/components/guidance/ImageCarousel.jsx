import { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000} // Adjust as needed
      >
        {this.props.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} className='h-96 object-cover rounded-xl'/>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default ImageCarousel;