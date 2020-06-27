import React, { useRef } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { Row, Col, notification } from 'antd';
import _ from 'underscore';

import Bar from './ElementTypes/Bar';
import Dot from './ElementTypes/Dot';
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
  mergeSort,
  bottomUpMergeSort,
  swap,
} from './Algorithms/algorithms';
import Controls from './Controls';
import ColoredBar from './ElementTypes/ColoredBar';
import ColorHeightBar from './ElementTypes/ColorHeightBar';
import ColoredTriangle from './ElementTypes/ColoredTriangle';
import Triangle from './ElementTypes/HelperClasses/Triangle';

// Array of random numbers
export let arr = [];

// Array of objects mapped from 'arr'
export let elements = [];

// Array of arrays of Bar objects = the mid-sorting states
export let states = [];

let barWidth = 2;
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

// triangle pointer Distance from Center Multiplier
let pDCM = (height / 21) * 10;

// triangle point Distance from Center Multiplier
let pDCMp = (height / 22) * 10;

// screen center X
let cx = width / 2;

// screen center Y
let cy = height / 2;

// Visualization method
export let vMethod = 'barPlot';

const handleSpeedChange = (value) => {
  fps = value;
  globalP.frameRate(fps);
};

const handleIncrementChange = (value) => {
  inc = Math.pow(2, value - 1);
};

