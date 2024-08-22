import React from 'react'
import style from './list-model-data.module.scss'
import { useSelector } from 'react-redux'
import Loading from '@/component/loading/loading'
export default function ListModelDataWork({
  datasList,
  currentid,
  handleChosenDelete,
  handleChoose,
}) {
  const { datas, loading } = useSelector((state) => state.public)

  if (loading) {
    return <Loading />
  }
  return (
    <div className={style.data}>
      {datasList?.map((item) => (
        <div
          key={item.id}
          data-id={item.id}
          className={`${style.grid_list} ${
            currentid == item.id ? style.bg_blue : style.bg_grey
          }`}
          onClick={(e) => {
            handleChoose(e)
          }}
        >
          <input
            type="checkbox"
            name="model"
            value={item.id}
            onChange={(e) => {
              handleChosenDelete(e)
            }}
          />
          <div>{item.name}</div>
          <div>{item.date}</div>
        </div>
      ))}
    </div>
  )
}
