import React from 'react'
import style from './button.module.scss'

export default function GreenButton({ text, icon, handleGreenBTN }) {
  return (
    <button
      className={`${style.button} ${style.start}`}
      data-text={text}
      onClick={(e) => {
        handleGreenBTN(e)
      }}
    >
      <i className={icon} alt={text}></i>
      <span>{text}</span>
    </button>
  )
}
