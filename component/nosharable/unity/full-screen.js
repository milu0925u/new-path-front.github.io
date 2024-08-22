import React from 'react'
import style from './unity-function.module.scss'
import { BsArrowsFullscreen } from 'react-icons/bs'
export default function FullScreen({ FullScreen }) {
  return (
    <button className={style.FullScreenButton} onClick={FullScreen}>
      <BsArrowsFullscreen />
    </button>
  )
}
