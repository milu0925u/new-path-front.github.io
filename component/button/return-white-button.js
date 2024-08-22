import React from 'react'
import style from './button.module.scss'
import { useSelector } from 'react-redux'
export default function ReturnWhiteButton({ handleReturnBTN }) {
  const { datas } = useSelector((state) => state.public)

  return (
    <button className={style.whitebutton} onClick={handleReturnBTN}>
      <i className="icon-return-back"></i>
      <span>{datas.back}</span>
    </button>
  )
}
