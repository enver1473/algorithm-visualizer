import React from "react";
import { Layout as AntLayout } from "antd";
import styled from "styled-components";
import Canvas from "../Views/SortingVisualizer/Canvas";
import ChangeLog from "../Views/SortingVisualizer/ChangeLog";

import "antd/dist/antd.css";
import "./style.css";

const { Content } = AntLayout;
const StyledContent = styled(Content)`
  height: 100%;
  background-color: hsl(0, 0%, 88%);
  position: relative;
`;

const Layout = () => {
  return (
    <div className="Layout">
      <StyledContent>
        <Canvas />
        <ChangeLog />
      </StyledContent>
    </div>
  );
};

export default Layout;
