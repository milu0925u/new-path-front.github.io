import React from 'react'
import style from './info.module.scss'
import { useSelector } from 'react-redux'

export default function AbnormalcontentTitle() {
  const { datas } = useSelector((state) => state.public)
  const { data } = useSelector((state) => state.centralControl)

  let color
  if (data[0]?.state == '斷線') {
    color = style.disconnected
  } else if (data[0]?.state == '故障') {
    color = style.fault
  } else if (data[0]?.state == '換耗材') {
    color = style.consumables
  } else if (data[0]?.state == '維修') {
    color = style.repairs
  } else if (data[0]?.state == '保養') {
    color = style.maintainance
  } else if (data[0]?.state == '換線') {
    color = style.changeline
  } else if (data[0]?.state == '調機') {
    color = style.adjustthemachine
  } else if (data[0]?.state == '下料') {
    color = style.blanking
  } else if (data[0]?.state == '完成') {
    color = style.finish
  } else if (data[0]?.state == '停止') {
    color = style.stop
  } else if (data[0]?.state == '暫停') {
    color = style.pause
  } else if (data[0]?.state == '加工') {
    color = style.process
  } else if (data[0]?.state == '空跑') {
    color = style.dryrun
  } else if (data[0]?.state == '上料') {
    color = style.feeding
  } else if (data[0]?.state == '待料') {
    color = style.awaitingmaterials
  }

  return (
    <>
      <div className={style.l_ab_title}>
        <div className={style.l_ab_state_none}>
          <img src={`/images/work/${data[0]?.method}.svg`} />
          <span>{data[0]?.work}</span>
        </div>
        <div className={style.l_ab_state_visible}>
          {datas.abnormalsignalrecordlog}
        </div>
        <div>
          {data[0]?.space}
          {datas.regionalmachine}
          <span className={style.l_ab_state_none}>
            {data[0]?.state === '停止' ||
            data[0]?.state === '暫停' ||
            data[0]?.state === '斷線' ||
            data[0]?.state === '故障'
              ? datas.haspaused
              : datas.isbeingexecuted}
          </span>
        </div>

        <div className={style.l_ab_state_none}>
          {`${datas.processingstatus}`}:
          <span className={`${style.state} ${color}`}>{data[0]?.state}</span>
        </div>
      </div>
    </>
  )
}
