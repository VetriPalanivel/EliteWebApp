import React, { Fragment } from 'react'
import './AboutUs.css'

import { Slide, Zoom } from "react-awesome-reveal";
import Spacer from '../../Common/Spacer/index';

const AboutUs = () => {
  return (
    <Fragment>
      <div className="about_wrapper">
        <div className="about_content">
          <p className="about_heading">About Us</p>
          <p className="about_text">
          Want to nail that first impression on the home page?
How about getting more eyes on your portfolio?
Or perhaps you want to give your new product some room to shine?
          </p>
          <p className="about_text">Want to nail that first impression on the home page?
How about getting more eyes on your portfolio?
Or perhaps you want to give your new product some room to shine? 
</p>
          </div>
          <div className="about_image">
          Want to nail that first impression on the home page?
How about getting more eyes on your portfolio?
Or perhaps you want to give your new product some room to shine?
            </div>
      </div>
    </Fragment>
  )
}

export default AboutUs