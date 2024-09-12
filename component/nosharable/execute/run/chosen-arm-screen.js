import React, { useEffect, useState } from "react";
import style from "./runscreen.module.scss";
import { useDispatch, useSelector } from "react-redux";
import OrangeButton from "@/component/button/orange-button";
import InputNumber from "@/component/input/input-number";
import BlueButton from "@/component/button/blue-button";
import { StartContext } from "@/hook/startContext";
export default function ChosenArmScreen() {
  const { datas } = useSelector((state) => state.public);
  const { start, handleAdd } = StartContext();
  const handleNext = () => {
    handleAdd("arm", { speed: textvalue });
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

  return (
    <div className={style.l_run_list}>
      <div className={style.l_run_list_arm}>
        <h3>手臂參數調整</h3>
        <div className={style.l_run_arm_setting}>
          <div>
            <div className={style.speed}>
              <i className="icon-armspeed"></i>
              機械手臂速度設定
            </div>
            <div className={style.speed}>
              <i className="icon-speed-left"></i>
              <InputNumber
                handleInputValue={handleInputValue}
                textvalue={textvalue}
              />
              <i className="icon-speed-right"></i>
            </div>
          </div>
          <div className={style.arm_btn}>
            <h6>回歸機械手臂安全點</h6>
            <BlueButton
              handleBlueBTN={handleReturnSafe}
              text={datas.safepoint}
              icon="icon-backtosafe"
            />
            <h6>回歸機械手臂起始點</h6>
            <BlueButton
              handleBlueBTN={handleReturnStart}
              text={datas.startingpoint}
              icon="icon-backtostart"
            />
          </div>
          <div className={style.l_run_arm_setting_btn}>
            <OrangeButton
              text={datas.ok}
              icon="icon-ok"
              handleOrangeBTN={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
