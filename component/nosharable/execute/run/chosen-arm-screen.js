import React, { useEffect, useState } from "react";
import style from "./runscreen.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import InputNumber from "@/component/input/input-number";
import BlueButton from "@/component/button/blue-button";
import { StartContext } from "@/hook/startContext";
import toast from "react-hot-toast";
export default function ChosenArmScreen({ setexecutebtn }) {
  const { datas } = useSelector((state) => state.public);
  const { start, handleAdd } = StartContext();

  const handleNext = () => {
    if (textvalue == null && textvalue == undefined) {
      toast.error(datas.noarmspeedentered);
      return false;
    }
    handleAdd("arm", { speed: Number(textvalue) });
  };
  const handleReturnSafe = () => {};
  const handleReturnStart = () => {};
  // 手臂速度
  const [textvalue, settextvalue] = useState();
  const handleInputValue = (e) => {
    let value = e.target.value;
    value = value.replace(/^0+(?!$)/, "");

    if (value > 100) {
      settextvalue(100);
    } else if (value <= 0) {
      settextvalue("0");
    } else {
      settextvalue(value);
    }
  };
  useEffect(() => {
    if (start.arm?.speed) {
      settextvalue(start.arm?.speed);
    }
  }, [start]);
  const handleRun = (e) => {
    const text = e.currentTarget.dataset.text;
    setexecutebtn(text);
  };

  return (
    <>
      <div className={style.l_run_list}>
        <div className={style.l_run_list_arm}>
          <h3>{datas.armparamadjust}</h3>
          <div className={style.l_run_arm_setting}>
            <div>
              <div className={style.speed_text}>
                <i className="icon-armspeed"></i>
                <h6>{datas.roboticarmspeedsetting}</h6>
              </div>
              <div className={style.speed_input}>
                <i className="icon-speed-left"></i>
                <InputNumber
                  handleInputValue={handleInputValue}
                  textvalue={textvalue}
                />
                <i className="icon-speed-right"></i>
              </div>
            </div>
            <div>
              <h6>{datas.returntoroboticarmsafepoint}</h6>
              <BlueButton
                handleBlueBTN={handleReturnSafe}
                text={datas.safepoint}
                icon="icon-backtosafe"
              />
              <h6>{datas.returntoroboticarmstartingpoint}</h6>
              <BlueButton
                handleBlueBTN={handleReturnStart}
                text={datas.startingpoint}
                icon="icon-backtostart"
              />
            </div>
            <div>
              <OrangeButton
                text={datas.ok}
                icon="icon-ok"
                handleOrangeBTN={handleNext}
              />
            </div>
          </div>
          <div className={style.l_run_button}>
            <OrangeButton
              text={datas.dryrun}
              icon="icon-testrun"
              handleOrangeBTN={handleRun}
            />
            <OrangeButton
              text={datas.executeprocessing}
              icon="icon-execute-work"
              handleOrangeBTN={handleRun}
            />
          </div>
        </div>
      </div>
      <div className={style.rwd_run_button}>
        <OrangeButton
          text={datas.dryrun}
          icon="icon-testrun"
          handleOrangeBTN={handleRun}
        />
        <OrangeButton
          text={datas.executeprocessing}
          icon="icon-execute-work"
          handleOrangeBTN={handleRun}
        />
      </div>
    </>
  );
}
