import React, { useState } from 'react';
import { Col, /* Slider,*/ Button /* Cascader, Select */ } from 'antd';
import { useSortContext } from '../../../context/sortingContext';

const Controls = ({ pausePlayClicked }) => {
  const [play, setPlay] = useState(true);
  const { looping, setLooping } = useSortContext();

  const playClickedHandler = () => {
    setPlay(!play);
    setLooping(!looping);
    pausePlayClicked();
  };

  return (
    <>
      <Col span={4}>
        <Button
          type='primary'
          onClick={playClickedHandler}
          style={{ marginRight: '5px' }}
        >
          {'Play/Pause'}
        </Button>
      </Col>
      <Col span={20}></Col>
    </>
  );
};

export default Controls;
