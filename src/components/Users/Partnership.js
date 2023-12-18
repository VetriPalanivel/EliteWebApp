import React from 'react'
import { Grid, Row, Col, Button } from 'rsuite';
import { Avatar } from '@mui/material';
import Sponcership from '../.././asserts/sponcers.png'

function Partnership() {
  return (
    <div className="partnership-container">
      <Grid
        fluid
        className="partnership-grid"
      >
        <Row gutter={16} className="partnership-row">
          <Col xs={24} md={24} lg={24} xl={24}>
            <div className="partnership-content">
            <p className="partnership-button" >
                Our Partners and Collaborators in the Journey of Innovation and Research
            </p>
            </div>
          </Col>
          </Row>
          <Row gutter={16} className="partnership-row">
          <Col xs={24} md={12}>
            <div className="partnership-avatar-container">
              <Avatar
                alt="about_us"
                variant="square"
                className="partnership-avatar"
                src={ Sponcership }
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="partnership-avatar-container">
              <Avatar
                alt="about_us"
                variant="square"
                className="partnership-avatar"
                src={ Sponcership }
              />
            </div>
          </Col> 
        </Row>
      </Grid>
    </div>
  )
}

export default Partnership
