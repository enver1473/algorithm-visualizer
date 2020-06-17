import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Bar from './Bar';
import { Row, Col, Slider, Button, Cascader, Select, notification } from 'antd';
import {
  bubbleSort,
  coctailShakerSort,
  quickSortLL,
  quickSortLR,
  quickSortDualPivot,
  selectionSort,
  doubleSelectionSort,
  gnomeSort,
  insertionSort,
} from './Algorithms/algorithms';

const { Option } = Select;

// Array of random numbers
export let arr = [];

// Array of objects mapped from 'arr'
export let elements = [];

// Array of arrays of Bar objects = the mid-sorting states
export let states = [];

let barWidth = 3;
let width = 1000;
let height = 600;

// Array size
export let count = parseInt(width / barWidth);

// Number of swaps skipped per frame during visualization
let inc = 1;

// Whether or not the visualization is looping through the states; true => is looping, false => is not looping
let loop = false;

// Frames per second
let fps = 60;

// Global P5.js access object
let globalP;

// Current state index in the loop
let stateIdx = 0;

// The direction the visualization is playing (1 === 'forward'; -1 === 'backward')
let dir = 1;

// Visualization method
export let vMethod = 'barPlot';

const handleSpeedChange = (value) => {
  fps = value;
  globalP.frameRate(fps);
};

const handleIncrementChange = (value) => {
  inc = value;
};

const pauseOrPlay = () => {
  if (states.length === 0) {
    notification.warning({
      message: 'No animations!',
      description:
        'You have to build the animations before trying to play them.',
      duration: 4,
      placement: 'bottomLeft',
    });
    return;
  }
  if (loop) {
    globalP.noLoop();
    loop = false;
  } else {
    if (!(stateIdx >= 0 && stateIdx < states.length)) {
      if (dir < 0) {
        dir = 1;
        stateIdx = 0;
      } else {
        dir = -1;
        stateIdx = states.length - 1;
      }
    }
    globalP.loop();
    loop = true;
  }
};

// Switch playback direction
const forwardOrReverse = () => {
  dir *= -1;
};

const Canvas = () => {
  let algorithm = '';

  const speedMarks = {
    1: '1',
    60: '60',
  };

  const incrementMarks = {
    1: '1',
    2: '2',
    4: '4',
    8: '8',
    16: '16',
    32: '32',
  };

  const options = [
    {
      value: 'bubbleSort',
      label: 'Bubble Sort',
    },
    {
      value: 'coctailShakerSort',
      label: 'Coctail Shaker Sort',
    },
    {
      value: 'selectionSort',
      label: 'Selection Sort',
    },
    {
      value: 'doubleSelectionSort',
      label: 'Double Selection Sort',
    },
    {
      value: 'gnomeSort',
      label: 'Gnome Sort',
    },
    {
      value: 'insertionSort',
      label: 'Insertion Sort',
    },
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
  ];

  const handleCascaderChange = (value) => {
    algorithm = value[value.length - 1];
    console.log(value);
  };

  const sort = () => {
    // If array is empty; Nothing to sort!
    if (arr.length === 0) {
      notification.warning({
        message: 'No array to sort!',
        description: `You have to generate a random array first using the 'Randomize' button.`,
        duration: 4,
        placement: 'bottomLeft',
      });
      return;
    }

    // If algorithm not picked
    if (!algorithm) {
      notification.warning({
        message: 'Please choose an algorithm!',
        duration: 4,
        placement: 'bottomLeft',
      });
      return;
    } else if (algorithm === 'bubbleSort') {
      callSort(bubbleSort);
    } else if (algorithm === 'coctailShakerSort') {
      callSort(coctailShakerSort);
    } else if (algorithm === 'quickSortLL') {
      callSort(quickSortLL);
    } else if (algorithm === 'quickSortLR') {
      callSort(quickSortLR);
    } else if (algorithm === 'quickSortDualPivot') {
      callSort(quickSortDualPivot);
    } else if (algorithm === 'selectionSort') {
      callSort(selectionSort);
    } else if (algorithm === 'gnomeSort') {
      callSort(gnomeSort);
    } else if (algorithm === 'doubleSelectionSort') {
      callSort(doubleSelectionSort);
    } else if (algorithm === 'insertionSort') {
      callSort(insertionSort);
    }
  };

  const callSort = (sortingFunction) => {
    notification.warning({
      message: 'Building...',
      description: 'Please wait while the animations are being built.',
      duration: 4,
      placement: 'bottomLeft',
    });

    setTimeout(() => {
      sortingFunction();

      notification.success({
        message: 'Done!',
        description: 'You may now Play the visualization.',
        duration: 4,
        placement: 'bottomLeft',
      });
    }, 300);
  };

  const visualizationOptions = [
    {
      value: 'barPlot',
      text: 'Standard Bar Plot',
    },
    {
      value: 'hrPyramid',
      text: 'Horizontal Pyramid',
    },
  ];

  // Handle Visualization Method Change
  const handleVMethodChange = (value) => {
    vMethod = value;
  };

  const selectOptions = visualizationOptions.map(({ value, text }) => (
    <Option value={value}>{text}</Option>
  ));

  return (
    <>
      <Row>
        <Col span={4}>
          <Select
            defaultValue='barPlot'
            onChange={handleVMethodChange}
          >
            {selectOptions}
          </Select>
          <Cascader
            options={options}
            onChange={handleCascaderChange}
            placeholder='Select algorithm'
          />
          <Slider
            marks={speedMarks}
            min={1}
            max={60}
            defaultValue={60}
            onChange={handleSpeedChange}
          />
          <Slider
            marks={incrementMarks}
            min={1}
            max={32}
            step={null}
            defaultValue={1}
            onChange={handleIncrementChange}
          />
          <Button onClick={pauseOrPlay} style={{ marginRight: '5px' }}>
            {'Play/Pause'}
          </Button>
          <Button onClick={forwardOrReverse}>{'Forward/Reverse'}</Button>
          <Button onClick={randomize}>{'Randomize'}</Button>
        </Col>
        <Col span={2}>
          <Button type='primary' onClick={sort}>
            {'Build animations'}
          </Button>
        </Col>
        <Col span={18}>
          <P5Wrapper sketch={sketch} />
        </Col>
      </Row>
    </>
  );
};

