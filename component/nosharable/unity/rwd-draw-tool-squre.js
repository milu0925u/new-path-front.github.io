import React, { useCallback } from 'react'

export default function RwdDrawToolSqure({ sendMessage }) {
  const btnName = [
    { id: 1, name: 'square', img: 'pen-square', mode: 'DrawShape' },
    { id: 2, name: 'rec', img: 'pen-rec', mode: 'DrawShape' },
    { id: 3, name: 'circle', img: 'pen-circle', mode: 'DrawShape' },
    { id: 4, name: 'oval', img: 'pen-oval', mode: 'DrawShape' },
    { id: 5, name: 'polygon', img: 'pen-polygon', mode: 'DrawShape' },
  ]
  const handleClickAction = useCallback((event) => {
    const name = event.currentTarget.name
  }, [])

  return (
    <>
      {btnName.map((v) => (
        <button
          onClick={handleClickAction}
          name={v.name}
          className="rwd-draw-tool-btn"
        >
          <img src={`/images/unity/${v.img}.svg`} />
        </button>
      ))}
    </>
  )
}
