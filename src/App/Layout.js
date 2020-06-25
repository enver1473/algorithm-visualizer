import React from 'react';
import { Layout as AntLayout } from 'antd';
import 'antd/dist/antd.css';
import './Layout.css';
import Canvas from './Views/SortingVisualizer/Canvas/Canvas';

const { Content } = AntLayout;

const Layout = () => {
  return (
    <div className='Layout'>
      <Content style={{ height: '100%' }}>
        <Canvas />
      </Content>
    </div>
  );
};

export default Layout;
