import React from "react";
import { useDrag } from "react-dnd";
export const DraggableBox = ({ size, i, addObstruction }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK_DIV",
    // end: () => addObstruction(i),

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      //   key={i}
      className="m-px"
      style={{
        background: "black",
        height: size + "px",
        width: size + "px",
        border: "1px solid black",
      }}
    ></div>
  );
};
