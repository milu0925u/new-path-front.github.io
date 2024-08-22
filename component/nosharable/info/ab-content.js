import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './info.module.scss'
export default function Abnormalcontent() {
  const { datas } = useSelector((state) => state.public)
  const { data } = useSelector((state) => state.log)
  return (
    <div className={style.l_ab_content}>
      {data.map((item, i) => (
        <div key={i}>
          <span className={style.row}>{i + 1}.</span>
          <div>{item.date}</div>
          <span>
            {datas.abnormalcode}:{item.code}
          </span>
          <span>[{item.name}]</span>
        </div>
      ))}
    </div>
  )
}
