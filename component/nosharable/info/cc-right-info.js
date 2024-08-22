import React from 'react'
import style from './info.module.scss'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Connect from '@/component/connect'

export default function CCRight() {
  const router = useRouter()
  const { datas } = useSelector((state) => state.public)
  const { data } = useSelector((state) => state.log)
  const handleRouterPush = () => {
    router.push(`/processing/abnormal-log/${router.query.id}/`)
  }
  return (
    <div className={style.l_right_info}>
      <div className={style.col_right_info_connect}>
        <h3 className="content-title">{datas.connectionstatus}</h3>
        <div>
          <h6>
            {datas.processingequipment}-{datas.connectionstatus}
          </h6>
          <Connect icon="icon-weld" />
        </div>
        <div>
          <h6>
            {datas.visioncamera}-{datas.connectionstatus}
          </h6>
          <Connect icon="icon-camera" />
        </div>
        <div>
          <h6>
            {datas.roboticarm}-{datas.connectionstatus}
          </h6>
          <Connect icon="icon-robot" />
        </div>
      </div>
      <div className={style.col_right_info_abs}>
        <h3 className="content-title">{datas.abnormalsignalrecord}</h3>
        <div className={style.right_info_abs_title}>
          {data[0]?.space}
          {datas.machine}
          <button onClick={handleRouterPush}>
            <i className="icon-next"></i>
          </button>
        </div>
        <div className={style.abnormal}>
          {data.slice(0, 8).map((item, i) => (
            <div key={i}>
              <span>{i + 1}.</span>
              <div>{item.date}</div>
              <div>
                {datas.abnormalcode}:{item.code}
              </div>
              <div>[{item.name}]</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
