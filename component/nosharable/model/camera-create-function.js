import React, { useState } from 'react'
import style from './camera-function.module.scss'
import { useSelector } from 'react-redux'
import Connect from '@/component/connect'
import InputNumber from '@/component/input/input-number'
export default function CameraFunction({ children }) {
  const { datas } = useSelector((state) => state.public)

  const [barValue, setBarValue] = useState(0)
  const handleBarValue = (e) => {
    setBarValue(e.target.value)
  }
  const [active, setActive] = useState(false)

  return (
    <div className={`${style.l_function} ${style.bg_function}`}>
      <h3 className="content-title">{datas.adjustscanningsettings}</h3>
      <div className={style.col_function}>
        <h6>{datas.cameraconnectionstatus}</h6>
        <div>
          <Connect icon="icon-camera" />
          <button>{datas.reconnect}</button>
        </div>
      </div>
      <div className={style.col_function}>
        <h6>{datas.scanbackgroundremovalrange}</h6>
        <div>
          <InputNumber handleInputValue={handleBarValue} textvalue={barValue} />
          mm
        </div>
      </div>
      <div className={style.col_function}>
        <h6>{datas.scancameraparameters}</h6>
        <div className={style.function_param_btn}>
          <button
            className={active == datas.basicsettings ? style.active : ''}
            onClick={() => {
              setActive(datas.basicsettings)
            }}
          >
            {datas.basicsettings}
          </button>
          <button
            className={active == datas.importcustomsettings ? style.active : ''}
            onClick={() => {
              setActive(datas.importcustomsettings)
            }}
          >
            +{datas.importcustomsettings}
          </button>
        </div>
      </div>
      <div className="nextbtn">{children}</div>
    </div>
  )
}
