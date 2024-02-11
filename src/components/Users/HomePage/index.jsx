import React, { Fragment } from 'react'
import NavBarUser from '../NavBar'
import Footer from '../Footer'
import AboutUs from './AboutUs'
import Spacer from '../../Common/Spacer'
import SliderBanner from './SliderBanner'
import UpcomingEvents from './UpcomingEvents'

import PartnerAndCollaborate from './PartnerAndCollaborate'
import LatestNews from './LatestNews.'
import WhyEGE from './WhyEGE'

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <NavBarUser />
        <Spacer spacing={"55px"}/>
        <SliderBanner />
        <AboutUs />
        <UpcomingEvents/>
        <LatestNews/>
        <PartnerAndCollaborate />
        <WhyEGE/>
        <Footer />
      </div>
    </Fragment>
  )
}

export default HomePage