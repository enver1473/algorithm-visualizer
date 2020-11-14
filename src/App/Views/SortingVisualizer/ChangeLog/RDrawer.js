import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import styled from 'styled-components';

import { useWindowWidthContext } from '../../../../Context/useWindowWidthContext';
import Versions from './Versions';

const FloatingButtonMobile = styled(Button)`
  position: fixed;
  bottom: 2vh;
  right: 2vw;
`;

const FloatingButtonDesktop = styled(Button)`
  position: fixed;
  top: 15vh;
  right: 2vw;
`;

const RDrawer = () => {
  const [visible, setVisible] = useState(false);
  const { width } = useWindowWidthContext();

  const drawerWidth = width > 768 ? 700 : '100%';

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {width > 768 ? (
        <FloatingButtonDesktop type='primary' onClick={showDrawer}>
          Change Log
        </FloatingButtonDesktop>
      ) : (
        <FloatingButtonMobile type='primary' onClick={showDrawer}>
          Change Log
        </FloatingButtonMobile>
      )}
      <Drawer
        title='Change Log'
        placement='right'
        onClose={onClose}
        visible={visible}
        width={drawerWidth}
      >
        <Versions />
      </Drawer>
    </>
  );
};

export default RDrawer;
