import React, { Fragment } from 'react'
import NavBarUser from '../NavBar'
import Footer from '../Footer'
import AboutUs from './InfoCard'
import Spacer from '../../Common/Spacer'


const ResearchProjects = () => {
  return (
    <Fragment>
      <div>
        <NavBarUser />
        <Spacer spacing={"55px"}/>
        
        <AboutUs />
  
        <Footer />
      </div>
    </Fragment>
  )
}

export default ResearchProjects