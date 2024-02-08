import React from 'react';
import { Grid, Row, Col, Button } from 'rsuite';
import { Avatar } from '@mui/material';
import AboutUsImage from '../../asserts/AboutUs.png';

function AboutUs() {
  return (
    <div className="about-us-container">
      <Grid
        fluid
        className="about-us-grid"
      >
        <Row gutter={16} className="about-us-row">
          <Col xs={24} md={24} lg={24} xl={24}>
            <div className="about-us-content">
              <Button
                variant="contained"
                color="success"
                className="about-us-button"
                >
                About Us
              </Button>
              <p className="about-us-text">
               Elite Global Excellence is a dynamic and forward-thinking research and innovation organization that specializes in fortering collaboration, innovation and knowledge dissmeination across various academics and professional domains. We offer an array of services designed to empowe researchers, scholars, students and professionals to excel in their respective fields of interest. EGE aims is to create a world-wide global platform for the exchange of ideas, insights and advancements through the combination of research and innovation collaborations, conferences, projects, research grants, fundings, sponsorships, scholarships, completions, webinars, workshops, seminars and partnerships with esteemed higher educational institutes universities and industries.
            </p>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default AboutUs;
