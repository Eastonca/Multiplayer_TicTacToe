import React from 'react'

function Sqaure({ chooseSquare, val }) {
  return (
    <div className="square" onClick={chooseSquare}>
        {val}
    </div>
  )
}

export default Sqaure