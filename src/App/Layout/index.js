import React from 'react';
import { Layout as AntLayout } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import Canvas from '../Views/SortingVisualizer/Canvas';
import { default as ChangeLog } from '../Views/SortingVisualizer/ChangeLog';

const { Content } = AntLayout;

const Layout = () => {
  return (
    <div className='Layout'>
      <Content style={{ height: '100%' }}>
        <Canvas />
        <ChangeLog />
      </Content>
    </div>
  );
};

export default Layout;
