import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './commoncss.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Button } from "rsuite";


const CustomTypography = styled(Typography)(({})=>({
    
    padding:"30px",
   
  

}))
function CommonForgeHeader(){
    return (
        
        <CustomTypography>
        "Forge Your path as a Research Assistant: Join Force With Elite Global Excellence on our Latest Project! Embrace the oppotunity to shape Tommorrow's Discoveries. Apply Now and Elevate Your Scholarly Journey with EGE!"
    </CustomTypography>)
}



 function CommonSwiper({images=[]}) {
 
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        style={{width:"100%",height:"100%"}}
      >
        {images.map((ele)=>{
            return  <SwiperSlide>
            <img src="https://placehold.co/600x400"/>
        </SwiperSlide>
        })}
      
     
      </Swiper>
    </>
  );
}

 const StyledLoadingButton = styled(Button)(({ theme }) => ({
    minWidth: "200px",
    minHeight:"40px",
    borderRadius: "1px",
    "&:hover": {
        backgroundColor: ""
    },
    backgroundColor:"#ffbf00",
    color:"Black"
}));


export {CommonForgeHeader,CommonSwiper,StyledLoadingButton}