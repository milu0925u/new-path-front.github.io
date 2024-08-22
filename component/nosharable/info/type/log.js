import React from 'react'
import style from '../info.module.scss'
import { useSelector } from 'react-redux'

export default function SmallTypeLog({ item }) {
  const { datas } = useSelector((state) => state.public)
  const { data } = useSelector((state) => state.log)

  const filteredData = data.filter((v) => v.space_id === item.id).slice(0, 2)
  return (
    <>
      {filteredData.map((v, i) => (
        <div className={`${style.log}`} key={i}>
          <span>{i + 1}.</span>
          <div>{v.date}</div>
          <div>
            {datas.abnormalcode}:{v.code}
          </div>
          <div>[{v.name}]</div>
        </div>
      ))}
    </>
  )
}
