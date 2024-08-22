import React from 'react'
import style from './button.module.scss'
export default function WhiteButton({ text, icon, handleBlueBTN }) {
  return (
    <button className={style.whitebutton} onClick={handleBlueBTN}>
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  )
}