export default Canvas;

const showLastState = (index) => {
  globalP.background(100);
  for (let bar of states[index]) {
    bar.show();
  }
};

export const sketch = (p) => {
  globalP = p;

  p.setup = () => {
    p.createCanvas(width, height);

    p.background(100);

    p.noLoop();
    p.frameRate(fps);
    p.fill(255);
    p.noStroke();
  };

  // DRAW
  p.draw = () => {
    if (loop) {
      p.background(100);
      for (let i = 0; i < count; i++) {
        const bar = states[stateIdx][i];
        bar.show();
      }

      stateIdx += dir * inc;

      if (stateIdx >= states.length) {
        showLastState(states.length - 1);

        p.noLoop();
        loop = false;
      } else if (stateIdx < 0) {
        showLastState(0);

        p.noLoop();
        loop = false;
      }
    }
  };
};

const randomize = () => {
  if (elements.length === 0) {
    globalP.background(100);
    randomizeHelper();
    showAllBars();
  } else {
    // Reset everything to the beginning state (as if the app was just started)
    globalP.noLoop();
    globalP.background(100);
    arr = [];
    elements = [];
    states = [];
    stateIdx = 0;
    loop = false;

    randomizeHelper();
    showAllBars();
  }
};

// Generate 'count' random numbers
const randomizeHelper = () => {
  let numbers = [];

  for (let i = 0; i < count; i++) {
    numbers.push(parseInt((i + 1) * (height / count)));
  }

  for (let i = 0; i < count; i++) {
    let rndIdx = Math.floor(Math.random() * (count - i));

    let rNumber = numbers[rndIdx];
    numbers.splice(rndIdx, 1);

    arr.push(rNumber);

    addElement(i, rNumber);
  }
};

const addElement = (idx, rNumber) => {
  let element;

  if (vMethod === 'barPlot') {
    element = new Bar(idx * barWidth, height - rNumber, barWidth, rNumber, '#ffffff');
  } else if (vMethod === 'hrPyramid') {
    element = new Bar(idx * barWidth, (height - rNumber) / 2, barWidth, rNumber, '#ffffff');
  } else return;

  elements.push(element);
};

const showAllBars = () => {
  if (elements.length === 0) {
    return;
  }

  for (let element of elements) {
    element.show();
  }
};

export { globalP };
