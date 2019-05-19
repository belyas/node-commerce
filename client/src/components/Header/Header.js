import React from "react";
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from "reactstrap";

const Header = props=> {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Node commerce</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/singup">Signup</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
