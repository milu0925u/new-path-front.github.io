import React from 'react'
import style from './unity-function.module.scss'
import { MdLanguage } from 'react-icons/md'
export default function FullScreen({ langSwitch }) {
  return (
    <button className={style.LanguageButton} onClick={langSwitch}>
      <MdLanguage />
    </button>
  )
}
