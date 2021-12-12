import React from "react";
import { useDrop } from "react-dnd";

export const DroppableBox = ({
  color,
  isFull,
  size,
  addObstruction,
  i,
  children,
}) => {
  const [, drop] = useDrop(
    () => ({
      accept: "BLOCK_DIV",
      drop: () => {
        console.log(i);
        addObstruction(i);
      },
      canDrop: (item, monitor) => {
        return !isFull;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [i, isFull]
  );
  return (
    <div
      ref={drop}
      key={i}
      style={{
        background: isFull ? "black" : color,
        height: size + "px",
        width: size + "px",
        border: "1px solid black",
      }}
    >
      {children}
    </div>
  );
};
