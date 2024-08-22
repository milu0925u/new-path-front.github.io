import React from 'react'
import style from './button.module.scss'

export default function RedButton({ text, icon, handleRedBTN }) {
  return (
    <button
      className={`${style.button} ${style.stop}`}
      data-text={text}
      onClick={(e) => {
        handleRedBTN(e)
      }}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </button>
  )
}
