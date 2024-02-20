import React, { Fragment } from 'react'
import './SliderBanner.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'rsuite';
const SliderBanner = () => {

  const sliderData = [
    {
      id: 1,
      name: 'demo',
      imgUrl: 'https://images.unsplash.com/photo-1706859047968-c5d77c526695?q=80&w=1377&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'demo',
      imgUrl: 'https://images.unsplash.com/photo-1707347566125-e24f520e2dab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'demo',
      imgUrl: 'https://images.unsplash.com/photo-1707334459557-e3034e158035?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'demo',
      imgUrl: 'https://images.unsplash.com/photo-1706859047968-c5d77c526695?q=80&w=1377&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },

  ]
  return (
      <Carousel autoplay className="custom-slider"  shape="bar">
      {sliderData?.map((ele) => {
            return (
                <img  src={ele.imgUrl}
              alt={ele.name} />
              )
            })}
   
  </Carousel>
  )
}

export default SliderBanner



