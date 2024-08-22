import React from 'react'
import style from './input.module.scss'
export default function InputText({ handleInputValue, textvalue }) {
  return (
    <input
      type="text"
      className={style.input_default}
      value={textvalue}
      onChange={(e) => {
        handleInputValue(e)
      }}
    />
  )
}
