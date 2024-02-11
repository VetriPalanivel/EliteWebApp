import React, { Fragment } from 'react'
import Spacer from '../../Common/Spacer'
import './PartnerAndCollaborate.css'
import { Slide, Zoom } from "react-awesome-reveal";
const PartnerAndCollaborate = () => {
  return (
    <Fragment>
      <div className='partnerAndCollaborate__wrapper'>
        <div className='partnerAndCollaborate__headingWrapper'>
          <Slide>
            <h5 className='partnerAndCollaborate__heading'>
              Our Partners and Collaborators in the Journey of Innovation and Research
            </h5>
          </Slide>
        </div>
        <Spacer spacing={"4px"} />
        <div className='partnerAndCollaborate__bannerWrapper'>
          <Zoom>
            <img
              src="https://images.unsplash.com/photo-1707334459557-e3034e158035?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="banner 1"
              className='partnerAndCollaborate__banner'
            />
          </Zoom>
          <Zoom>
            <img
              src="https://images.unsplash.com/photo-1707334459557-e3034e158035?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="banner 2"
              className='partnerAndCollaborate__banner'
            />
          </Zoom>
        </div>
      </div>
    </Fragment>
  )
}

export default PartnerAndCollaborate