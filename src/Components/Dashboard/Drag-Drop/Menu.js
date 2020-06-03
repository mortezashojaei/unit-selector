import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../ItemTypes";

const Menu = (props) => {
  const [drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  // const isActive = canDrop && isOver;

  return <div ref={drop}>{props.children}</div>;
};

export default Menu;
