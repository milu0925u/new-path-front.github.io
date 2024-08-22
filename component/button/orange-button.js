import React from 'react'
import style from './button.module.scss'
export default function OrangeButton({ text, icon, handleOrangeBTN }) {
  return (
    <button
      className={`${style.button} ${style.next}`}
      data-text={text}
      onClick={(e) => {
        handleOrangeBTN(e)
      }}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  )
}
