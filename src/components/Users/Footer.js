import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Grid, Row, Col } from 'rsuite';
import Avatar from '@mui/material/Avatar';
import Profile from '../../asserts/Profile.jpg'; // Replace with the actual path to your profile image
import { Typography } from '@mui/material';

function Footer() {
  return (
    <div className="footer-container" style={{ background: '#f5f5f5', padding: '40px', textAlign: 'left', margin: '20px 0' }}>
      <Grid fluid className="footer-grid">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <div className="footer-section">
              <p>---- OUR OFFICE</p>
              <h5>Get in Touch</h5>
              <p>
                Come and visit our office or simply send an email anytime you want. We are open to all suggestions from our clients.
              </p>
              <Typography variant="outlined" startIcon={<DeleteIcon />} style={{ marginBottom: '10px', display: 'block' }}>
                +60383157888
              </Typography>
              <Typography variant="contained" startIcon={<SendIcon />} style={{ marginBottom: '10px', display: 'block' }}>
                info@might.org.my
              </Typography>
              <Typography variant="contained" startIcon={<SendIcon />} style={{ display: 'block' }}>
                MIGHT Partnership Hub, Jafan IMPACT 63000, Cyberlays, Selangor, Malaysia
              </Typography>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="footer-section">
              <p>---- OUR TEAM</p>
              <h5>Meet Our Team</h5>
              <p>
                Come and meet our awesome team. We are here to help and answer any questions you might have.
              </p>
              <div style={{ display: 'flex' }}>
                <Avatar alt="Profile" src={Profile} style={{ height: '50px', width: '50px', marginRight: '10px' }} />
                <Avatar alt="Profile" src={Profile} style={{ height: '50px', width: '50px', marginRight: '10px' }} />
                <Avatar alt="Profile" src={Profile} style={{ height: '50px', width: '50px', marginRight: '10px' }} />
                <Avatar alt="Profile" src={Profile} style={{ height: '50px', width: '50px' }} />
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Footer;
