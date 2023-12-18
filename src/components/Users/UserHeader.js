import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import EliteLogo from "../../asserts/EliteLogo.png";
import EliteTitle from "../../asserts/EliteLogo.png";

const pages = [
  { name: "Conferences", dropdownItems: ["EGEMC", "EGEC"] },
  {
    name: "Research & Innovation",
    dropdownItems: ["Research Projects", "Innovations"],
  },
  {
    name: "Trainings",
    dropdownItems: [
      "Training of Trainer",
      "Workshops",
      "Competetion",
      "Exhibition",
      "EGE Clubs & Society",
    ],
  },
  {
    name: "Programs",
    dropdownItems: [
      "EGE Task Force Research Publication",
      "EGE Task Force Research Visibility",
    ],
  },
  {
    name: "Our Team",
    dropdownItems: ["Organization", "Scientific Committe", "Ambassador"],
  },
  { name: "Career", dropdownItems: ["Career Opportunities"] },
  { name: "Sponcership", dropdownItems: [] },
  { name: "Latest News", dropdownItems: [] },
  { name: "About", dropdownItems: [] },
  { name: "Contact", dropdownItems: [] },
];
// ... (existing imports)

function UserHeader() {
    const [anchorElMap, setAnchorElMap] = React.useState({});
    const [hoveredPage, setHoveredPage] = React.useState(null);
    const [selectedPage, setSelectedPage] = React.useState(null);
  
    const handleCloseNavMenu = (pageName) => {
      setAnchorElMap((prev) => ({ ...prev, [pageName]: null }));
    };
  
    const handleOpenMenu = (event, pageName) => {
      setAnchorElMap((prev) => ({ ...prev, [pageName]: event.currentTarget }));
      setSelectedPage(pageName);
    };
  
    const handleHoverPage = (pageName) => {
      setHoveredPage(pageName);
    };
  
    const handleCloseMenuItem = (pageName, dropdownItem) => {
      console.log(
        `Dropdown item "${dropdownItem}" clicked on page "${pageName}"`
      );
      setAnchorElMap((prev) => ({ ...prev, [pageName]: null }));
      setSelectedPage(pageName);
      setHoveredPage(null);
    };
  
    return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{
          background: "rgb(238,238,238)",
          height: "85px",
          padding: "6px 10px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              alt="EliteLogo"
              src={EliteLogo}
              style={{ height: "70px", width: "70px" }}
            />
            <Avatar
              alt="ElicteTitle"
              variant="square"
              src={EliteTitle}
              style={{
                paddingLeft: "10px",
                height: "40px",
                width: "220px",
                marginRight: "20px",
              }}
            />
            {pages.map((page) => (
              <Box
                key={page.name}
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  position: "relative",
                }}
              >
                <Button
                  variant="text"
                  color={selectedPage === page.name ? "secondary" : "inherit"}
                  aria-haspopup="true"
                  onMouseOver={() => handleHoverPage(page.name)}
                  onMouseOut={() => setHoveredPage(null)}
                  onClick={(e) => handleOpenMenu(e, page.name)}
                  style={{
                    color:
                      selectedPage === page.name || hoveredPage === page.name
                        ? "orange"
                        : "black",
                    background: "rgb(238,238,238)",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {page.name}
                </Button>
                {page.dropdownItems.length > 0 && (
                  <Menu
                    id={`menu-${page.name}`}
                    anchorEl={anchorElMap[page.name]}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElMap[page.name])}
                    onClose={() => handleCloseMenuItem(page.name)}
                  >
                    {page.dropdownItems.map((item, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => handleCloseMenuItem(page.name, item)}
                        style={{
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  
  export default UserHeader;
  