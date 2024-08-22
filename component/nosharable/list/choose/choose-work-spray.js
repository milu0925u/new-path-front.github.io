import React from 'react'
import style from '../list.module.scss'
import { useSelector } from 'react-redux'
import OrangeButton from '@/component/button/orange-button'
export default function ChooseWorkSpray({ handleOrangeBTN }) {
  const { datas } = useSelector((state) => state.public)
  const { current } = useSelector((state) => state.workList)
  return (
    <div className={style.chosen_list}>
      <div>
        {current ? (
          <>
            <div className={style.chosen_weld_img}>
              <img alt="spray" src="/images/work/spray.svg" />
              <span>{`${datas.spraypaintingprocessing}`}</span>
            </div>
            <div>
              <h6>{datas.processingconfigurationname}</h6>
              <span>{current?.name}</span>
            </div>
            <div>
              <div>
                {datas.adhesiveapplicationprocessfrontandbackdepthadjustment}：
              </div>
              <div>{datas.adjustingsprayflowrate}</div>
              <div></div>
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
