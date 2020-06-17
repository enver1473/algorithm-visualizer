import React from 'react';
import Navbar from './Navigation/Navbar/Navbar';
import { Layout as AntLayout } from 'antd';
import 'antd/dist/antd.css';
import './Layout.css';

const { Header, Content } = AntLayout;

const Layout = (props) => {
  const style = { minHeight: '100%' };
  return (
    <div className='Layout'>
      <AntLayout style={style}>
        <Header className='Header'>
          <Navbar />
        </Header>
        <Content style={{ height: '100%' }}>{props.children}</Content>
      </AntLayout>
    </div>
  );
};

export default Layout;
