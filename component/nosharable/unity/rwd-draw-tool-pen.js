import React, { useCallback, useState } from 'react'

export default function RwdDrawToolPen({ sendMessage }) {
  // 選擇到的變色
  const [active, setActive] = useState('')
  const btnName = [
    { id: 1, name: 'pen', img: 'pen', mode: 'DrawFunc', param: 0 },
    {
      id: 2,
      name: 'continuous',
      img: 'pen-continuous',
      mode: 'DrawFunc',
      param: 1,
    },
    { id: 3, name: 'line', img: 'pen-line', mode: 'DrawShape', param: 0 },
    { id: 4, name: 'arc', img: 'pen-arc', mode: 'DrawShape', param: 6 },
    { id: 5, name: 'area', img: 'pen-area', mode: 'DrawFunc', param: 2 },
    { id: 6, name: 'pv', img: 'pen-area', mode: 'DrawFunc', param: 3 },
  ]
  const handleClickAction = useCallback((event) => {
    const name = event.currentTarget.name
    setActive(name)
    if (name === 'pen') {
    } else if (name === 'continuous') {
    } else if (name === 'line') {
    } else if (name === 'arc') {
    } else if (name === 'area') {
    } else if (name === 'pv') {
    }

    sendMessage(
      'CallBackManager',
      event.currentTarget.dataset.mode,
      Number(event.currentTarget.dataset.param),
    )
  }, [])

  return (
    <>
      {btnName.map((v) => (
        <button
          onClick={handleClickAction}
          name={v.name}
          data-mode={v.mode}
          data-param={v.param}
          className={`rwd-draw-tool-btn`}
        >
          <img src={`/images/unity/${v.img}.svg`} />
        </button>
      ))}
    </>
  )
}
