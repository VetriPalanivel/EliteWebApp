import Box from "@mui/material/Box";
import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AboutUs from "./AboutUs";
import UserHeader from "./UserHeader";
import WhyEGE from "./WhyEGE";
import UpcomingEvents from "./UpcomingEvents";
import Partnership from "./Partnership";
import Footer from "./Footer";


function LandingPageUser() {
  return (
    <Fragment>
    <Box sx={{display:"flex"}}>
        <CssBaseline />
        <UserHeader/>
        <div style={{background: "#faf9f5"}}>
        <AboutUs /> 
        <UpcomingEvents/>
        <Partnership />
        <WhyEGE />
        <Footer />
        </div>
       
    </Box>
</Fragment>
  )
}

export default LandingPageUser
