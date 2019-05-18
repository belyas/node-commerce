import React from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink, Nav }  from 'reactstrap';

function App() {
  return (
    <div>
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

      <p style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center'
        }}>
          Node commerce front end
        </p>
    </div>
  );
}

export default App;
