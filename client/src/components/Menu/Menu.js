import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import axios from "../../axios";

const Menu = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then(res => res.data)
      .then(res => {
        setCategories(res.data);
      })
      .catch(console.log);
  }, []);

  const categoriesMenu =
    categories.length &&
    categories.map(category => {
      return (
        <NavItem key={category._id}>
          <NavLink href={`/category/${category._id}`}>
            {category.name}
          </NavLink>
        </NavItem>
      );
    });

  return (
    <Navbar color="light" light expand="md">
      <Nav className="m-auto" navbar>
        {categoriesMenu}
      </Nav>
    </Navbar>
  );
};

export default Menu;
