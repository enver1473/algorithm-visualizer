import React, { useState } from 'react';
import { Row, Col, Button, Select, Slider, Cascader, Checkbox, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

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
  const [autoRebuild, setAutoRebuild] = useState(true);

  const playClickedHandler = () => {
    setPlay(!play);
    pausePlayClicked();
  };

  const speedMarks = {
    1: '1',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
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
    9: '256',
    10: '512',
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
          value: 'radixSortLSDb10',
          label: 'Radix Sort LSD (base 10)',
        },
        {
          value: 'radixSortLSDb8',
          label: 'Radix Sort LSD (base 8)',
        },
        {
          value: 'radixSortLSDb4',
          label: 'Radix Sort LSD (base 4)',
        },
        {
          value: 'radixSortLSDb2',
          label: 'Radix Sort LSD (base 2)',
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
        {
          value: 'maxHeapSort',
          label: 'Max Heap Sort',
        },
        {
          value: 'minHeapSort',
          label: 'Min Heap Sort',
        },
        {
          value: 'minMaxHeapSort',
          label: 'Min-Max Heap Sort',
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
        {
          value: 'weaveMergeSort',
          label: 'Weave Merge Sort',
        },
      ],
    },
    {
      value: 'distributionSorts',
      label: 'Distribution Sorts',
      children: [
        {
          value: 'quickSortLL',
          label: 'Quick Sort LL Pointers',
        },
        {
          value: 'quickSortLR',
          label: 'Quick Sort LR Pointers',
        },
        {
          value: 'quickSortDualPivot',
          label: 'Quick Sort Dual Pivot',
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
          label: 'Merge Sort (in-place)',
        },
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
        {
          value: 'roomSort',
          label: 'Room Sort',
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
    } /*
    {
      value: 'disparityCircle',
      text: 'Disparity Circle',
    },*/,
  ];
  
  const inputArrayTypes = [
    {
      value: 'default',
      text: 'Default (random)',
    },
    {
      value: 'reversed',
      text: 'Reversed input',
    },
    {
      value: 'almostSorted',
      text: 'Almost sorted',
    },
    {
      value: 'doubleSlope',
      text: 'Double-slope',
    },
    {
      value: 'alreadySorted',
      text: 'Already Sorted',
    },
  ];

  const inputArrayOptions = inputArrayTypes.map(({ value, text }) => (
    <Option value={value}>{text}</Option>
  ));

  const vMethodOptions = visualizationOptions.map(({ value, text }) => (
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
              {vMethodOptions}
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
              placeholder='Input array type'
              onSelect={handleInputSelect}
            >
              {inputArrayOptions}
            </Select>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align='middle'>
          <Col span={12}></Col>
          <Col span={12}>
            <Button
              type='primary'
              style={{ width: '100%' }}
              onClick={buildAnimations}
              disabled={autoRebuild}
            >
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
            <Checkbox
              style={{ width: '100%' }}
              onChange={(e) => handleCheckChange(e, setAutoRebuild)}
              defaultChecked={true}
            >
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
              max={10}
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
