import React from 'react'
import style from '../equitment-set.module.scss'
import { useSelector } from 'react-redux'
import Connect from '@/component/connect'
export default function EqMaintainance() {
  const { datas } = useSelector((state) => state.public)

  return (
    <div className={style.maintainance}>
      <div className="content-title">{datas.processingequipment}</div>
      <div>
        <span>{datas.weldingequipment}：</span>
        <input type="text" />
      </div>
      <div>{datas.maintenanceremindersetting}：</div>
      <div>
        <span>{datas.maintenancefrequency}　</span>
        <input type="number" />
        {datas.day}
      </div>
      <div>
        <span>{datas.nextmaintenancedate}：</span>
        <span>2024/03/20</span>
      </div>
      <div className={style.connect}>
        <div>{datas.connectionstatus}：</div>
        <Connect icon="icon-weld" />
      </div>
    </div>
  )
}
