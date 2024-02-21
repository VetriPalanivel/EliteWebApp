import React from 'react'
import './style.css'
import './fontawesome.min.css'
import './app.min.css'
import AboutUs1 from '../../asserts/About_us1.jpg'
import AboutUs2 from '../../asserts/About_us2.jpg'
import AboutUs3 from '../../asserts/About_us3.jpg'

function About() {
  return (
   <>
    <div className="space overflow-hidden" id="about-sec">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-xl-6">
                    <div className="img-box1 mb-40 mb-xl-0">
                        <div className="img1"><img className="tilt-active" src="assets/img/normal/about_1_1.png" alt="About"/>
                        </div>
                        <div className="about-grid" data-bg-src="assets/img/normal/about_1_3.png">
                            <h3 className="about-grid_year"><span className="counter-number">10</span>k<span
                                    className="text-theme">+</span></h3>
                            <p className="about-grid_text">Students Courses</p>
                        </div>
                        <div className="img2"><img className="tilt-active" src="assets/img/normal/about_1_2.png" alt="About"/>
                        </div>
                        <div className="shape-mockup about-shape1 jump" data-left="-67px" data-bottom="0"><img
                                src="" alt="img"/></div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="title-area mb-30"><span className="sub-title"><i className="fal fa-book me-2"></i> About Our
                            University</span>
                        <h2 className="sec-title">Welcome to Edura University.</h2>
                    </div>
                    <p className="mt-n2 mb-25">Collaboratively simplify user friendly networks after principle centered
                        coordinate effective methods of empowerment distributed niche markets pursue market positioning
                        web-readiness after resource sucking applications.</p>
                    <p className="mb-30">Online education, also known as e-learning, is a method of learning that takes
                        place over the internet. It offers individuals the opportunity to acquire knowledge, skills.</p>
                    <div className="row align-items-center">
                        <div className="col-md-auto">
                            <div className="about-grid_img mb-30 mb-md-0"><img src="assets/img/normal/about_1_4.png"
                                    alt="img"/></div>
                        </div>
                        <div className="col-md-7">
                            <div className="checklist">
                                <ul>
                                    <li>Get access to 4,000+ of our top courses</li>
                                    <li>Popular topics to learn now</li>
                                    <li>Find the right instructor for you</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group mt-40"><a href="about.html" className="th-btn">About More<i
                                className="fa-regular fa-arrow-right ms-2"></i></a></div>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default About
