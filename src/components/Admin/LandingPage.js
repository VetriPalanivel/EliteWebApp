import React,{useState,useEffect} from 'react'
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import { Icon } from '@rsuite/icons';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Profile from "../../asserts/Profile.jpg";
import EliteLogo from "../../asserts/Logo.png";
import { useNavigate } from "react-router-dom";
import { ADMIN_HOME } from "./../../constants/route";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useDispatch,useSelector} from 'react-redux'
import {updateAuthenticate, updateDasboardStatus, updateSelectedTitle, updateUser} from "./../../redux/userReducer";
import { AdminDashboard } from "./../../constants/Admin";
import '../.././styles/Admin/AdminHeader.css'
import Dashboard from './Dashboard'
import OnGoingProjects from './Dashboards/OnGoingProjects';
import ResearchAssistant from './Dashboards/ResearchAssistant';
import InovationProjects from './Dashboards/InovationProjects';
import Trainings from './Dashboards/Trainings';
import Workshops from './Dashboards/Workshops';
import Competetion from './Dashboards/Competetion';
import Exhibition from './Dashboards/Exhibition';
import Clubs from './Dashboards/Clubs';
import Courses from './Dashboards/Courses';
import Roles from './Dashboards/Roles';
import News from './Dashboards/News';
import Committe from './Dashboards/Committe';
import Ambassador from './Dashboards/Ambassador';
import TeamMember from './Dashboards/TeamMember';
import Sponsors from './Dashboards/Sponsors';
import { baseUrl } from '../../Services/service';
import ViewProfile from './Dashboards/ViewProfile';
const drawerWidth = 280;

function LandingPage(props) {
  const { window } = props;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const SelectedTitle = useSelector((state)=> state.Elite.selectedTitle)
  const DashboardStatus = useSelector ((state) => state.Elite.dashboardStatus)
  const User = useSelector ((state) => state.Elite.user)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activeItem,setActiveItem] = useState("Dashboard");
  const settings = ["Profile", "Logout"];

  useEffect(()=>{
    console.log(activeItem)
    setActiveItem(SelectedTitle.title)
  },[SelectedTitle])

  useEffect(()=>{
    dispatch(updateDasboardStatus(true))
  },[])

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    if(event.target.innerHTML === "Logout"){
      dispatch(updateUser(""))
      dispatch(updateAuthenticate(false))
      navigate("login")
    }else{
      const sampleSeletedTitle={
        title:"ViewProfile"
    }
    dispatch(updateDasboardStatus(false))
    dispatch(updateSelectedTitle(sampleSeletedTitle))
    }
    setAnchorElUser(null);
  };
  const handleHomePage = () => {
    dispatch(updateDasboardStatus(true))
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDashboard = (item) => () =>{
    setActiveItem(item.name)
    const sampleSeletedTitle={
        id:item.id,
        title:item.name
    }
    dispatch(updateSelectedTitle(sampleSeletedTitle))
    if(mobileOpen){
     setMobileOpen(!mobileOpen);
    }
    
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List className="SideNav-list">
        {AdminDashboard.map((item, index) => (
          <ListItem key={item.id} disablePadding >
            <ListItemButton onClick={handleDashboard(item)} className={`${activeItem === item.name ?"SideNav-button-active" : "SideNav-button"}`}>
              <ListItemIcon>
                 <Icon  as={item.icon} style={{color: activeItem === item.name ?"#00008B":""}} />
              </ListItemIcon>
              <Typography className={`${activeItem === item.name ?"SideNav-text-active" : "SideNav-text"}`} >{item.name} </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className='admin-header'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {!DashboardStatus && 
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            style={{background:"#00008B"}}
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          }
          
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Avatar
                alt="ElicteLogo"
                className="Elite-logo"
                variant="square"
                src={EliteLogo}
                onClick={handleHomePage}
              />
              <Box sx={{ flexGrow: 1, display: { sm: "flex",md: "flex",ld: "flex" } }}>
                
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Profile"
                    className="Admin-profile"
                    src={(User.image !=null) ? `${baseUrl}${User.image}`: Profile}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                className="AdminMenu-Item"
                id="menu-appbar"
                anchorEl={anchorElUser}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Toolbar>
          </Container>
        </Toolbar>
      </AppBar>

{
  !DashboardStatus &&  <Box
  component="nav"
  sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
  aria-label="mailbox folders"
>
  {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
  <Drawer
    container={container}
    variant="temporary"
    open={mobileOpen}
    onClose={handleDrawerToggle}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
    sx={{
      display: { xs: "block", sm: "none" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    }}
  >
    {drawer}
  </Drawer>
  <Drawer
    variant="permanent"
    sx={{
      display: { xs: "none", sm: "block" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    }}
    open
  >
    {drawer}
  </Drawer>
</Box>

}
<Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  }}
  style={{padding: activeItem === "ViewProfile" ? "0px":"24px"}}
>
     
        <Toolbar />
        {DashboardStatus && <Dashboard />}
        {(!DashboardStatus && activeItem === "On-Going Research Projects") && <OnGoingProjects />}
        {(!DashboardStatus && activeItem === "Research Assistant Job") && <ResearchAssistant />}
        {(!DashboardStatus && activeItem === "EGE Inovation Projects") && <InovationProjects />}
        {(!DashboardStatus && activeItem === "Training for Trainers") && <Trainings />}
        {(!DashboardStatus && activeItem === "Workshops") && <Workshops />}
        {(!DashboardStatus && activeItem === "Competetions") && <Competetion />}
        {(!DashboardStatus && activeItem === "Exhibition") && <Exhibition />}
        {(!DashboardStatus && activeItem === "EGE Clubs and Societies") && <Clubs/>}
        {(!DashboardStatus && activeItem === "EGE Courses") && <Courses/>}
        {(!DashboardStatus && activeItem === "EGE Available Roles") && <Roles/>}
        {(!DashboardStatus && activeItem === "Add News") && <News/>}
        {(!DashboardStatus && activeItem === "Scientific Committe") && <Committe/>}
        {(!DashboardStatus && activeItem === "EGE Ambassador") && <Ambassador/>}
        {(!DashboardStatus && activeItem === "EGE Team Member") && <TeamMember/>}
        {(!DashboardStatus && activeItem === "EGE Sponsors/Collaborators") && <Sponsors/>}
        {(!DashboardStatus && activeItem === "ViewProfile") && <ViewProfile/>}
      
      </Box>
    </Box>
  );
}

LandingPage.propTypes = {
  window: PropTypes.func,
};

export default LandingPage;
