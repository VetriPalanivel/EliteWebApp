import React,{useState,useEffect} from 'react';
import './style.css'
import './fontawesome.min.css'
import './app.min.css'
import './Navbar.css'
import EliteLogo from "../../asserts/Logo.png";
function NavBarUser(){
  return (
   <>
   <div className="th-menu-wrapper">
        <div className="th-menu-area text-center user_Navbar">
          {/* <button className="th-menu-toggle">
            <i className="fal fa-times">
              </i>
              </button> */}
            <div className="mobile-logo"><a href="index.html"><img src={EliteLogo}  className="Logo_image" alt="Edura"/></a></div>
            <div className="th-mobile-menu">
                <ul>
                <li className="menu-item-has-children"><a href="#">Conferences</a>
                                                <ul className="sub-menu">
                                                    <li><a href="course.html">EGEMC</a></li>
                                                    <li><a href="course-2.html">EGEC</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Research & Inovation</a>
                                                <ul className="sub-menu">
                                                    <li><a href="team.html">Research Projects</a></li>
                                                    <li><a href="team-details.html">Inovations</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Trainings</a>
                                                <ul className="sub-menu">
                                                    <li><a href="about.html">Training for Trainers</a></li>
                                                    <li><a href="event.html">Workshops</a></li>
                                                    <li><a href="event-details.html">Competetions</a></li>
                                                    <li><a href="gallery.html">Exhibition</a></li>
                                                    <li><a href="error.html">EGE Clubs & Societies</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Programs</a>
                                                <ul className="sub-menu">
                                                    <li><a href="blog.html">EGE Task Force Research Publications</a></li>
                                                    <li><a href="blog-details.html">EGE Task Force Research Visibility</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Our Team</a>
                                                <ul className="sub-menu">
                                                    <li><a href="blog.html">organization</a></li>
                                                    <li><a href="blog-details.html">Scientific Committe</a></li>
                                                    <li><a href="blog-details.html">Ambassadors</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Career</a>
                                                <ul className="sub-menu">
                                                    <li><a href="blog.html">Career Opportunities</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">Sponsorship</a></li>
                                            <li><a href="contact.html">Latest News</a></li>
                                            <li><a href="contact.html">About</a></li>
                                        </ul>
            </div>
        </div>
    </div>
    <header className="th-header header-layout1">
        <div className="header-top">
            <div className="container">
                <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
                    <div className="col-auto d-none d-lg-block">
                        <div className="header-links">
                            <ul>
                                <li><i className="far fa-phone"></i><a href="tel:+11156456825">+111 (564) 568 25</a></li>
                                <li className="d-none d-xl-inline-block"><i className="far fa-envelope"></i><a
                                        href="mailto:info@Edura.com">info@eliteglobalexcellance.com</a></li>
                                <li style={{fontSize:"13.1px"}}><i className="far fa-clock"></i>Mon - Sat: 8:00 - 15:00</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="header-links header-right">
                            <ul>
                                <li>
                                    <div className="header-social"><span className="social-title" style={{fontSize:"13.1px"}}>Follow Us:</span> <a
                                            href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a> <a
                                            href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a> <a
                                            href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a> <a
                                            href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a> <a
                                            href="https://www.instagram.com/"><i className="fab fa-skype"></i></a></div>
                                </li>
                                <li className="d-none d-lg-inline-block" ><i className="far fa-user"></i><a
                                        href="contact.html" > Login / Register </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="sticky-wrapper ">
            <div className="menu-area ">
                <div className="container user_Navbar">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                            <div className="header-logo"><a href="index.html"><img src={EliteLogo} className="Logo_image"
                                        alt="Edura"/></a></div>
                        </div>
                        <div className="col-auto">
                            <div className="row">
                                <div className="col-auto" style={{margin:"0px",padding:"0px"}}>
                                    <nav className="main-menu d-none d-lg-inline-block">
                                        <ul>
                                            <li className="menu-item-has-children"><a href="#">Conferences</a>
                                                <ul className="sub-menu">
                                                    <li><a href="course.html">EGEMC</a></li>
                                                    <li><a href="course-2.html">EGEC</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Research & Inovation</a>
                                                <ul className="sub-menu">
                                                    <li><a href="team.html">Research Projects</a></li>
                                                    <li><a href="team-details.html">Inovations</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Trainings</a>
                                                <ul className="sub-menu">
                                                    <li><a href="about.html">Training for Trainers</a></li>
                                                    <li><a href="event.html">Workshops</a></li>
                                                    <li><a href="event-details.html">Competetions</a></li>
                                                    <li><a href="gallery.html">Exhibition</a></li>
                                                    <li><a href="error.html">EGE Clubs & Societies</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Programs</a>
                                                <ul className="sub-menu">
                                                    <li><a href="blog.html">EGE Task Force Research Publications</a></li>
                                                    <li><a href="blog-details.html">EGE Task Force Research Visibility</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Our Team</a>
                                                <ul className="sub-menu">
                                                    <li><a href="blog.html">organization</a></li>
                                                    <li><a href="blog-details.html">Scientific Committe</a></li>
                                                    <li><a href="blog-details.html">Ambassadors</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="#">Career</a>
                                                <ul className="sub-menu">
                                                    <li><a href="blog.html">Career Opportunities</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">Sponsorship</a></li>
                                            <li><a href="contact.html">Latest News</a></li>
                                            <li><a href="contact.html">About</a></li>
                                        </ul>
                                    </nav><button type="button" className="th-menu-toggle d-block d-lg-none"><i
                                            className="far fa-bars"></i></button>
                                </div>
                                 <div class="col-auto d-none d-xl-block" style={{margin:"0px",padding:"0px"}}>
                                    <div class="header-button">
                                            <a href="contact.html"
                                            class="th-btn ml-25">Contact Us <i class="fas fa-arrow-right ms-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    <div className="th-hero-wrapper hero-1" id="hero">
        <div className="hero-slider-1 th-carousel" data-fade="true" data-slide-show="1" data-md-slide-show="1"
            data-dots="true">
            <div className="th-hero-slide">
                <div className="th-hero-bg" data-overlay="title" data-opacity="8"
                    data-bg-src="assets/img/hero/hero_bg_1_1.jpg"></div>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6">
                            <div className="hero-style1"><span className="hero-subtitle" data-ani="slideinleft"
                                    data-ani-delay="0.1s"><span>35% OFF</span> LEARN FROM TODAY</span>
                                <h1 className="hero-title text-white" data-ani="slideinleft" data-ani-delay="0.4s">Education
                                    Is Create Better <span className="text-theme">Future.</span></h1>
                                <p className="hero-text" data-ani="slideinleft" data-ani-delay="0.6s">Education can be
                                    thought of as the transmission of the values and accumulated knowledge of a society.
                                    In this sense, it is equivalent.</p>
                                <div className="btn-group" data-ani="slideinleft" data-ani-delay="0.8s"><a
                                        href="contact.html" className="th-btn style3">Get Started<i
                                            className="fas fa-arrow-right ms-2"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-6 text-lg-end text-center">
                            <div className="hero-img1"><img src="assets/img/hero/hero_thumb_1_1.jpg" alt="hero"/></div>
                        </div>
                    </div>
                </div>
                <div className="hero-shape shape1"><img src="assets/img/hero/shape_1_1.png" alt="shape"/></div>
                <div className="hero-shape shape2"><img src="assets/img/hero/shape_1_2.png" alt="shape"/></div>
                <div className="hero-shape shape3"></div>
                <div className="hero-shape shape4 shape-mockup jump-reverse" data-right="3%" data-bottom="7%"><img
                        src="assets/img/hero/shape_1_3.png" alt="shape"/></div>
                <div className="hero-shape shape5 shape-mockup jump-reverse" data-left="0" data-bottom="0"><img
                        src="assets/img/hero/shape_1_4.png" alt="shape"/></div>
            </div>
            <div className="th-hero-slide">
                <div className="th-hero-bg" data-overlay="title" data-opacity="8"
                    data-bg-src="assets/img/hero/hero_bg_1_2.jpg"></div>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6">
                            <div className="hero-style1"><span className="hero-subtitle" data-ani="slideinleft"
                                    data-ani-delay="0.1s"><span>35% OFF</span> LEARN FROM TODAY</span>
                                <h1 className="hero-title text-white" data-ani="slideinleft" data-ani-delay="0.4s">Edura
                                    Leads To A Brighter <span className="text-theme">Future.</span></h1>
                                <p className="hero-text" data-ani="slideinleft" data-ani-delay="0.6s">Education can be
                                    thought of as the transmission of a societys values and accumulated knowledge. In
                                    this sense, it is equivalent.</p>
                                <div className="btn-group" data-ani="slideinleft" data-ani-delay="0.8s"><a
                                        href="contact.html" className="th-btn style3">Get Started<i
                                            className="fas fa-arrow-right ms-2"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-6 text-lg-end text-center">
                            <div className="hero-img1"><img src="assets/img/hero/hero_thumb_1_2.jpg" alt="hero"/></div>
                        </div>
                    </div>
                </div>
                <div className="hero-shape shape1"><img src="assets/img/hero/shape_1_1.png" alt="shape"/></div>
                <div className="hero-shape shape2"><img src="assets/img/hero/shape_1_2.png" alt="shape"/></div>
                <div className="hero-shape shape3"></div>
                <div className="hero-shape shape4 shape-mockup jump-reverse" data-right="3%" data-bottom="7%"><img
                        src="assets/img/hero/shape_1_3.png" alt="shape"/></div>
                <div className="hero-shape shape5 shape-mockup jump-reverse" data-left="0" data-bottom="0"><img
                        src="assets/img/hero/shape_1_4.png" alt="shape"/></div>
            </div>
            <div className="th-hero-slide">
                <div className="th-hero-bg" data-overlay="title" data-opacity="8"
                    data-bg-src="assets/img/hero/hero_bg_1_3.jpg"></div>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6">
                            <div className="hero-style1"><span className="hero-subtitle" data-ani="slideinleft"
                                    data-ani-delay="0.1s"><span>35% OFF</span> LEARN FROM TODAY</span>
                                <h1 className="hero-title text-white" data-ani="slideinleft" data-ani-delay="0.4s">The
                                    Worlds Best Online Education <span className="text-theme">Institute.</span></h1>
                                <p className="hero-text" data-ani="slideinleft" data-ani-delay="0.6s">Education can be
                                    thought of as the transmission of the values and accumulated knowledge of a society.
                                    In this sense, it is equivalent.</p>
                                <div className="btn-group" data-ani="slideinleft" data-ani-delay="0.8s"><a
                                        href="contact.html" className="th-btn style3">Get Started<i
                                            className="fas fa-arrow-right ms-2"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-6 text-lg-end text-center">
                            <div className="hero-img1"><img src="assets/img/hero/hero_thumb_1_3.jpg" alt="hero"/></div>
                        </div>
                    </div>
                </div>
                <div className="hero-shape shape1"><img src="assets/img/hero/shape_1_1.png" alt="shape"/></div>
                <div className="hero-shape shape2"><img src="assets/img/hero/shape_1_2.png" alt="shape"/></div>
                <div className="hero-shape shape3"></div>
                <div className="hero-shape shape4 shape-mockup jump-reverse" data-right="3%" data-bottom="7%"><img
                        src="assets/img/hero/shape_1_3.png" alt="shape"/></div>
                <div className="hero-shape shape5 shape-mockup jump-reverse" data-left="0" data-bottom="0"><img
                        src="assets/img/hero/shape_1_4.png" alt="shape"/></div>
            </div>
        </div>
    </div>
   </>
  )};

  export default NavBarUser;