import React, { useState } from 'react';
import { Row, Col, Button, Select, Slider, Cascader, Checkbox, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSortContext } from '../../../context/sortingContext';

import './Controls.css';

const { Option } = Select;

const { Text } = Typography;

const Controls = ({
  pausePlayClicked,
  handleVMethodChange,
  handleAlgorithmChange,
  handleFpsChange,
  handleIncrementChange,
  handleCountChange,
  forwardOrReverse,
  handleInputSelect,
  buildAnimations,
  handleCheckChange,
  reShuffle,
}) => {
  const [play, setPlay] = useState(true);
  const { looping, setLooping } = useSortContext();

  const playClickedHandler = () => {
    setPlay(!play);
    setLooping(!looping);
    pausePlayClicked();
  };

  const speedMarks = {
    1: '1',
    60: '60',
  };

  const incrementMarks = {
    1: '1',
    2: '2',
    3: '4',
    4: '8',
    5: '16',
    6: '32',
    7: '64',
    8: '128',
  };

  const countMarks = {
    1: '10',
    2: '20',
    3: '50',
    4: '100',
    5: '200',
    6: '500',
    7: '1000',
  };

  const options = [
    {
      value: 'countingSorts',
      label: 'Counting Sorts',
      children: [
        {
          value: 'radixSortLSD',
          label: 'Radix Sort LSD',
        },
      ],
    },
    {
      value: 'exchangeSorts',
      label: 'Exchange Sorts',
      children: [
        {
          value: 'bubbleSort',
          label: 'Bubble Sort',
        },
        {
          value: 'coctailShakerSort',
          label: 'Coctail Shaker Sort',
        },
        {
          value: 'gnomeSort',
          label: 'Gnome Sort',
        },
        {
          value: 'combSort',
          label: 'Comb Sort',
        },
      ],
    },
    {
      value: 'selectionSorts',
      label: 'Selection Sorts',
      children: [
        {
          value: 'selectionSort',
          label: 'Selection Sort',
        },
        {
          value: 'doubleSelectionSort',
          label: 'Double Selection Sort',
        },
      ],
    },
    {
      value: 'hybridSorts',
      label: 'Hybrid Sorts',
      children: [
        {
          value: 'combGnomeSort',
          label: 'Comb Gnome Sort',
        },
        {
          value: 'quickGnomeSort',
          label: 'Quick Gnome Sort',
        },
      ],
    },
    {
      value: 'distributionSorts',
      label: 'Distribution Sorts',
      children: [
        {
          value: 'quickSort',
          label: 'Quick Sort',
          children: [
            {
              value: 'quickSortLL',
              label: 'LL Pointers',
            },
            {
              value: 'quickSortLR',
              label: 'LR Pointers',
            },
            {
              value: 'quickSortDualPivot',
              label: 'Dual Pivot',
            },
          ],
        },
      ],
    },
    {
      value: 'mergeSorts',
      label: 'Merge Sorts',
      children: [
        {
          value: 'mergeSort',
          label: 'Merge Sort',
        },
        {
          value: 'bottomUpMergeSort',
          label: 'Bottom-up Merge Sort',
        },
        {
          value: 'mergeSortInPlace',
          label: 'Merge Sort (in-place)'
        },
        {
          value: 'weaveMergeSort',
          label: 'Weave Merge Sort',
        }
      ],
    },
    {
      value: 'insertionSorts',
      label: 'Insertion Sorts',
      children: [
        {
          value: 'insertionSort',
          label: 'Insertion Sort',
        },
        {
          value: 'shellSort',
          label: 'Shell Sort',
        },
      ],
    },
  ];

  const visualizationOptions = [
    {
      value: 'barPlot',
      text: 'Standard Bar Plot',
    },
    {
      value: 'hrPyramid',
      text: 'Horizontal Pyramid',
    },
    {
      value: 'scatterPlot',
      text: 'Scatter Plot',
    },
    {
      value: 'rainbow',
      text: 'Rainbow',
    },
    {
      value: 'rainbowBarPlot',
      text: 'Rainbow Bar Plot',
    },
    {
      value: 'rainbowCircle',
      text: 'Rainbow Circle',
    },
  ];

  const selectOptions = visualizationOptions.map(({ value, text }) => (
    <Option value={value}>{text}</Option>
  ));

  return (
    <>
      <Col span={3}></Col>

      <Col span={6} style={{ marginRight: '20px' }}>
        <Row align='middle' gutter={[8, 8]} justify='space-around'>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong>Visualization method: </Text>
          </Col>
          <Col span={12}>
            <Select
              allowClear={false}
              style={{ width: '100%', textAlign: 'left' }}
              defaultValue='barPlot'
              onChange={handleVMethodChange}
              maxTagCount={10}
            >
              {selectOptions}
            </Select>
          </Col>
        </Row>
        <Row align='middle' gutter={[8, 8]}>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong>Algorithm: </Text>
          </Col>
          <Col span={12}>
            <Cascader
              allowClear={false}
              style={{ width: '100%', textAlign: 'left' }}
              expandTrigger='hover'
              options={options}
              onChange={handleAlgorithmChange}
              placeholder='Select an algorithm'
            />
          </Col>
        </Row>
        <Row align='middle' gutter={[8, 8]}>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong>Input array type: </Text>
          </Col>
          <Col span={12}>
            <Select
              allowClear={false}
              style={{ width: '100%', textAlign: 'left' }}
              placeholder='Randomization method'
              onSelect={handleInputSelect}
            >
              <Option value='default'>Default (random)</Option>
              <Option value='reversed'>Reversed input</Option>
              <Option value='almostSorted'>Almost sorted</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align='middle'>
          <Col span={12}></Col>
          <Col span={12}>
            <Button type='primary' style={{ width: '100%' }} onClick={buildAnimations}>
              {'Build animations'}
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={3}>
        <Row gutter={[8, 8]} justify='start'>
          <Col span={24}>
            <Button
              style={{ width: '100%', marginRight: '5px' }}
              type='primary'
              onClick={playClickedHandler}
            >
              {'Play/Pause'}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Button style={{ width: '100%' }} onClick={forwardOrReverse}>
              {'Forward/Reverse'}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align='middle'>
          <Col span={24}>
            <Button style={{ width: '100%' }} onClick={reShuffle}>
              {'Reshuffle'}
            </Button>
          </Col>
        </Row>
        <Row align='middle' gutter={[8, 8]}>
          <Col span={24}>
            <Checkbox style={{ width: '100%' }} onChange={handleCheckChange} defaultChecked={true}>
              Auto-(re)build
            </Checkbox>
          </Col>
        </Row>
      </Col>

      <Col span={6} style={{ marginRight: '40px' }}>
        <Row align='middle' gutter={[12, 8]}>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Text strong>Number of elements: </Text>
          </Col>
          <Col span={16}>
            <Slider
              tooltipVisible={false}
              min={1}
              max={7}
              marks={countMarks}
              step={null}
              defaultValue={6}
              onChange={handleCountChange}
            />
          </Col>
        </Row>
        <Row align='middle' gutter={[12, 8]} justify='start'>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Text strong>Frames per second: </Text>
          </Col>
          <Col span={16}>
            <Slider
              tooltipVisible={false}
              marks={speedMarks}
              min={1}
              max={60}
              defaultValue={60}
              onChange={handleFpsChange}
            />
          </Col>
        </Row>
        <Row align='middle' gutter={[12, 8]}>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Text strong>
              <Tooltip placement='top' title={'Swaps skipped per frame'}>
                <QuestionCircleOutlined />
              </Tooltip>
              {' Step: '}
            </Text>
          </Col>
          <Col span={16}>
            <Slider
              tooltipVisible={false}
              marks={incrementMarks}
              min={1}
              max={8}
              step={1}
              defaultValue={1}
              onChange={handleIncrementChange}
            />
          </Col>
        </Row>
      </Col>

      <Col span={6}></Col>
    </>
  );
};

export default Controls;
