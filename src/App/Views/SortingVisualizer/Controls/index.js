import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Slider,
  Cascader,
  Checkbox,
  Typography,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { useWindowWidthContext } from "../../../../Context/useWindowWidthContext";
import {
  visualizationOptions,
  algoCascaderOptions,
  inputArrayOptions,
  speedMarks,
  incrementMarks,
} from "./data";
import "./style.css";

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
  elCount,
  fps,
  amplitude,
}) => {
  const [play, setPlay] = useState(true);
  const [autoRebuild, setAutoRebuild] = useState(true);
  const [expand, setExpand] = useState(false);
  const [direction, setDir] = useState(dir);
  const [algorithm] = useState([]);
  const [vMethod] = useState(["barPlot"]);
  const [input] = useState(["default"]);
  const [count, setCount] = useState(elCount);
  const [frameCount, setFrameCount] = useState(fps);
  const [volume, setVolume] = useState(amplitude);

  const { width } = useWindowWidthContext();

  const handleDirChange = () => {
    forwardOrReverse(setDir);
  };

  const playClickedHandler = () => {
    setPlay(!play);
    pausePlayClicked();
  };

  const countMarks = { ...divisors };
  const objKeys = Object.keys(countMarks);
  const min = parseInt(objKeys[0]);
  const max = parseInt(objKeys[objKeys.length - 1]);

  const visualCascaderRenderer = (labels, _) => {
    if (width > 768) {
      return labels[labels.length - 1];
    } else {
      return labels.length ? `Visuals: ${labels[labels.length - 1]}` : "";
    }
  };

  const algoCascaderRenderer = (labels, _) => {
    if (width > 768) {
      return labels[labels.length - 1];
    } else {
      return labels.length ? `Algorithm: ${labels[labels.length - 1]}` : "";
    }
  };

  const inputCascaderRenderer = (labels, _) => {
    if (width > 768) {
      return labels[labels.length - 1];
    } else {
      return labels.length ? `Input: ${labels[labels.length - 1]}` : "";
    }
  };
  /*
  const inputArrayOptions = inputArrayOptions.map(({ value, label }, idx) => (
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

  const componentSize = width > 768 ? "default" : "small";

  const visualCascader = (
    <Cascader
      displayRender={visualCascaderRenderer}
      allowClear={false}
      style={{ width: "100%", textAlign: "left" }}
      defaultValue={vMethod}
      onChange={(values) => {
        handleVMethodChange(values);
      }}
      options={visualizationOptions}
      placeholder="Select visual method"
    />
  );

  const algorithmCascader = (
    <Cascader
      displayRender={algoCascaderRenderer}
      allowClear={false}
      style={{ width: "100%", textAlign: "left" }}
      expandTrigger="hover"
      options={algoCascaderOptions}
      defaultValue={algorithm}
      onChange={(values) => {
        handleAlgorithmChange(values);
      }}
      placeholder="Select an algorithm"
    />
  );

  const inputCascader = (
    <Cascader
      displayRender={inputCascaderRenderer}
      defaultValue={input}
      allowClear={false}
      style={{ width: "100%", textAlign: "left" }}
      onChange={(values) => {
        handleInputSelect(values);
      }}
      options={inputArrayOptions}
      placeholder="Select input type"
    />
  );

  const buildButton = (
    <Button
      size={componentSize}
      type="primary"
      style={{ width: "100%" }}
      onClick={buildAnimations}
      disabled={autoRebuild}
    >
      Build animations
    </Button>
  );

  const countSlider = (
    <Slider
      tipFormatter={(value) =>
        countMarks[value] !== "" ? countMarks[value] : null
      }
      min={min}
      max={max}
      marks={countMarks}
      step={null}
      defaultValue={count}
      onChange={(value) => {
        handleCountChange(value);
        setCount(value);
      }}
    />
  );

  const volumeSlider = (
    <Slider
      marks={{
        0: "0%",
        50: "50%",
        100: "100%",
      }}
      min={0}
      max={100}
      defaultValue={volume}
      onChange={(value) => {
        setAmplitude(value);
        setVolume(value);
      }}
    />
  );

  const fpsSlider = (
    <Slider
      marks={speedMarks}
      min={1}
      max={60}
      defaultValue={frameCount}
      onChange={(value) => {
        handleFpsChange(value);
        setFrameCount(value);
      }}
    />
  );

  const incrementSlider = (
    <Slider
      tooltipVisible={false}
      marks={incrementMarks}
      min={1}
      max={9}
      step={1}
      defaultValue={1}
      onChange={handleIncrementChange}
    />
  );

  const desktopView = (
    <>
      <Col span={1}></Col>

      <Col span={6} style={{ marginRight: "20px" }}>
        <>
          <Row align="middle" gutter={[8, 8]} justify="space-around">
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong>Visualization method: </Text>
            </Col>
            <Col span={12}>{visualCascader}</Col>
          </Row>
          <Row align="middle" gutter={[8, 8]}>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong>Algorithm: </Text>
            </Col>
            <Col span={12}>{algorithmCascader}</Col>
          </Row>
          <Row align="middle" gutter={[8, 8]}>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong>Input array type: </Text>
            </Col>
            <Col span={12}>{inputCascader}</Col>
          </Row>
          <Row gutter={[8, 8]} align="middle">
            <Col span={12}></Col>
            <Col span={12}>{buildButton}</Col>
          </Row>
        </>
      </Col>

      <Col span={2}>
        <Row gutter={[8, 8]} justify="start">
          <Col offset={0} span={24}>
            <Button
              size={componentSize}
              style={{ width: "100%", marginRight: "5px" }}
              type="primary"
              onClick={playClickedHandler}
            >
              {"Play/Pause"}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col offset={0} span={24}>
            <Button
              size={componentSize}
              style={{ width: "100%" }}
              onClick={handleDirChange}
            >
              {direction === 1 ? "Reverse" : "Forward"}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="middle">
          <Col offset={0} span={24}>
            <Button
              size={componentSize}
              style={{ width: "100%" }}
              onClick={reShuffle}
            >
              {"Reshuffle"}
            </Button>
          </Col>
        </Row>
        <Row align="middle" gutter={[8, 8]}>
          <Col offset={0} span={24}>
            <Checkbox
              size={componentSize}
              style={{ width: "100%" }}
              onChange={(e) => handleCheckChange(e, setAutoRebuild)}
              defaultChecked={true}
            >
              Auto-(re)build
            </Checkbox>
          </Col>
        </Row>
      </Col>

      <Col span={6} style={{ marginRight: "40px" }}>
        {width > 768 ? (
          <>
            <Row align="middle" gutter={[12, 8]}>
              <Col span={8} style={{ textAlign: "right" }}>
                <Text strong>Element count: </Text>
              </Col>
              <Col span={16}>{countSlider}</Col>
            </Row>
            <Row align="middle" gutter={[12, 8]} justify="start">
              <Col span={8} style={{ textAlign: "right" }}>
                <Text strong>Volume: </Text>
              </Col>
              <Col span={16}>{volumeSlider}</Col>
            </Row>
          </>
        ) : null}
      </Col>

      <Col span={6} style={{ marginRight: "40px" }}>
        <Row align="middle" gutter={[12, 8]} justify="start">
          <Col span={8} style={{ textAlign: "right" }}>
            <Text strong>Frames per second: </Text>
          </Col>
          <Col span={16}>{fpsSlider}</Col>
        </Row>
        <Row align="middle" gutter={[12, 8]}>
          <Col span={8} style={{ textAlign: "right" }}>
            <Text strong>
              <Tooltip placement="top" title={"Swaps skipped per frame"}>
                <QuestionCircleOutlined />
              </Tooltip>
              {" Step: "}
            </Text>
          </Col>
          <Col span={16}>{incrementSlider}</Col>
        </Row>
      </Col>

      <Col span={3}></Col>
    </>
  );

  const mobileView = (
    <>
      <Col span={1}></Col>

      <Col span={22}>
        <Row align="middle" gutter={[8, 8]} justify="space-around">
          <Col span={0} style={{ textAlign: "right" }}>
            <Text strong>Visualization method: </Text>
          </Col>
          <Col span={24}>{visualCascader}</Col>
        </Row>
        <Row align="middle" gutter={[8, 8]}>
          <Col span={0} style={{ textAlign: "right" }}>
            <Text strong>Algorithm: </Text>
          </Col>
          <Col span={24}>{algorithmCascader}</Col>
        </Row>
        <Row align="middle" gutter={[8, 8]}>
          <Col span={0} style={{ textAlign: "right" }}>
            <Text strong>Input array type: </Text>
          </Col>
          <Col span={24}>{inputCascader}</Col>
        </Row>
        <Row gutter={[8, 8]} justify="start">
          <Col span={8}>
            <Button style={{ width: "100%" }} onClick={reShuffle}>
              {"Reshuffle"}
            </Button>
          </Col>
          <Col span={8}>
            <Button style={{ width: "100%" }} onClick={handleDirChange}>
              {direction === 1 ? "Reverse" : "Forward"}
            </Button>
          </Col>
          <Col span={8}>
            <Button
              style={{ width: "100%", marginRight: "5px" }}
              type="primary"
              onClick={playClickedHandler}
            >
              {"Play/Pause"}
            </Button>
          </Col>
        </Row>

        {expand ? (
          <>
            <Row align="middle" gutter={[12, 8]}>
              <Col span={4} style={{ textAlign: "right" }}>
                <Text strong>Element count: </Text>
              </Col>
              <Col span={20}>{countSlider}</Col>
            </Row>
            <Row align="middle" gutter={[12, 8]} justify="start">
              <Col span={4} style={{ textAlign: "right" }}>
                <Text strong>FPS: </Text>
              </Col>
              <Col span={20}>{fpsSlider}</Col>
            </Row>
            <Row align="middle" gutter={[12, 8]} justify="start">
              <Col span={4} style={{ textAlign: "right" }}>
                <Text strong>Volume: </Text>
              </Col>
              <Col span={20}>{volumeSlider}</Col>
            </Row>
          </>
        ) : null}
        <Row align="middle" gutter={[12, 8]}>
          <Col span={4} style={{ textAlign: "right" }}>
            <Text strong>
              <Tooltip placement="top" title={"Swaps skipped per frame"}>
                <QuestionCircleOutlined />
              </Tooltip>
              {" Step: "}
            </Text>
          </Col>
          <Col span={20}>{incrementSlider}</Col>
        </Row>
        <Row align="middle" gutter={[12, 8]}>
          <Col span={24}>
            <Button onClick={handleExpand} type="link">
              {expand ? "Fewer controls" : "More controls"}
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={1}></Col>
    </>
  );

  const desktopDevice = width > 768;

  return desktopDevice ? desktopView : mobileView;
};

export default Controls;
