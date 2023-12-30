import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid, Row, Col, Button } from "rsuite";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "../../constants/Admin";
import { useDispatch } from "react-redux";
import {ADMIN_DASHBOARD} from '../../constants/route'
import {
  updateDasboardStatus,
  updateSelectedTitle,
} from "../../redux/userReducer";
import './../../styles/Admin/Dashboard.css'
import { getApi } from "../../Services/service";


const Dashboard = () => {
  const [dashboardList,setDashboardList] = useState(AdminDashboard)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    getDashBoardItem();
  },[])

  const getDashBoardItem = async () => {
    try {
      const response = await getApi('dashboard/get');
      if (response.status_code === 200) {
        const updatedDashboard = AdminDashboard.map((dashboardItem) => {
          if (Array.isArray(response.data.data)) {
            const matchingResponseItem = response.data.data.find(
              (responseItem) => responseItem.table_name === dashboardItem.table
            );
            if (matchingResponseItem) {
              return {
                ...dashboardItem,
                badgeCount: matchingResponseItem.row_count,
              };
            }
          } 
          return dashboardItem;
        });
  
        setDashboardList(updatedDashboard);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  
  console.log(dashboardList)
 
  

  const handleDashboard = (item) => () => {
    const DashboardStatus = {
      id: item.id,
      title: item.name,
    };
    dispatch(updateDasboardStatus(false));
    dispatch(updateSelectedTitle(DashboardStatus));
  };

  return (
    <Grid
      fluid
      className="Dashboard-container"
      style={{paddingTop:"30px"}}
    >
      <p className="Dashboard-container-title">Dashboard</p>
      <Row gutter={5} className="Dashboard-row">
        {dashboardList.map((item, index) => (
          <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="Dashboard-item" >
            <div key={index} onClick={handleDashboard(item)} className="Dashboard-List">
                <Card sx={{ width: 160 }} className="Dashboard-card">
                  <Avatar
                    alt={item.alt}
                    variant="square"
                  className="Dashboard-avator"
                    src={item.img}
                  />
                 <p style={{color:"white",fontWeight:"700",margin:"0px",background:"#F94C10",textAlign:"center"}}>{item.badgeCount}</p>
                </Card>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  paddingTop: "8px",
                  height: "40px",
                  textAlign:"center",
                }}
                gutterBottom
                color="#2A333E"
                className="dashboard-title"
              >
                {item.name}
              </Typography>
            </div>
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

export default Dashboard;
