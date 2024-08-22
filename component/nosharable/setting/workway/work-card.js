import React from 'react'
import style from './work-card.module.scss'
export default function WorkCard({ item, clickItem, handleClickItem }) {
  return (
    <button
      value={item.id}
      onClick={(e) => {
        handleClickItem(e)
      }}
      className={style.card}
    >
      <div>
        <img src={`/images/work/${item.image}.svg`} />
      </div>
      <div className={style.bar}>
        {clickItem == item.id ? <div className={style.mouse}></div> : ''}
      </div>
      <div>{item.name}</div>
    </button>
  )
}
