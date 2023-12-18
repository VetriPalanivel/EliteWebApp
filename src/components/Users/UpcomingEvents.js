import React from "react";
import Box from "@mui/material/Box";
import { Grid, Row, Col, Button } from "rsuite";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import { AdminDashboard } from "../../constants/Admin";
import workshop from "../../asserts/workshops.png";

function UpcomingEvents() {
  const handleEvents = (item) => () => {};

  return (
    <div className="upcoming-events-container">
      <Grid fluid className="upcoming-events-grid">
        <Row gutter={16} className="upcoming-events-row">
          <Col xs={24} md={24} lg={24} xl={24}>
            <div className="upcoming-events-content">
              <Button variant="contained" className="upcoming-events-title">
                Upcoming Events
              </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={16} className="upcoming-events-row">
  {[1, 2, 3, 4].map((item) => (
    <Col xs={24} sm={24} md={12} lg={6} xl={6} key={item} className="upcoming-events-item">
      <Card sx={{ maxWidth: 280 }} className="upcoming-events-card">
        <div className="upcoming-events-avatar-container">
          <Avatar
            alt="event_image"
            variant="square"
            className="upcoming-events-avatar"
            src={workshop}
          />
        </div>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            paddingTop: "8px",
            height: "40px",
          }}
          gutterBottom
          color="#2A333E"
          className="upcoming-event-name "
        >
          Event Name Sample
        </Typography>
      </Card>
      <Button
        variant="contained"
        color="success"
        className="upcoming-events-button"
      >
        Register Now
      </Button>
    </Col>
  ))}
</Row>

      </Grid>
    </div>
  );
}

export default UpcomingEvents;
