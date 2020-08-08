import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../ItemTypes";
import style from './Menu.module.scss'

const Menu = (props) => {
  const [collectedProps, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // const isActive = canDrop && isOver;

  return <div className={style.mainDiv} ref={drop}>{props.children}</div>;
};

export default Menu;
