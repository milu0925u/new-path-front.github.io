import React from 'react'
import style from '@/component/nosharable/list/model/search.module.scss'
import CancleX from '@/component/nosharable/list/model/cancleX'
import { useSelector } from 'react-redux'
export default function WorkNameList({ setName }) {
  const { datas } = useSelector((state) => state.public)
  return (
    <div className={`${style.search} ${style.search_w50}`}>
      <div className={style.work_name}>
        <i className="icon-workname"></i>
      </div>
      <input
        type="text"
        placeholder={datas.enterprocessingconfigurationname}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
    </div>
  )
}
