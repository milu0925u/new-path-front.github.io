import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LeftcontentParam from "@/component/nosharable//info/eq-left-info";
import RWDTitle from "@/component/layout/rwd-title";
import RunScreen from "@/component/nosharable/execute/run/run-screen";
import OrangeButton from "@/component/button/orange-button";
import { StartContext } from "@/hook/startContext";

import TestRunScreen from "@/component/nosharable/execute/run/test-screen";
import ChosenPathScreen from "@/component/nosharable/execute/run/chosen-path-screen";
import ChosenParamScreen from "@/component/nosharable/execute/run/chosen-param-screen";
import ChosenArmScreen from "@/component/nosharable/execute/run/chosen-arm-screen";
export default function ProcessingView() {
  const router = useRouter();
  const { datas } = useSelector((state) => state.public);
  const { start } = StartContext();

  const handleNext = () => {
    router.push("/");
  };
  const handlePause = async () => {};
  const handleStop = async () => {};

  const handleStart = () => {
    // const client = mqtt.connect('http://172.16.11.40:8081')
    // client.on('connect', () => {
    //   const json = { text: 123 }
    //   const payload = JSON.stringify(json, null, 2)
    //   client.publish('ClientJetson1', payload)
    // })
    // client.on('message', (topic, message) => {
    //   setMessage(message.toString())
    //   console.log(`Received message: ${message.toString()}`)
    // })
    // client.on('error', (err) => {
    //   console.error('MQTT Client Error:', err)
    // })
    // client.on('close', () => {
    //   console.log('MQTT Connection Closed')
    // })
    // return () => {
    //   console.log('end')
    //   client.removeAllListeners()
    //   client.end()
    // }
  };
  // 選擇空跑或是執行加工
  const [executebtn, setexecutebtn] = useState("");
  // 顯示畫面
  const [screen, setScreen] = useState("run");
  const renderScreen = () => {
    switch (screen) {
      case "chosen-path": {
        return <ChosenPathScreen />;
      }
      case "chosen-param": {
        return <ChosenParamScreen />;
      }
      case "chosen-arm": {
        return <ChosenArmScreen setexecutebtn={setexecutebtn} />;
      }
      case "test-run": {
        return <TestRunScreen />;
      }
      case "run": {
        return (
          <RunScreen
            handleOrangeBTN={handleNext}
            handleGreenBTN={handleStart}
            handleRedBTN={handleStop}
            handleBlueBTN={handlePause}
          />
        );
      }
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    if (Object.keys(start.path).length === 0) {
      setScreen("chosen-path");
      return;
    }
    if (Object.keys(start.param).length === 0) {
      setScreen("chosen-param");
      return;
    }
    if (Object.keys(start.arm).length === 0) {
      setScreen("chosen-arm");
      return;
    }
    if (
      (Object.keys(start.path).length !== 0 &&
        Object.keys(start.param).length !== 0 &&
        Object.keys(start.arm).length !== 0 &&
        executebtn === "dry run") ||
      executebtn == "空跑"
    ) {
      setScreen("test-run");
      return;
    }
    if (
      (Object.keys(start.path).length !== 0 &&
        Object.keys(start.param).length !== 0 &&
        Object.keys(start.arm).length !== 0 &&
        executebtn === "execute processing") ||
      executebtn == "執行加工"
    ) {
      setScreen("run");
      return;
    }
  }, [start, executebtn]);

  return (
    <>
      <div className="bg-execute bg-size"></div>
      <div className="container container-center">
        <RWDTitle title={datas.processingsetting} icon="icon-processing">
          <button className="rwd-display-none-btn"></button>
          <button className="rwd-display-none-btn"></button>
        </RWDTitle>
        <div className="content">
          <LeftcontentParam setScreen={setScreen} />
          {renderScreen()}
          <div className="rwd-next-btn">
            <OrangeButton
              text={datas.confirm}
              icon="icon-ok"
              handleOrangeBTN={handleNext}
            />
            <button className="rwd-display-none-btn"></button>
          </div>
        </div>
      </div>
    </>
  );
}
