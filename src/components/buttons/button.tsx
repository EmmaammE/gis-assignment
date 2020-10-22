import React from 'react';
import './button.scss';

interface ButtonProps {
  title: string,
  status: boolean,
  onClick: any
}

// true表示已经被点击过了
function Button({title, onClick, status = false}: ButtonProps) {
  return (
    <div className={["button", status?'clicked':''].join(' ')}
      onClick={onClick}
    >{title}</div>
  )
};

export default Button;