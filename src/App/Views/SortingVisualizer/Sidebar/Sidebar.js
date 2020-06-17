import React from 'react';
import { Menu, Slider } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

const { SubMenu } = Menu;

class Sider extends React.Component {

  render() {

    const Div = styled.div`
      height: 100vh;
      position: fixed;
    `;

    const style2 = { height: "100%" };
    
    return (
      <Div>
        <Menu style={style2} defaultOpenKeys={[]} mode="inline">
          <SubMenu key="sub1" title="Algorithm">
            <Menu.Item key="1">Bubble Sort</Menu.Item>
            <Menu.Item key="2">Merge Sort</Menu.Item>
            <SubMenu key="sub3" title="Quick Sort">
              <Menu.Item key="4">LR Pointers</Menu.Item>
              <Menu.Item key="5">LL Pointers</Menu.Item>
              <Menu.Item key="6">RR Pointers</Menu.Item>
              <Menu.Item key="7">Dual Pivot</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub2" title="Number of elements">
            <Slider defaultValue={100} min={10} max={500} />
          </SubMenu>
        </Menu>
      </Div>
    );
  }
}

export default Sider;