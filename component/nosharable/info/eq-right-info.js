import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import style from './info.module.scss'
import BlueButton from '@/component/button/blue-button'
import Range from '../right-content/work/range'
import { wirteParamWorkingAction } from '@/redux/actions/ListAction'
export default function RightcontentParam({ children }) {
  const dispatch = useDispatch()

  const { create } = useSelector((state) => state.workList)
  const { datas } = useSelector((state) => state.public)

  const handleParamSetting = (e) => {
    dispatch(wirteParamWorkingAction(e.target.name, e.target.value))
  }
  const handleBlueBTN = () => {
    console.log('手臂控制未設置')
  }

  return (
    <div className={style.l_right_info}>
      <div className={style.col_right_info}>
        <h3 className="content-title">{datas.processingparameteradjustment}</h3>
        <div className={style.params_index_flex_center}>
          <i className="icon-welddeep"></i>
          <h6>{`${datas.weldingprocess}-${datas.verticaldepthadjustment}`}</h6>
        </div>
        <input type="number" value={create?.deep} pattern="[0-9]*" disabled />
        <Range handleParamSetting={handleParamSetting} />
        <div className={style.params_index_flex_center}>
          <p>{datas.current}</p>
          <input
            type="number"
            name="electric_current"
            pattern="[0-9]*"
            value={create?.electric_current}
            onChange={handleParamSetting}
          />
        </div>
        <div className={style.params_index_flex_center}>
          <p>{datas.voltage}</p>
          <input
            type="number"
            name="voltage"
            pattern="[0-9]*"
            value={create?.voltage}
            onChange={handleParamSetting}
          />
        </div>
        <div className="nextbtn">{children[0]}</div>
      </div>

      <div className={style.col_right_info}>
        <h3 className="content-title">{`${datas.armparamadjust}`}</h3>

        <div className={style.params_index_flex_center}>
          <i className="icon-speed"></i>
          <h6>{`${datas.roboticarm}-${datas.speedsetting}`}</h6>
        </div>
        <div className={style.params_index_flex_center}>
          <i className="icon-addspeed"></i>
          <input
            type="number"
            name="speed"
            pattern="[0-9]*"
            defaultValue={create?.speed}
            onChange={handleParamSetting}
          />
          <i className="icon-reducespeed"></i>
        </div>
      </div>

      <div className={style.col_right_info}>
        <h3 className={style.params_title}></h3>
        <h6>{datas.returntoroboticarmsafepoint}</h6>
        <BlueButton
          handleBlueBTN={handleBlueBTN}
          text={datas.safepoint}
          icon="icon-backtosafe"
        />
        <h6>{datas.returntostartingpoint}</h6>
        <BlueButton
          handleBlueBTN={handleBlueBTN}
          text={datas.startingpoint}
          icon="icon-backtostart"
        />
        <div className="nextbtn">{children[1]}</div>
      </div>
    </div>
  )
}
