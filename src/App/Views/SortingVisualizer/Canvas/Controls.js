import React, { useState } from 'react';
import { Row, Col, Button, Slider, Cascader, Checkbox, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useWindowWidthContext } from '../../../../Context/useWindowWidthContext';

import './Controls.css';

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
  divisors,
  dir,
  setAmplitude,
}) => {
  const [play, setPlay] = useState(true);
  const [autoRebuild, setAutoRebuild] = useState(true);
  const { width } = useWindowWidthContext();
  const [expand, setExpand] = useState(false);
  const [direction, setDir] = useState(dir);
  const [algorithm, setAlgorithm] = useState([]);
  const [vMethod, setVMethod] = useState(['barPlot']);
  const [input, setInput] = useState(['default']);

  const handleDirChange = () => {
    forwardOrReverse(setDir);
  };

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
  };

  const countMarks = { ...divisors };
  const objKeys = Object.keys(countMarks);
  const min = parseInt(objKeys[0]);
  const max = parseInt(objKeys[objKeys.length - 1]);

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
        }/*
        {
          value: 'radixSortMSD',              // not working properly
          label: 'Radix Sort MSD (base 4)',
        } 
        {
          value: 'proxmapSort',
          label: 'Proxmap Sort',
        },*/,
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
        } /*
        {
          value: 'unbalancedTreeSort',
          label: 'UnbalancedTreeSort',
        }*/,
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
        {
          value: 'rotateRoomSort',
          label: 'Rotate Room Sort',
        },
        {
          value: 'optimizedRotateRoomSort',
          label: 'Optimized Rotate Room Sort',
        },
        {
          value: 'grailSort',
          label: 'Grail Sort',
        },/*
        {
          value: 'rewrittenGrailSort',
          label: 'Rewritten Grail Sort',
        },*/
        {
          value: 'rotateRoomShakerSort',
          label: 'Rotate Room Shaker Sort',
        },
        {
          value: 'advancedRoomSort',
          label: 'Advanced Room Sort',
        },
        {
          value: 'advancedRoomShaker',
          label: 'Advanced Room Shaker Sort',
        },
        {
          value: 'bufferedRoomSort',
          label: 'Buffered Room Sort',
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
        {
          value: 'recursiveRotateMerge',
          label: 'Recursive Rotate Merge Sort',
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
          value: 'binaryInsertionSort',
          label: 'Binary Insertion Sort',
        },
        {
          value: 'shellSort',
          label: 'Shell Sort',
        },
        {
          value: 'roomSort',
          label: 'Room Sort',
        },
        {
          value: 'optimizedRoomSort',
          label: 'Optimized Room Sort',
        },
      ],
    },
    {
      value: 'concurrentSorts',
      label: 'Concurrent Sorts',
      children: [
        {
          value: 'iterativePairwiseNetwork',
          label: 'Iterative Pairwise Network',
        },
        {
          value: 'recursivePairwiseNetwork',
          label: 'Recursive Pairwise Network',
        },
      ],
    },
    {
      value: 'impracticalSorts',
      label: 'Impractical Sorts',
      children: [
        {
          value: 'stoogeSort',
          label: 'Stooge Sort',
        },
      ],
    },
  ];

  const visualizationOptions = [
    {
      value: 'barPlot',
      label: 'Standard Bar Plot',
    },
    {
      value: 'hrPyramid',
      label: 'Horizontal Pyramid',
    },
    {
      value: 'scatterPlot',
      label: 'Scatter Plot',
    },
    {
      value: 'rainbow',
      label: 'Rainbow',
    },
    {
      value: 'rainbowBarPlot',
      label: 'Rainbow Bar Plot',
    },
    {
      value: 'rainbowCircle',
      label: 'Rainbow Circle',
    } /*
    {
      value: 'disparityCircle',
      label: 'Disparity Circle',
    },*/,
  ];

  const inputArrayTypes = [
    {
      value: 'default',
      label: 'Random (uniform distribution)',
    },
    {
      value: 'randomGaussian',
      label: 'Random (gaussian distribution)',
    },
    {
      value: 'alreadySorted',
      label: 'Already Sorted',
    },
    {
      value: 'almostSorted',
      label: 'Almost sorted',
    },
    {
      value: 'reversed',
      label: 'Reversed input',
    },
    {
      value: 'threeUnique',
      label: '3 unique values',
    },
    {
      value: 'doubleSlope',
      label: 'Double-slope',
    },
    {
      value: 'sinDistribution',
      label: 'Sin Distribution',
    },
    {
      value: 'sawTooth',
      label: 'Saw Tooth',
    },
  ];

  const visualCascaderRenderer = (labels, _) => {
    if (width > 768) {
      return labels[labels.length - 1];
    } else {
      return labels.length ? 'Visuals: ' + labels[labels.length - 1] : '';
    }
  };

  const algoCascaderRenderer = (labels, _) => {
    if (width > 768) {
      return labels[labels.length - 1];
    } else {
      return labels.length ? 'Algorithm: ' + labels[labels.length - 1] : '';
    }
  };

  const inputCascaderRenderer = (labels, _) => {
    if (width > 768) {
      return labels[labels.length - 1];
    } else {
      return labels.length ? 'Input: ' + labels[labels.length - 1] : '';
    }
  };
  /*
  const inputArrayOptions = inputArrayTypes.map(({ value, label }, idx) => (
    <Option key={idx} value={value}>
      {label}
    </Option>
  ));

  const vMethodOptions = visualizationOptions.map(({ value, label }, idx) => (
    <Option key={idx} value={value}>
      {label}
    </Option>
  ));
*/
  const handleExpand = () => {
    setExpand(!expand);
  };

  const componentSize = width > 768 ? 'default' : 'small';

  const leftColOffset = width > 768 ? 12 : 0;
  const leftColSpan = width > 768 ? 12 : 24;

  const midColOffset = width > 768 ? 0 : 6;
  const midColSpan = width > 768 ? 24 : 18;

  const rightColOffset = width > 768 ? 8 : 4;
  const rightColSpan = width > 768 ? 16 : 20;

  const firstCol = (
    <>
      <Row align='middle' gutter={[8, 8]} justify='space-around'>
        <Col span={leftColOffset} style={{ textAlign: 'right' }}>
          <Text strong>Visualization method: </Text>
        </Col>
        <Col span={leftColSpan}>
          <Cascader
            displayRender={visualCascaderRenderer}
            allowClear={false}
            style={{ width: '100%', textAlign: 'left' }}
            defaultValue={vMethod}
            onChange={(values) => {
              handleVMethodChange(values);
              setVMethod(values);
            }}
            options={visualizationOptions}
            placeholder='Select visual method'
          />
        </Col>
      </Row>
      <Row align='middle' gutter={[8, 8]}>
        <Col span={leftColOffset} style={{ textAlign: 'right' }}>
          <Text strong>Algorithm: </Text>
        </Col>
        <Col span={leftColSpan}>
          <Cascader
            displayRender={algoCascaderRenderer}
            allowClear={false}
            style={{ width: '100%', textAlign: 'left' }}
            expandTrigger='hover'
            options={options}
            defaultValue={algorithm}
            onChange={(values) => {
              handleAlgorithmChange(values);
              setAlgorithm(values);
            }}
            placeholder='Select an algorithm'
          />
        </Col>
      </Row>
      <Row align='middle' gutter={[8, 8]}>
        <Col span={leftColOffset} style={{ textAlign: 'right' }}>
          <Text strong>Input array type: </Text>
        </Col>
        <Col span={leftColSpan}>
          <Cascader
            displayRender={inputCascaderRenderer}
            defaultValue={input}
            allowClear={false}
            style={{ width: '100%', textAlign: 'left' }}
            onChange={(values) => {
              handleInputSelect(values);
              setInput(values);
            }}
            options={inputArrayTypes}
            placeholder='Select input type'
          />
        </Col>
      </Row>
      {width > 768 ? (
        <Row gutter={[8, 8]} align='middle'>
          <Col span={leftColOffset}></Col>
          <Col span={leftColSpan}>
            <Button
              size={componentSize}
              type='primary'
              style={{ width: '100%' }}
              onClick={buildAnimations}
              disabled={autoRebuild}
            >
              Build animations
            </Button>
          </Col>
        </Row>
      ) : null}
    </>
  );

  const secondCol =
    width > 768 ? (
      <>
        <Row gutter={[8, 8]} justify='start'>
          <Col offset={midColOffset} span={midColSpan}>
            <Button
              size={componentSize}
              style={{ width: '100%', marginRight: '5px' }}
              type='primary'
              onClick={playClickedHandler}
            >
              {'Play/Pause'}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col offset={midColOffset} span={midColSpan}>
            <Button size={componentSize} style={{ width: '100%' }} onClick={handleDirChange}>
              {direction === 1 ? 'Reverse' : 'Forward'}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align='middle'>
          <Col offset={midColOffset} span={midColSpan}>
            <Button size={componentSize} style={{ width: '100%' }} onClick={reShuffle}>
              {'Reshuffle'}
            </Button>
          </Col>
        </Row>
        <Row align='middle' gutter={[8, 8]}>
          <Col offset={midColOffset} span={midColSpan}>
            <Checkbox
              size={componentSize}
              style={{ width: '100%' }}
              onChange={(e) => handleCheckChange(e, setAutoRebuild)}
              defaultChecked={true}
            >
              Auto-(re)build
            </Checkbox>
          </Col>
        </Row>
      </>
    ) : (
      <>
        <Row gutter={[8, 8]} justify='start'>
          <Col span={8}>
            <Button style={{ width: '100%' }} onClick={reShuffle}>
              {'Reshuffle'}
            </Button>
          </Col>
          <Col span={8}>
            <Button style={{ width: '100%' }} onClick={handleDirChange}>
              {direction === 1 ? 'Reverse' : 'Forward'}
            </Button>
          </Col>
          <Col span={8}>
            <Button
              style={{ width: '100%', marginRight: '5px' }}
              type='primary'
              onClick={playClickedHandler}
            >
              {'Play/Pause'}
            </Button>
          </Col>
        </Row>
      </>
    );

  const thirdCol = (
    <>
      {width > 768 ? (
        <>
          <Row align='middle' gutter={[12, 8]}>
            <Col span={rightColOffset} style={{ textAlign: 'right' }}>
              <Text strong>Element count: </Text>
            </Col>
            <Col span={rightColSpan}>
              <Slider
                tipFormatter={(value) => (countMarks[value] !== '' ? countMarks[value] : null)}
                min={min}
                max={max}
                marks={countMarks}
                step={null}
                defaultValue={min + Math.floor((max - min) / 2)}
                onChange={handleCountChange}
              />
            </Col>
          </Row>
          <Row align='middle' gutter={[12, 8]} justify='start'>
            <Col span={rightColOffset} style={{ textAlign: 'right' }}>
              <Text strong>Volume: </Text>
            </Col>
            <Col span={rightColSpan}>
              <Slider
                tooltipVisible={false}
                marks={{
                  0: '0%',
                  50: '50%',
                  100: '100%',
                }}
                min={0}
                max={100}
                defaultValue={10}
                onChange={(value) => setAmplitude(value)}
              />
            </Col>
          </Row>
        </>
      ) : expand ? (
        <>
          <Row align='middle' gutter={[12, 8]}>
            <Col span={rightColOffset} style={{ textAlign: 'right' }}>
              <Text strong>Element count: </Text>
            </Col>
            <Col span={rightColSpan}>
              <Slider
                tipFormatter={(value) => (countMarks[value] !== '' ? countMarks[value] : null)}
                min={min}
                max={max}
                marks={countMarks}
                step={null}
                defaultValue={min + Math.floor((max - min) / 2)}
                onChange={handleCountChange}
              />
            </Col>
          </Row>
          <Row align='middle' gutter={[12, 8]} justify='start'>
            <Col span={rightColOffset} style={{ textAlign: 'right' }}>
              <Text strong>FPS: </Text>
            </Col>
            <Col span={rightColSpan}>
              <Slider
                marks={speedMarks}
                min={1}
                max={60}
                defaultValue={60}
                onChange={handleFpsChange}
              />
            </Col>
          </Row>
          <Row align='middle' gutter={[12, 8]} justify='start'>
            <Col span={rightColOffset} style={{ textAlign: 'right' }}>
              <Text strong>Volume: </Text>
            </Col>
            <Col span={rightColSpan}>
              <Slider
                marks={{
                  0: '0%',
                  50: '50%',
                  100: '100%',
                }}
                min={0}
                max={100}
                defaultValue={10}
                onChange={(value) => setAmplitude(value)}
              />
            </Col>
          </Row>
        </>
      ) : null}
      {width > 768 ? null : (
        <>
          <Row align='middle' gutter={[12, 8]}>
            <Col span={rightColOffset} style={{ textAlign: 'right' }}>
              <Text strong>
                <Tooltip placement='top' title={'Swaps skipped per frame'}>
                  <QuestionCircleOutlined />
                </Tooltip>
                {' Step: '}
              </Text>
            </Col>
            <Col span={rightColSpan}>
              <Slider
                tooltipVisible={false}
                marks={incrementMarks}
                min={1}
                max={9}
                step={1}
                defaultValue={1}
                onChange={handleIncrementChange}
              />
            </Col>
          </Row>
          <Row align='middle' gutter={[12, 8]}>
            <Col span={24}>
              <Button onClick={handleExpand} type='link'>
                {expand ? 'Fewer controls' : 'More controls'}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );

  const fourthCol = (
    <>
      <Row align='middle' gutter={[12, 8]} justify='start'>
        <Col span={rightColOffset} style={{ textAlign: 'right' }}>
          <Text strong>Frames per second: </Text>
        </Col>
        <Col span={rightColSpan}>
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
        <Col span={rightColOffset} style={{ textAlign: 'right' }}>
          <Text strong>
            <Tooltip placement='top' title={'Swaps skipped per frame'}>
              <QuestionCircleOutlined />
            </Tooltip>
            {' Step: '}
          </Text>
        </Col>
        <Col span={rightColSpan}>
          <Slider
            tooltipVisible={false}
            marks={incrementMarks}
            min={1}
            max={9}
            step={1}
            defaultValue={1}
            onChange={handleIncrementChange}
          />
        </Col>
      </Row>
    </>
  );

  return (
    <>
      {width > 768 ? (
        <>
          <Col span={1}></Col>

          <Col span={6} style={{ marginRight: '20px' }}>
            {firstCol}
          </Col>

          <Col span={2}>{secondCol}</Col>

          <Col span={6} style={{ marginRight: '40px' }}>
            {thirdCol}
          </Col>

          <Col span={6} style={{ marginRight: '40px' }}>
            {fourthCol}
          </Col>

          <Col span={3}></Col>
        </>
      ) : (
        <>
          <Col span={1}></Col>

          <Col span={22}>
            {firstCol}
            {secondCol}
            {thirdCol}
          </Col>

          <Col span={1}></Col>
        </>
      )}
    </>
  );
};

export default Controls;
