import React, { useState } from "react";
import Button from "../buttons/button";
import './menu.scss';

interface MenuProps {
  setFit: Function,
  status: boolean,
  setStatus: any,
}

function Menu({setFit, status, setStatus}: MenuProps) {
  const clickFitBtn = () => {
    setFit(true)
  }

  const toggleMap = () => {
    setStatus(!status);
  }

  return (
    <div className="menu-wrapper">
      <div className="pos-btn" onClick={clickFitBtn}></div>
      <div className="btn-container">
        <Button title="高德地图" status={status} onClick={toggleMap} />
        <Button title="Mapbox" status={!status} onClick={toggleMap} />
      </div>
    </div>
  )
}

export default Menu;