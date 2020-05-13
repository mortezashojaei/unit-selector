import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../ItemTypes";

const Item = ({ name , onSelect }) => {
    const style = {
        cursor: 'pointer'
      }
      const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.BOX },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            onSelect()
          }
        },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      })
      const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};

export default Item
