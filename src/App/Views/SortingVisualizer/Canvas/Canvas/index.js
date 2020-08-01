import React, { useRef } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { Row, Col, notification } from 'antd';
import _ from 'underscore';
import 'p5/lib/addons/p5.sound.js';
import P5 from 'p5';

import Bar from '../ElementTypes/Bar';
import Dot from '../ElementTypes/Dot';
import ColoredBar from '../ElementTypes/ColoredBar';
import ColorHeightBar from '../ElementTypes/ColorHeightBar';
import ColoredTriangle from '../ElementTypes/ColoredTriangle';
import VarColoredTriangle from '../ElementTypes/VarColoredTriangle';
import Triangle from '../ElementTypes/HelperClasses/Triangle';
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
  mergeSortInPlace,
  weaveMergeSort,
  bottomUpMergeSort,
  radixSortLSD,
  shellSort,
  maxHeapSort,
  minHeapSort,
  minMaxHeapSort,
  roomSort,
  proxmapSort,
  unbalancedTreeSort,
  swap,
} from '../Algorithms';

import Controls from '../Controls';

// Array of random numbers
export let arr = [];

// Array of objects mapped from 'arr'
export let elements = [];

// Array of arrays of Bar objects = the mid-sorting states
export let states = [];

let barWidth = 2;
let width = 1000;
let height = 600;

// Oscillator array - holding the sound waves that are to be played
let oscs = [];

// minimum and maximum values for the oscillator frequency range mapping
let min, max;

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

// Primary Color
export let primaryColor = '#f8efba';

// Accent Color
export let accentColor = '#ff0000';

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
      duration: 8,
      placement: 'topLeft',
    });
    return;
  }

  if (loop) {
    globalP.noLoop();
    loop = false;
    for (let i = 0; i < oscs.length; i++) {
      oscs[i].stop();
    }
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
    for (let i = 0; i < oscs.length; i++) {
      oscs[i].start();
    }
  }
};

// Switch playback direction
const forwardOrReverse = () => {
  dir *= -1;
};

const Canvas = () => {
  let algorithm = '';
  let input = '';
  let autoRebuild = true;

  const handleCascaderChange = (value) => {
    algorithm = value[value.length - 1];
    if (!autoRebuild) {
      notification.warning({
        message: 'Rebuild animations!',
        description: `You have to rebuild the animations if you change the algorithm. If you wish the rebuild to happen automatically, check the 'Auto-(re)build' checkbox.`,
        duration: 8,
        placement: 'topLeft',
      });
    } else {
      if (input === '') {
        notification.warning({
          message: 'Input type not selected!',
          description: `Please select one of the given input array types.`,
          duration: 8,
          placement: 'topLeft',
        });
      }
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
        duration: 8,
        placement: 'topLeft',
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
        duration: 8,
        placement: 'topLeft',
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
    } else if (algorithm === 'mergeSortInPlace') {
      callSort(mergeSortInPlace);
    } else if (algorithm === 'weaveMergeSort') {
      callSort(weaveMergeSort);
    } else if (algorithm === 'shellSort') {
      callSort(shellSort);
    } else if (algorithm === 'maxHeapSort') {
      callSort(maxHeapSort);
    } else if (algorithm === 'minHeapSort') {
      callSort(minHeapSort);
    } else if (algorithm === 'minMaxHeapSort') {
      callSort(minMaxHeapSort);
    } else if (algorithm === 'roomSort') {
      callSort(roomSort);
    } else if (algorithm === 'proxmapSort') {
      callSort(proxmapSort);
    } else if (algorithm === 'unbalancedTreeSort') {
      callSort(unbalancedTreeSort);
    } else if (algorithm === 'radixSortLSDb10') {
      if (vMethod === 'rainbow') {
        notification.warning({
          message: 'Float numbers',
          description:
            'Radix sort does not work for this visualization method, because the numbers compared here are floating point numbers. Radix only works for integers and/or types represented by integers.',
          duration: 12,
          placement: 'topLeft',
        });
        return;
      }
      callSort(() => radixSortLSD(10));
    } else if (algorithm === 'radixSortLSDb8') {
      if (vMethod === 'rainbow') {
        notification.warning({
          message: 'Float numbers',
          description:
            'Radix sort does not work for this visualization method, because the numbers compared here are floating point numbers. Radix only works for integers and/or types represented by integers.',
          duration: 12,
          placement: 'topLeft',
        });
        return;
      }
      callSort(() => radixSortLSD(8));
    } else if (algorithm === 'radixSortLSDb4') {
      if (vMethod === 'rainbow') {
        notification.warning({
          message: 'Float numbers',
          description:
            'Radix sort does not work for this visualization method, because the numbers compared here are floating point numbers. Radix only works for integers and/or types represented by integers.',
          duration: 12,
          placement: 'topLeft',
        });
        return;
      }
      callSort(() => radixSortLSD(4));
    } else if (algorithm === 'radixSortLSDb2') {
      if (vMethod === 'rainbow') {
        notification.warning({
          message: 'Float numbers',
          description:
            'Radix sort does not work for this visualization method, because the numbers compared here are floating point numbers. Radix only works for integers and/or types represented by integers.',
          duration: 12,
          placement: 'topLeft',
        });
        return;
      }
      callSort(() => radixSortLSD(2));
    }
  };

  const callSort = (sortingFunction) => {
    notification.warning({
      message: 'Building...',
      description: 'Please wait while the animations are being built.',
      duration: 4,
      placement: 'topLeft',
    });

    setTimeout(() => {
      sortingFunction();

      notification.success({
        message: 'Done!',
        description: 'You may now Play the visualization.',
        duration: 4,
        placement: 'topLeft',
      });
    }, 300);
  };

  const handleCheckChange = (e, setAutoRebuild) => {
    autoRebuild = e.target.checked;
    setAutoRebuild(autoRebuild);
  };

  const handleInputSelect = (value) => {
    input = value;

    if (input === '') {
      notification.warning({
        message: 'Input type not selected!',
        description: `Please select one of the given input array types.`,
        duration: 8,
        placement: 'topLeft',
      });
    }
    randomize(input);
    if (autoRebuild) {
      sort();
    }
  };

  // Handle Visualization Method Change
  const handleVMethodChange = (value) => {
    vMethod = value;
    if (autoRebuild) {
      if (input === '') {
        notification.warning({
          message: 'Input type not selected!',
          description: `Please select one of the given input array types.`,
          duration: 8,
          placement: 'topLeft',
        });
      }

      randomize(input);
      sort();
    }
  };

  const reShuffle = () => {
    if (input === '') {
      notification.warning({
        message: 'Input type not selected!',
        description: `Please select one of the given input array types.`,
        duration: 8,
        placement: 'topLeft',
      });
    }

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
      8: 1500,
    };
    count = values[value];
    barWidth = width / count;
    if (autoRebuild) {
      if (input === '') {
        notification.warning({
          message: 'Input type not selected!',
          description: `Please select one of the given input array types.`,
          duration: 8,
          placement: 'topLeft',
        });
      }

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
          <p style={{ zIndex: 23, position: 'relative', top: '50px', float: 'left' }}>Hi</p>
          <P5Wrapper sketch={sketch} />
        </Col>
      </Row>
    </>
  );
};

