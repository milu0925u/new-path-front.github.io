import React from 'react'
import style from './camera-light-range.module.scss'

export default function CameraLightRange({ barValue, handleBarValue }) {
  return (
    <>
      <div className={style.exposure}>
        <div className={style.exposure_icon}>
          <img src={`/images/function/exposure/exposure-left.svg`} />
        </div>
        <div>
          <div className={style.line}></div>
          <input
            className={style.range}
            value={barValue}
            type="range"
            min="0.0"
            max="100.0"
            step="0.1"
            defaultValue="0.0"
            onChange={(e) => {
              handleBarValue(e)
            }}
          />
        </div>
        <div className={style.exposure_icon}>
          <img src={`/images/function/exposure/exposure-right.svg`} />
        </div>
      </div>
    </>
  )
}
