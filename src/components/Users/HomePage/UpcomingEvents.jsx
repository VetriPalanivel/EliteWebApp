import React, { Fragment } from 'react'
import './UpcomingEvents.css'
import Spacer from '../../Common/Spacer'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Slide, Zoom } from "react-awesome-reveal";
const eventsData = [
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
    id: 4,
    name: 'demo',
    imgUrl: 'https://images.unsplash.com/photo-1706859047968-c5d77c526695?q=80&w=1377&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
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
    id: 4,
    name: 'demo',
    imgUrl: 'https://images.unsplash.com/photo-1706859047968-c5d77c526695?q=80&w=1377&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },

]
const UpcomingEvents = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className='upcomingEvents__wrapper'>
      <div className='upcomingEvents__headingWrapper'>
        <Slide>
          <h5 className='upcomingEvents__heading heading__t1'>Upcoming Events</h5>
        </Slide>
      </div>
      <Spacer spacing={"4px"} />
      <div className='upcomingEvents__list'>

        <Carousel
          responsive={responsive}
          slidesToSlide={4}
          swipeable={true}
          draggable={true}
          showDots={true}
        >

          {eventsData?.map((ele) => {
            return (
              <Fragment key={ele.id}>

                <Zoom>
                  <div className={'upcomingEvents__card'}>
                    <div className={'upcomingEvents__cardImageWrapper'}>
                      <img
                        className={'upcomingEvents__cardImage'}
                        src={ele.imgUrl}
                        alt={ele.name}
                        loading="lazy"
                      />
                    </div>
                    <div className={'upcomingEvents__cardBottomWrapper'}>
                      <h5 className='upcomingEvents__name'>
                        {ele.name}
                      </h5>
                      <button
                        className='upcomingEvents__registerBtn'
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </Zoom>

              </Fragment>
            )
          })}
        </Carousel>


      </div>
    </div>
  )
}

export default UpcomingEvents