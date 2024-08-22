import React, { useState } from 'react'
import style from '../equitment-set.module.scss'
import { useSelector } from 'react-redux'
import OrangeButton from '@/component/button/orange-button'
import Search from '@/component/nosharable/list/model/search'
import WhiteButton from '@/component/button/white-button'

export default function ConsumablesList() {
  const { datas } = useSelector((state) => state.public)

  const [active, setActive] = useState(1)
  const [list, setList] = useState([
    { id: 1, name: '氬辜色拉眲' },
    { id: 2, name: '氬辜色' },
    { id: 3, name: '氬辜色辜色' },
    { id: 4, name: '氬氬氬氬色' },
  ])
  return (
    <div className={style.maintainance_list}>
      <div className={style.list}>
        <div className={style.function}>
          <Search />
          <WhiteButton text={datas.delete} icon="icon-delete" />
        </div>
        <div className={style.item}>
          {list.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActive(item.id)
              }}
              className={item.id === active ? style.active : ''}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="nextbtn">
        <OrangeButton text={datas.confirm} icon="icon-ok" />
      </div>
    </div>
  )
}
