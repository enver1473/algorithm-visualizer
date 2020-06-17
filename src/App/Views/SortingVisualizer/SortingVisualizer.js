import React from 'react';
import Layout from '../../Layout';
// import Sidebar from './Sidebar/Sidebar';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import Canvas from './Canvas/Canvas';

const StyledRow = styled(Row)`
  height: 100%;
`;

const SortingVisualizer = () => {
  return (
    <Layout>
      <StyledRow>
        {/* <Col span={4}>
          <Sidebar />
        </Col> */}
        <Col span={24}>
          <Canvas />
        </Col>
      </StyledRow>
    </Layout>
  );
};

export default SortingVisualizer;
