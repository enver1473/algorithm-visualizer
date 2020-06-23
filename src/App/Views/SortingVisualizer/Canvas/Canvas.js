import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Bar from './ElementTypes/Bar';
import Dot from './ElementTypes/Dot';
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
  combSort,
  combGnomeSort,
  quickGnomeSort,
  swap,
} from './Algorithms/algorithms';
import Controls from './Controls';

const { Option } = Select;

/*

TODO DEPLOY TO NETFLIY.COM

*/

// Array of random numbers
export let arr = [];

// Array of objects mapped from 'arr'
export let elements = [];

// Array of arrays of Bar objects = the mid-sorting states
export let states = [];

let barWidth = 1;
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

// Previous state index in the loop
let oldStateIdx;

// The direction the visualization is playing (1 === 'forward'; -1 === 'backward')
let dir = 1;

// Background Color
let backgroundColor;

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
    64: '64',
    128: '128',
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
      value: 'combSort',
      label: 'Comb Sort',
    },
    {
      value: 'hybrid',
      label: 'Hybrid Sorts',
      children: [
        {
          value: 'combGnomeSort',
          label: 'Comb Gnome Sort'
        },
        {
          value: 'quickGnomeSort',
          label: 'Quick Gnome Sort'
        },
      ],
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
    } else if (algorithm === 'combSort') {
      callSort(combSort);
    } else if (algorithm === 'combGnomeSort') {
      callSort(combGnomeSort);
    } else if (algorithm === 'quickGnomeSort') {
      callSort(quickGnomeSort);
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
    {
      value: 'scatterPlot',
      text: 'Scatter Plot',
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
      <Row
        style={{ backgroundColor: '#111d2c', height: '50px', padding: '8px' }}
      >
        <Controls pausePlayClicked={pauseOrPlay} loop={loop} />
      </Row>
      <Row style={{ backgroundColor: '#faf9f0' }}>
        <Col span={4}>
          <Select defaultValue='barPlot' onChange={handleVMethodChange}>
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
            max={128}
            step={null}
            defaultValue={1}
            onChange={handleIncrementChange}
          />
          <Button onClick={forwardOrReverse}>{'Forward/Reverse'}</Button>
          <Select placeholder='Randomization method' onChange={randomize}>
            <Option value='default'>Default</Option>
            <Option value='reversed'>Reversed input</Option>
            <Option value='almostSorted'>Almost sorted</Option>
          </Select>
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
  for (let element of states[index]) {
    element.show('#ffffff');
  }
};

export const sketch = (p) => {
  globalP = p;
  backgroundColor = 100;

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
      if (oldStateIdx !== undefined && oldStateIdx !== null) {
        if (stateIdx > oldStateIdx) {
          for (let i = oldStateIdx; i < stateIdx; i++) {
            if (i >= states.length) break;
            for (let element of states[i]) {
              element.show('#ffffff');
            }
          }
        } else {
          let shouldStop = false;
          if (oldStateIdx < states.length) {
            for (let i = oldStateIdx; i >= stateIdx; i--) {
              if (i < 0) {
                shouldStop = true;
                break;
              }

              for (let element of states[i]) {
                element.show('#ffffff');
              }
            }

            if (shouldStop) {
              p.noLoop();
              loop = false;
              stateIdx = -1;
              return;
            }
          }
        }
      }

      if (stateIdx >= states.length) {
        showLastState(states.length - 1);

        p.noLoop();
        loop = false;
        return;
      } else if (stateIdx < 0) {
        showLastState(0);

        p.noLoop();
        loop = false;
        return;
      }

      if (stateIdx > oldStateIdx) {
        for (let element of states[stateIdx]) {
          element.show();
        }
      } else {
        for (let i = 0; i < states[stateIdx].length; i++) {
          states[stateIdx][i].show();
        }
      }
      oldStateIdx = stateIdx;
      stateIdx += dir * inc;
    }
  };
};

const randomize = (value) => {
  if (elements.length === 0) {
    globalP.background(100);
    randomizeHelper(value);
    showAllElements();
  } else {
    // Reset everything to the beginning state (as if the app was just started)
    globalP.noLoop();
    globalP.background(100);
    arr = [];
    elements = [];
    states = [];
    stateIdx = 0;
    loop = false;

    randomizeHelper(value);
    showAllElements();
  }
};

// Generate 'count' random numbers
const randomizeHelper = (value) => {
  if (!value) {
    return;
  } else {
    if (value === 'default') {
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
    } else if (value === 'reversed') {
      for (let i = 0; i < count; i++) {
        const ele = height - i * (height / count);
        arr.push(ele);
        addElement(i, ele);
      }
    } else if (value === 'almostSorted') {
      for (let i = 0; i < count; i++) {
        const ele = (height / count) * i + 1;
        arr.push(ele);
        addElement(i, ele);
      }
      for (let i = 0; i < count / 10; i++) {
        const random1 = Math.floor(Math.random() * count);
        const random2 = Math.floor(Math.random() * count);
        swap(elements, random1, random2);
      }
    }
  }
};

const addElement = (idx, rNumber) => {
  let element;

  if (vMethod === 'barPlot') {
    element = new Bar(
      idx * barWidth,
      height - rNumber,
      barWidth,
      rNumber,
      '#ffffff'
    );
  } else if (vMethod === 'hrPyramid') {
    element = new Bar(
      idx * barWidth,
      (height - rNumber) / 2,
      barWidth,
      rNumber,
      '#ffffff'
    );
  } else if (vMethod === 'scatterPlot') {
    element = new Dot(
      idx * barWidth,
      height - rNumber,
      barWidth,
      barWidth,
      '#ffffff'
    );
  } else return;

  elements.push(element);
};

const showAllElements = () => {
  if (elements.length === 0) {
    return;
  }

  for (let element of elements) {
    element.show();
  }
};

export { globalP, backgroundColor, width, height };
