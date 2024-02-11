import React, { Fragment } from 'react'
import './LatestNews.css'
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
const LatestNews = () => {
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
    <div className='latestNews__wrapper'>
      <div className='latestNews__headingWrapper'>
        <Slide>
          <h5 className='latestNews__heading heading__t1'>Latest News</h5>
        </Slide>
      </div>
      <Spacer spacing={"4px"} />
      <div className='latestNews__list'>

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
                  <div className={'latestNews__card'}>
                    <div className={'latestNews__cardImageWrapper'}>
                      <img
                        className={'latestNews__cardImage'}
                        src={ele.imgUrl}
                        alt={ele.name}
                        loading="lazy"
                      />
                    </div>
                    <div className={'latestNews__cardBottomWrapper'}>
                      <p className='latestNews__info'>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam eius nisi, non culpa iure recusandae. Numquam quod delectus accusamus ab nobis! Asperiores ex non magnam id inventore quis maxime nobis.
                      </p>
                    </div>
                  </div>
                </Zoom>

              </Fragment>
            )
          })}
        </Carousel>


      </div>
      <div>
        <button
          className='latestNews__moreBtn'
        >
        {` More News / Articles >>`}
        </button>
      </div>
    </div>
  )
}

export default LatestNews