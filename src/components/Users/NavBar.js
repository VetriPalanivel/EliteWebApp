import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'rsuite';
import "rsuite/dist/rsuite.css";


import { Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import Avatar from "@mui/material/Avatar";
import EliteLogo from "../../asserts/Logo.png";
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css'
export const NavBarUser = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
    document.body.classList.toggle("hidden-scrolling");
  };

  const collapseSubMenu = () => {
    const activeSubMenu = document.querySelector(".menu-item-has-children.active .sub-menu");
    if (activeSubMenu) {
      activeSubMenu.removeAttribute("style");
      document.querySelector(".menu-item-has-children.active").classList.remove("active");
    }
  };

  const handleMenuItemClick = (event) => {
    if (event.target.hasAttribute("data-toggle") && window.innerWidth <= 991) {
      event.preventDefault();
      const menuItemHasChildren = event.target.parentElement;
      if (menuItemHasChildren.classList.contains("active")) {
        collapseSubMenu();
      } else {
        if (document.querySelector(".menu-item-has-children.active")) {
          collapseSubMenu();
        }
        menuItemHasChildren.classList.add("active");
        const subMenu = menuItemHasChildren.querySelector(".sub-menu");
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";
      }
    }
  };

  const resizeFix = () => {
    if (isNavOpen) {
      toggleNav();
    }
    if (document.querySelector(".menu-item-has-children.active")) {
      collapseSubMenu();
    }
  };
  

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1200) {
        resizeFix();
      }
    });

    return () => {
      window.removeEventListener("resize", resizeFix);
    };
  }, [isNavOpen]);

  return (
    <header className={`header ${isNavOpen ? 'open' : ''}`} >
      <div className="header-main" >
        <div className="logo">
          <Avatar
            alt="ElicteLogo"
            className="Elite-logo-user"
            variant="square"
            src={EliteLogo}
          />
        </div>
        <div className="open-nav-menu" onClick={toggleNav}>
          <span></span>
        </div>
        <div className={`menu-overlay ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}></div>
        <nav className={`nav-menu ${isNavOpen ? 'open' : ''}`} onClick={handleMenuItemClick}>
            <div className="close-nav-menu" >
               <CloseIcon color="error" variant="primary" onClick={()=>{setNavOpen(!isNavOpen);}} />
            </div>
            <ul className="menu" >
               <li className="menu-item menu-item-has-children">
                  <a  data-toggle="sub-menu">Conferences <i className="plus"></i></a>
                  <ul className="sub-menu">
                      <li className="menu-item"><a >EGEMC</a></li>
                      <li className="menu-item"><a >EGEC</a></li>
                  </ul>
               </li> 
               <li className="menu-item menu-item-has-children">
                  <a  data-toggle="sub-menu">Research & Innovation <i className="plus"></i></a>
                  <ul className="sub-menu">
                      <li className="menu-item"><a >Research Projects</a></li>
                      <li className="menu-item"><a >Innovations</a></li>
                  </ul>
               </li>
               <li className="menu-item menu-item-has-children">
                  <a  data-toggle="sub-menu">Trainings<i className="plus"></i></a>
                  <ul className="sub-menu">
                      <li className="menu-item"><a >Training of Trainer</a></li>
                      <li className="menu-item"><a >Workshops</a></li>
                      <li className="menu-item"><a >Competetion</a></li>
                      <li className="menu-item"><a >Exhibition</a></li>
                      <li className="menu-item"><a >EGE Clubs & Society</a></li>
                  </ul>
               </li>
               <li className="menu-item menu-item-has-children">
                  <a  data-toggle="sub-menu">Programs<i className="plus"></i></a>
                  <ul className="sub-menu">
                      <li className="menu-item"><a >Organization</a></li>
                      <li className="menu-item"><a >Scientific Committe</a></li>
                      <li className="menu-item"><a >Ambassador</a></li>
                  </ul>
               </li>
               <li className="menu-item menu-item-has-children">
                  <a  data-toggle="sub-menu">Career<i className="plus"></i></a>
                  <ul className="sub-menu">
                      <li className="menu-item"><a >Career Opportunities</a></li>
                  </ul>
               </li>
               <li className="menu-item">
                  <a >Sponcership</a>
               </li>
               <li className="menu-item">
                  <a >Latest News</a>
               </li>
               <li className="menu-item">
                  <a >About</a>
               </li>
               <li className="menu-item">
                  <a >Contact</a>
               </li>
              
            </ul>
          </nav>
      </div>
    </header>
  );
};

export default NavBarUser;

// export const NavBarUser = () =>{
//   return (
//     <header className="header">
//        <div className="header-main">
//           <div className="logo">
//              <Avatar
//                 alt="ElicteLogo"
//                 className="Elite-logo-user"
//                 variant="square"
//                 src={EliteLogo}
//                 // onClick={handleHomePage}
//               />
//           </div>
//           <div className="open-nav-menu">
//              <span></span>
//           </div>
//           <div className="menu-overlay">
//           </div>
//           <nav className="nav-menu">
//             <div className="close-nav-menu">
//                {/* <img src="img/close.svg" alt="close" /> */}
//             </div>
//             <ul className="menu">
//                <li className="menu-item menu-item-has-children">
//                   <a  data-toggle="sub-menu">Conferences <i className="plus"></i></a>
//                   <ul className="sub-menu">
//                       <li className="menu-item"><a >EGEMC</a></li>
//                       <li className="menu-item"><a >EGEC</a></li>
//                   </ul>
//                </li> 
//                <li className="menu-item menu-item-has-children">
//                   <a  data-toggle="sub-menu">Research & Innovation <i className="plus"></i></a>
//                   <ul className="sub-menu">
//                       <li className="menu-item"><a >Research Projects</a></li>
//                       <li className="menu-item"><a >Innovations</a></li>
//                   </ul>
//                </li>
//                <li className="menu-item menu-item-has-children">
//                   <a  data-toggle="sub-menu">Trainings<i className="plus"></i></a>
//                   <ul className="sub-menu">
//                       <li className="menu-item"><a >Training of Trainer</a></li>
//                       <li className="menu-item"><a >Workshops</a></li>
//                       <li className="menu-item"><a >Competetion</a></li>
//                       <li className="menu-item"><a >Exhibition</a></li>
//                       <li className="menu-item"><a >EGE Clubs & Society</a></li>
//                   </ul>
//                </li>
//                <li className="menu-item menu-item-has-children">
//                   <a  data-toggle="sub-menu">Programs<i className="plus"></i></a>
//                   <ul className="sub-menu">
//                       <li className="menu-item"><a >Organization</a></li>
//                       <li className="menu-item"><a >Scientific Committe</a></li>
//                       <li className="menu-item"><a >Ambassador</a></li>
//                   </ul>
//                </li>
//                <li className="menu-item menu-item-has-children">
//                   <a  data-toggle="sub-menu">Career<i className="plus"></i></a>
//                   <ul className="sub-menu">
//                       <li className="menu-item"><a >Career Opportunities</a></li>
//                   </ul>
//                </li>
//                <li className="menu-item">
//                   <a >Sponcership</a>
//                </li>
//                <li className="menu-item">
//                   <a >Latest News</a>
//                </li>
//                <li className="menu-item">
//                   <a >About</a>
//                </li>
//                <li className="menu-item">
//                   <a >Contact</a>
//                </li>
              
//             </ul>
//           </nav>
//        </div>
//  </header>
//   );
// }

// const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
//   return (
//     <Navbar {...props}>
//       <Navbar.Brand ><Avatar
//                 alt="ElicteLogo"
//                 className="Elite-logo-user"
//                 variant="square"
//                 src={EliteLogo}
//                 // onClick={handleHomePage}
//               /></Navbar.Brand>
//       <Nav pullRight onSelect={onSelect} activeKey={activeKey}>
//       <Nav.Menu title="Conferences" trigger={['click', 'hover']}>
//           <Nav.Item eventKey="1">EGEMC</Nav.Item>
//           <Nav.Item eventKey="2">EGEC</Nav.Item>
//         </Nav.Menu>
//         <Nav.Menu title="Research & Innovation" trigger={['click', 'hover']}>
//           <Nav.Item eventKey="2">Research Projects</Nav.Item>
//           <Nav.Item eventKey="3">Innovations</Nav.Item>
//         </Nav.Menu>
//         <Nav.Menu title="Trainings" trigger={['click', 'hover']}>
//           <Nav.Item eventKey="4">Training of Trainer</Nav.Item>
//           <Nav.Item eventKey="5">Workshops</Nav.Item>
//           <Nav.Item eventKey="6">Competetion</Nav.Item>
//           <Nav.Item eventKey="7">Exhibition</Nav.Item>
//           <Nav.Item eventKey="8">EGE Clubs & Society</Nav.Item>
//         </Nav.Menu>
//         <Nav.Menu title="Programs" trigger={['click', 'hover']}>
//           <Nav.Item eventKey="9">EGE Task Force Research Publication</Nav.Item>
//           <Nav.Item eventKey="10">EGE Task Force Research Visibility</Nav.Item>
//         </Nav.Menu>
//         <Nav.Menu title="Our Team" trigger={['click', 'hover']}>
//           <Nav.Item eventKey="11">Organization</Nav.Item>
//           <Nav.Item eventKey="12">Scientific Committe</Nav.Item>
//           <Nav.Item eventKey="13">Ambassador</Nav.Item>
//         </Nav.Menu>
//         <Nav.Menu title="Career" trigger={['click', 'hover']}>
//           <Nav.Item eventKey="14">Career Opportunities</Nav.Item>
//         </Nav.Menu>
//         <Nav.Item eventKey="15">Sponcership</Nav.Item>
//         <Nav.Item eventKey="16">Latest News</Nav.Item>
//         <Nav.Item eventKey="17">About</Nav.Item>
//         <Nav.Item eventKey="18">Contact</Nav.Item>
//       </Nav>
//     </Navbar>
//   );
// };

// export const NavBarUser = () => {
//   const [activeKey, setActiveKey] = React.useState(null);

//   return (
//     <>
//       <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} pages/>
//     </>
//   );
// };
