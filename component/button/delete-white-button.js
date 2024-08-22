import React from 'react'
import style from './button.module.scss'
import { useSelector } from 'react-redux'
export default function DeleteWhiteButton({ handleDeleteBTN }) {
  const { datas } = useSelector((state) => state.public)
  return (
    <button className={style.whitebutton} onClick={handleDeleteBTN}>
      <i className="icon-delete"></i>
      <span>{datas.delete}</span>
    </button>
  )
}
