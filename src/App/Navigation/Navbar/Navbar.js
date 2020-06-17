import React from 'react';
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';
import 'antd/dist/antd.css';

const Navbar = (props) => {
	return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="sorting">
        <NavLink to="/sorting">
          Sorting
        </NavLink>
      </Menu.Item>
      <Menu.Item key="pathfinding">
        <NavLink to="/pathfinding">
          Pathfinding
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;