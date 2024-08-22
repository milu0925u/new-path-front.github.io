import React from 'react'
import style from '../list.module.scss'
import { useSelector } from 'react-redux'
import OrangeButton from '@/component/button/orange-button'
export default function ChooseWorkDebur({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public)
  const { data, current } = useSelector((state) => state.workList)
  return (
    <div className={style.chosen_list}>
      <div>
        {' '}
        {current ? (
          <>
            <div className={style.chosen_weld_img}>
              <img alt="debur" src="/images/work/debur.svg" />
              <span>去毛邊加工</span>
            </div>
            <div>
              <h6>{datas.processingconfigurationname}</h6>
              <span>{current?.name}</span>
            </div>
            <div>
              <div>{`${datas.deburringprocessverticaldepthadjustment}`}</div>
              <div>{`${datas.deburringprocessinwardandoutwarddepthadjustment}`}</div>
              <div>{`${datas.deburringprocessrotationspeedadjustment}`}</div>
            </div>
            <div>
              <div>{datas.roboticarmspeedsetting}</div>
            </div>
          </>
        ) : (
          <div className={style.empty_chosen}>{datas.emptychosen}</div>
        )}
      </div>
      <div className="nextbtn">
        <OrangeButton
          text={datas.executeprocessing}
          icon="icon-execute-work"
          handleOrangeBTN={handleOrangeBTN}
        />
      </div>
    </div>
  )
}
