import React, { useState } from 'react'
import CameraLine from '@/component/nosharable/model/ff/camera-line'
import CameraScreen from './ff/camera-screen'
import style from './camera-create.module.scss'
import { useSelector } from 'react-redux'
export default function CameraViewScreen() {
  const { datas, camera } = useSelector((state) => state.public)

  return (
    <div className={`${style.l_screen} ${style.bg_screen}`}>
      <div className={style.screen_title}>
        {camera ? ` ${datas.scanning}  ${datas.model} ` : ''}
      </div>
      <CameraScreen />
      <CameraLine />
    </div>
  )
}
