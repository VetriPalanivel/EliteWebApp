import React, { Fragment } from 'react'
import NavBarUser from '../NavBar'
import Footer from '../Footer'
import AboutUs from './AboutUs'
import Spacer from '../../Common/Spacer'
import SliderBanner from './SliderBanner'
import UpcomingEvents from './UpcomingEvents'
import LatestNews from './LatestNews'
import PartnerAndCollaborate from './PartnerAndCollaborate'

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <NavBarUser />
        <Spacer spacing={"70px"}/>
        <SliderBanner />
        <AboutUs />
        <UpcomingEvents/>
        <LatestNews/>
        <PartnerAndCollaborate />
        <Footer />
      </div>
    </Fragment>
  )
}

export default HomePage