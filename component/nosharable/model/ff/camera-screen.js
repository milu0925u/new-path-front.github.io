import React from 'react'
import style from './camera-screen.module.scss'
import { useSelector } from 'react-redux'
export default function CameraScreen({ datas }) {
  const { camera } = useSelector((state) => state.public)
  return (
    <>
      {camera ? (
        <div className={style.success}>
          <div></div>
        </div>
      ) : (
        <div className={style.fail}>
          <img alt="fail" src="/images/connect/fail.svg" />
        </div>
      )}
    </>
  )
}
