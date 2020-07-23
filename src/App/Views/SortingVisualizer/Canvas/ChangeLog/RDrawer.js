import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import Versions from './Versions';
import styled from 'styled-components';

const FloatingButton = styled(Button)`
  position: fixed;
  top: 2vh;
  right: 2vw;
`;

const RDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <FloatingButton type='primary' onClick={showDrawer}>
        Change Log
      </FloatingButton>
      <Drawer title='Change Log' placement='right' onClose={onClose} visible={visible} width={'35vw'}>
        <Versions />
      </Drawer>
    </>
  );
};

export default RDrawer;
