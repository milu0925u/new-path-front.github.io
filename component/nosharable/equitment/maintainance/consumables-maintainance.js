import React from 'react'
import style from '../equitment-set.module.scss'
import { useSelector } from 'react-redux'

export default function ConsumablesMaintainance() {
  const { datas } = useSelector((state) => state.public)

  return (
    <div className={style.maintainance}>
      <div className="content-title">{datas.consumables}</div>

      <div>
        <span>{datas.consumables}1：</span>
        <input type="text" />
      </div>
      <div>
        <span>{datas.remaininglength}：</span>
        <input type="text" />
        {datas.meter}
      </div>
      <div>
        <span>{datas.updatedate}：</span>
        <span>2024/03/14</span>
      </div>

      <div>
        <span>{datas.consumables}2：</span>
        <input type="text" />
      </div>
      <div>
        <span>{datas.remainingcapacity}：</span>
        <input type="text" />
        {datas.liter}
      </div>
      <div>
        <span>{datas.updatedate}：</span>
        <span>2024/03/14</span>
      </div>
    </div>
  )
}
