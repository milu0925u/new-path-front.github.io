import React from 'react'
import { useSelector } from 'react-redux'
import style from './camera-function.module.scss'
export default function CameraViewName({ children, modelName, handleNameSet }) {
  const { datas } = useSelector((state) => state.public)
  return (
    <div className={`${style.l_function} ${style.bg_function}`}>
      <h3 className="content-title">{datas.modelsettings}</h3>
      <div className={style.col_function}>
        <h6>{datas.modelcreationnaming}</h6>
        <div>
          <input
            type="text"
            className={style.function_modelname}
            onChange={(e) => {
              handleNameSet(e)
            }}
          />
        </div>
      </div>
      <div className="nextbtn">{children}</div>
    </div>
  )
}