export default Canvas;

const showFinalState = (index) => {
  for (let element of states[index]) {
    element.show('original');
    oscs[0].freq(globalP.map(element.getValue(), min, max, 120, 1000));
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
    p.fill(primaryColor);
    p.colorMode(p.HSB);
    p.noStroke();
    for (let i = 0; i < 5; i++) {
      let osc = new P5.TriOsc();
      osc.freq(0);
      osc.amp(1);
      oscs.push(osc);
    }
  };

  // DRAW
  p.draw = () => {
    if (loop) {
      if (oldStateIdx !== undefined && oldStateIdx !== null) {
        if (stateIdx > oldStateIdx) {
          for (let i = oldStateIdx; i < stateIdx; i++) {
            if (i >= states.length) break;
            if (!loop) break;
            let j = 0;
            for (let element of states[i]) {
              element.show(primaryColor);
              if (states[i].length <= 5) {
                let osc = oscs[j];
                osc.freq(p.map(element.getValue(), min, max, 120, 1000));
              }
              j++;
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
              let j = 0;
              for (let element of states[i]) {
                element.show(primaryColor);
                if (states[i].length <= 5) {
                  let osc = oscs[j];
                  osc.freq(p.map(element.getValue(), min, max, 120, 1000));
                }
                j++;
              }
            }

            if (shouldStop) {
              p.noLoop();
              loop = false;
              stateIdx = -1;
              for (let osc of oscs) {
                osc.stop();
              }
              return;
            }
          }
        }
      }

      if (stateIdx >= states.length) {
        showFinalState(states.length - 1);

        p.noLoop();
        loop = false;
        for (let osc of oscs) {
          osc.stop();
        }
        return;
      } else if (stateIdx < 0) {
        showFinalState(0);
        p.noLoop();
        loop = false;
        for (let osc of oscs) {
          osc.stop();
        }
        return;
      }

      for (let i = 0; i < states[stateIdx].length; i++) {
        states[stateIdx][i].show('accent');
        
        if (states[stateIdx].length <= 5) {
          let osc = oscs[i];
          osc.freq(p.map(states[stateIdx][i].getValue(), min, max, 120, 1000));
        }
      }
      oldStateIdx = stateIdx;
      stateIdx += dir * inc;
    }
  };
};

