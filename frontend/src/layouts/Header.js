import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import { ReactSession } from 'react-client-session';



const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const logoutSession = () => {
    ReactSession.set("user", "null");
  }
  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">

        <NavbarBrand href="/">
          <img
            alt="logo"
            src="https://firebasestorage.googleapis.com/v0/b/opticaab-34b8f.appspot.com/o/tesis%2FOPTICA%20AB%20rectangulo.png?alt=media&token=49f6490a-c16a-4533-9e63-596cf30e03ad"
            style={{
              height: 50,
              width: 130
            }}
          />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/" onClick={logoutSession}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
