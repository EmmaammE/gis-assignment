import React from "react";
import './menu.scss';

interface MenuProps {
  setFit: Function,
}

function Menu({setFit}: MenuProps) {

  const clickFitBtn = () => {
    setFit(true)
  }

  return (
    <div className="menu-wrapper">
      <div className="pos-btn" onClick={clickFitBtn}></div>
    </div>
  )
}

export default Menu;