const randomize = (value) => {
  min = 0;
  max = (vMethod === 'barPlot' || vMethod === 'hrPyramid' || vMethod === 'scatterPlot' || vMethod === 'rainbowBarPlot') ? height : 360;

  for (let osc of oscs) {
    osc.stop();
    osc.freq(0);
  }

  if (
    vMethod === 'rainbow' ||
    vMethod === 'rainbowBarPlot' ||
    vMethod === 'rainbowCircle' ||
    vMethod === 'disparityCircle'
  ) {
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
      let number = Math.floor((i + 1) * (height / count));

      if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
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

      if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
        ele = count - i;
      }

      arr.push(ele);
      addElement(i, ele);
    }
  } else if (value === 'almostSorted') {
    for (let i = 0; i < count; i++) {
      let ele = Math.floor((height / count) * i) + 1;

      if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
        ele = i + 1;
      }

      arr.push(ele);
      addElement(i, ele);
    }
    for (let i = 0; i < count / 16; i++) {
      const random1 = Math.floor(Math.random() * count);
      const random2 = Math.floor(Math.random() * count);
      swap(elements, random1, random2);
    }
  } else if (value === 'doubleSlope') {
    for (let i = 0; i < count; i++) {
      let ele;
      if (i % 2 === 0) {
        ele = (height / count) * i + 1;

        if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
          ele = i + 1;
        }
      } else {
        ele = height - i * (height / count);

        if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
          ele = count - i;
        }
      }

      arr.push(ele);
      addElement(i, ele);
    }
  } else if (value === 'alreadySorted') {
    for (let i = 0; i < count; i++) {
      let ele = Math.floor((i + 1) * (height / count));

      if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
        ele = i + 1;
      }

      arr.push(ele);
      addElement(i, ele);
    }
  } else if (value === 'similarInputs') {
    for (let i = 0; i < count; i++) {
      let rNumber = globalP.randomGaussian(5, 15);

      let number = globalP.map(rNumber, -50, 50, 1, height);

      if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
        number = globalP.map(number, 1, height, 1, count);
      }

      arr.push(number);
      addElement(i, number);
    }
  } else if (value === 'sinCosDistribution') {
    for (let i = 0; i < count; i++) {
      let angle = globalP.map(i, 0, count - 1, globalP.TWO_PI / count, globalP.TWO_PI);
      let number = globalP.map(globalP.sin(angle), -1, 1, 1, height);

      if (vMethod === 'rainbowCircle' || vMethod === 'disparityCircle') {
        number = globalP.map(number, 1, height, 1, count);
      }

      arr.push(number);
      addElement(i, number);
    }
  }
};

export const addElement = (idx, rNumber) => {
  let element;

  if (vMethod === 'barPlot') {
    element = new Bar(idx * barWidth, height - rNumber, barWidth, rNumber, primaryColor);
  } else if (vMethod === 'hrPyramid') {
    element = new Bar(idx * barWidth, (height - rNumber) / 2, barWidth, rNumber, primaryColor);
  } else if (vMethod === 'scatterPlot') {
    element = new Dot(idx * barWidth, height - rNumber, barWidth, barWidth, primaryColor);
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
  } else if (vMethod === 'disparityCircle') {
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

    let tx1 = globalP.sin(globalP.PI + (idx / count) * globalP.TWO_PI) * ((height / 9) * 4);
    let ty1 = globalP.cos(globalP.PI + (idx / count) * globalP.TWO_PI) * ((height / 9) * 4);
    let tx2 = globalP.sin(globalP.PI + ((idx + 1) / count) * globalP.TWO_PI) * ((height / 9) * 4);
    let ty2 = globalP.cos(globalP.PI + ((idx + 1) / count) * globalP.TWO_PI) * ((height / 9) * 4);

    // right location x and y
    let rx = cx + globalP.sin(globalP.PI + (rNumber / count) * globalP.TWO_PI) * ((height / 9) * 4);
    let ry = cy + globalP.cos(globalP.PI + (rNumber / count) * globalP.TWO_PI) * ((height / 9) * 4);

    let magnitude = globalP.map(
      globalP.dist(tx1 + cx, ty1 + cy, rx, ry),
      0,
      height * (4 / 9) * 2,
      1,
      0
    );

    element = new VarColoredTriangle(
      cx + tx1 * magnitude,
      cy + ty1 * magnitude,
      cx + tx2 * magnitude,
      cy + ty2 * magnitude,
      cx + tx1,
      cy + ty1,
      cx + tx2,
      cy + ty2,
      rx,
      ry,
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
    element.show('original');
    oscs[0].freq(globalP.map(element.getValue(), min, max, 120, 1000));
  }
};

export { globalP, backgroundColor, width, height };
