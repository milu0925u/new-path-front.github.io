import React from 'react'
import style from './loading.module.scss'
export default function Loading() {
  return (
    <div className={style.loadingBox}>
      <div className={`${style.ball} ${style.size2x}`}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