const pauseOrPlay = () => {
  if (states.length === 0) {
    notification.warning({
      message: 'No animations!',
      description: 'You have to build the animations before trying to play them.',
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
  let input = 'default';
  let autoRebuild = false;

  const handleCascaderChange = (value) => {
    algorithm = value[value.length - 1];
    if (!autoRebuild) {
      notification.warning({
        message: 'Rebuild animations!',
        description: `You have to rebuild the animations if you change the algorithm. If you wish the rebuild to happen automatically, check the 'Auto-(re)build' checkbox.`,
        duration: 8,
        placement: 'bottomLeft',
      });
    } else {
      randomize(input);
      sort();
    }
  };

  const sort = () => {
    // If array is empty; Nothing to sort!
    if (arr.length === 0) {
      notification.warning({
        message: 'No array to sort!',
        description: `You have to generate an array using the 'Input' select.`,
        duration: 4,
        placement: 'bottomLeft',
      });
      return;
    }

    if (states.length !== 0) {
      globalP.noLoop();
      states = [];
      stateIdx = 0;
      loop = false;
      showAllElements();
    }

    // If algorithm not chosen
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
    } else if (algorithm === 'mergeSort') {
      callSort(mergeSort);
    } else if (algorithm === 'bottomUpMergeSort') {
      callSort(bottomUpMergeSort);
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

  const handleCheckChange = (e) => {
    autoRebuild = e.target.checked;
  };

  const handleInputSelect = (value) => {
    input = value;
    randomize(input);
    if (autoRebuild) {
      sort();
    }
  };

  // Handle Visualization Method Change
  const handleVMethodChange = (value) => {
    vMethod = value;
    if (autoRebuild) {
      randomize(input);
      sort();
    }
  };

  const reShuffle = () => {
    randomize(input);
    if (autoRebuild) {
      sort();
    }
  };

  const debounceCountChange = useRef(_.debounce((value) => handleCountChange(value), 500)).current;

  const handleCountChange = (value) => {
    const values = {
      1: 10,
      2: 20,
      3: 50,
      4: 100,
      5: 200,
      6: 500,
      7: 1000,
    }
    count = values[value];
    barWidth = width / count;
    if (autoRebuild) {
      randomize(input);
      sort();
    }
  };

  return (
    <>
      <Row
        style={{
          backgroundColor: '#faf9f0',
          padding: '8px',
          marginBottom: '30px',
          boxShadow: '0 5px 10px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Controls
          pausePlayClicked={pauseOrPlay}
          loop={loop}
          handleVMethodChange={handleVMethodChange}
          handleAlgorithmChange={handleCascaderChange}
          handleFpsChange={handleSpeedChange}
          handleIncrementChange={handleIncrementChange}
          handleCountChange={debounceCountChange}
          forwardOrReverse={forwardOrReverse}
          handleInputSelect={handleInputSelect}
          buildAnimations={sort}
          handleCheckChange={handleCheckChange}
          reShuffle={reShuffle}
        />
      </Row>
      <Row justify='center' style={{ backgroundColor: 'white' }}>
        <Col span={24}>
          <P5Wrapper
            sketch={sketch}
            style={{
              boxShadow: '0 0 10px 10px rgba(0,0,0,0.1)',
              border: '1px solid black',
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Canvas;

const showLastState = (index) => {
  for (let element of states[index]) {
    element.show('lastShow');
  }
};

export const sketch = (p) => {
  globalP = p;
  backgroundColor = 50;

  p.setup = () => {
    p.createCanvas(width, height);

    p.colorMode(p.RGB);
    p.background(backgroundColor);
    p.angleMode(p.RADIANS);

    p.noLoop();
    p.frameRate(fps);
    p.fill('#f8efba');
    p.colorMode(p.HSB);
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
              element.show('#f8efba');
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
                element.show('#f8efba');
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

      for (let i = 0; i < states[stateIdx].length; i++) {
        states[stateIdx][i].show('red');
      }
      oldStateIdx = stateIdx;
      stateIdx += dir * inc;
    }
  };
};

const randomize = (value) => {
  if (vMethod === 'rainbow' || vMethod === 'rainbowBarPlot' || vMethod === 'rainbowCircle') {
    globalP.colorMode(globalP.RGB);
    globalP.background(backgroundColor);
    globalP.colorMode(globalP.HSB);
  } else {
    globalP.colorMode(globalP.RGB);
    globalP.background(backgroundColor);
  }
  if (elements.length === 0) {
    randomizeHelper(value);
    showAllElements();
  } else {
    // Reset everything to the beginning state (as if the app was just started)
    globalP.noLoop();
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
  }

  if (value === 'default') {
    let numbers = [];

    for (let i = 0; i < count; i++) {
      let number = parseInt((i + 1) * (height / count));

      if (vMethod === 'rainbowCircle') {
        number = i + 1;
      }

      numbers.push(number);
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
      let ele = height - i * (height / count);

      if (vMethod === 'rainbowCircle') {
        ele = count - i;
      }

      arr.push(ele);
      addElement(i, ele);
    }
  } else if (value === 'almostSorted') {
    for (let i = 0; i < count; i++) {
      let ele = (height / count) * i + 1;

      if (vMethod === 'rainbowCircle') {
        ele = i + 1;
      }

      arr.push(ele);
      addElement(i, ele);
    }
    for (let i = 0; i < count / 10; i++) {
      const random1 = Math.floor(Math.random() * count);
      const random2 = Math.floor(Math.random() * count);
      swap(elements, random1, random2);
    }
  }
};

const addElement = (idx, rNumber) => {
  let element;

  if (vMethod === 'barPlot') {
    element = new Bar(idx * barWidth, height - rNumber, barWidth, rNumber, '#f8efba');
  } else if (vMethod === 'hrPyramid') {
    element = new Bar(idx * barWidth, (height - rNumber) / 2, barWidth, rNumber, '#f8efba');
  } else if (vMethod === 'scatterPlot') {
    element = new Dot(idx * barWidth, height - rNumber, barWidth, barWidth, '#f8efba');
  } else if (vMethod === 'rainbow') {
    element = new ColoredBar(idx * barWidth, barWidth, rNumber);
  } else if (vMethod === 'rainbowBarPlot') {
    element = new ColorHeightBar(idx * barWidth, height - rNumber, barWidth, rNumber, rNumber);
  } else if (vMethod === 'rainbowCircle') {
    let x1 = cx + globalP.sin(globalP.PI + (idx / count) * globalP.TWO_PI) * pDCM;
    let y1 = cy + globalP.cos(globalP.PI + (idx / count) * globalP.TWO_PI) * pDCM;
    let x2 = cx + globalP.sin(globalP.PI + ((idx + 1) / count) * globalP.TWO_PI) * pDCM;
    let y2 = cy + globalP.cos(globalP.PI + ((idx + 1) / count) * globalP.TWO_PI) * pDCM;
    let x3 = cx + globalP.sin(globalP.PI + ((idx + 0.5) / count) * globalP.TWO_PI) * pDCMp;
    let y3 = cy + globalP.cos(globalP.PI + ((idx + 0.5) / count) * globalP.TWO_PI) * pDCMp;

    let px1 = cx + globalP.sin(globalP.PI + ((idx - 0.5) / count) * globalP.TWO_PI) * (pDCM + 1);
    let py1 = cy + globalP.cos(globalP.PI + ((idx - 0.5) / count) * globalP.TWO_PI) * (pDCM + 1);
    let px2 = cx + globalP.sin(globalP.PI + ((idx + 1.5) / count) * globalP.TWO_PI) * (pDCM + 1);
    let py2 = cy + globalP.cos(globalP.PI + ((idx + 1.5) / count) * globalP.TWO_PI) * (pDCM + 1);
    let px3 =
      cx + globalP.sin(globalP.PI + ((idx + 0.5) / count) * globalP.TWO_PI) * (height / 9) * 4;
    let py3 =
      cy + globalP.cos(globalP.PI + ((idx + 0.5) / count) * globalP.TWO_PI) * (height / 9) * 4;

    if (count < 100) {
      px1 = cx + globalP.sin(globalP.PI + ((idx - 0.15) / count) * globalP.TWO_PI) * (pDCM + 1);
      py1 = cy + globalP.cos(globalP.PI + ((idx - 0.15) / count) * globalP.TWO_PI) * (pDCM + 1);
      px2 = cx + globalP.sin(globalP.PI + ((idx + 1.15) / count) * globalP.TWO_PI) * (pDCM + 1);
      py2 = cy + globalP.cos(globalP.PI + ((idx + 1.15) / count) * globalP.TWO_PI) * (pDCM + 1);
    }

    if (count < 30) {
      x1 = cx + globalP.sin(globalP.PI + ((idx + 0.45) / count) * globalP.TWO_PI) * (pDCM * 1.2);
      y1 = cy + globalP.cos(globalP.PI + ((idx + 0.45) / count) * globalP.TWO_PI) * (pDCM * 1.2);
      x2 = cx + globalP.sin(globalP.PI + ((idx + 0.55) / count) * globalP.TWO_PI) * (pDCM * 1.2);
      y2 = cy + globalP.cos(globalP.PI + ((idx + 0.55) / count) * globalP.TWO_PI) * (pDCM * 1.2);
      px1 = cx + globalP.sin(globalP.PI + ((idx - 0.05) / count) * globalP.TWO_PI) * (pDCM * 1.4);
      py1 = cy + globalP.cos(globalP.PI + ((idx - 0.05) / count) * globalP.TWO_PI) * (pDCM * 1.4);
      px2 = cx + globalP.sin(globalP.PI + ((idx + 1.05) / count) * globalP.TWO_PI) * (pDCM * 1.4);
      py2 = cy + globalP.cos(globalP.PI + ((idx + 1.05) / count) * globalP.TWO_PI) * (pDCM * 1.4);
    }

    let pointerOverlay = new Triangle(px1, py1, px2, py2, px3, py3, null);
    let trianglePointer = new Triangle(x1, y1, x2, y2, x3, y3, pointerOverlay);

    element = new ColoredTriangle(
      cx + globalP.sin(globalP.PI + (idx / count) * globalP.TWO_PI) * (height / 9) * 4,
      cy + globalP.cos(globalP.PI + (idx / count) * globalP.TWO_PI) * (height / 9) * 4,
      cx + globalP.sin(globalP.PI + ((idx + 1) / count) * globalP.TWO_PI) * (height / 9) * 4,
      cy + globalP.cos(globalP.PI + ((idx + 1) / count) * globalP.TWO_PI) * (height / 9) * 4,
      rNumber,
      trianglePointer
    );
  } else return;

  elements.push(element);
};

const showAllElements = () => {
  if (elements.length === 0) {
    return;
  }

  for (let element of elements) {
    element.show('lastShow');
  }
};

export { globalP, backgroundColor, width, height };
