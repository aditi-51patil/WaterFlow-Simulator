import React, { useState, useCallback } from "react";
import { DraggableBox } from "../../Components/DraggableBox/DraggableBox";
import { DroppableBox } from "../../Components/DroppableBox/DroppableBox";

export const GridComp = ({ rowCount, columnsCount, obstructionCount }) => {
  const [obstructionList, setObstructionList] = useState([]);
  const [obsCount, setObsCount] = useState(obstructionCount);
  const [waterFlow, setWaterFlow] = useState([]);
  const [entryPrompt, setEntryPrompt] = useState("");
  const [entryPoint, setEntryPoint] = useState(null);
  const entrySelection = (i) => {
    if (entryPoint != null) {
      resetFlow();
      setObstructionList([]);
      setObsCount(obstructionCount);
    } else if (entryPrompt) {
      setEntryPoint(i);
      calculateSimulation(i);
    }
  };
  const calculateForward = (index) => {
    return !obstructionList.includes(index + columnsCount)
      ? index + columnsCount
      : null;
  };
  const calculateLeft = (index) => {
    return index - 1 >= 0 &&
      index % columnsCount != 0 &&
      !obstructionList.includes(index - 1)
      ? index - 1
      : null;
  };
  const calculateRight = (index) => {
    return (index + 1) % columnsCount != 0 &&
      !obstructionList.includes(index + 1)
      ? index + 1
      : null;
  };
  const calculateSimulation = useCallback(
    (entry) => {
      if (obstructionList.includes(entry)) {
        return;
      } else {
        const filledArray = [entry];
        let currentHeads = [entry];
        const visited = [];
        while (currentHeads.length) {
          const newHeads = [];
          const arr = [...new Set(currentHeads)]
            .filter((items) => !visited.includes(items))
            .sort((a, b) => a - b);
          console.log(visited);
          visited.push(...arr);
          console.log(visited);
          [...arr].every((item) => {
            let forward = calculateForward(item);
            if (forward != null) {
              if (forward <= rowCount * columnsCount - 1) {
                filledArray.push(forward);
                newHeads.push(forward);
              }
            } else {
              let left = calculateLeft(item);
              let right = calculateRight(item);
              if (left != null) {
                filledArray.push(left);
                newHeads.push(left);
              }
              if (right != null) {
                filledArray.push(right);
                newHeads.push(right);
              }
            }
            if (forward != null && forward > rowCount * columnsCount - 1) {
              return false;
            }
            return true;
          });

          currentHeads = newHeads;
        }
        setWaterFlow([...new Set(filledArray)]);
      }
    },
    [obstructionList, entryPoint]
  );
  const createEntryGrid = () => {
    const entryDiv = [];
    const size = 500 / columnsCount;
    for (let i = 0; i < columnsCount; i++) {
      entryDiv.push(
        <div
          onClick={() => entrySelection(i)}
          key={i}
          style={{
            background: entryPoint == i ? "blue" : "#cdcdff",
            height: size + "px",
            width: size + "px",
            border: "1px solid white",
            cursor: "pointer",
          }}
        ></div>
      );
    }
    return entryDiv;
  };
  const startSimulation = () => {
    setEntryPrompt(
      "Please Select an entry point by clicking on one of the  blue boxes"
    );
  };
  const createDraggableGrid = () => {
    const entryDiv = [];
    const size = 500 / columnsCount;
    for (let i = 0; i < obsCount; i++) {
      entryDiv.push(<DraggableBox size={size} i={i} />);
    }
    return entryDiv;
  };
  const addObstruction = (i) => {
    resetFlow();
    setObsCount((prev) => prev - 1);
    setObstructionList((prevState) => [...prevState, i]);
  };
  const resetFlow = () => {
    setWaterFlow([]);
    setEntryPoint(null);
    setEntryPrompt("");
  };
  const createMainGrid = useCallback(
    (rows, columns) => {
      const mainGrid = [];
      const size = 500 / columnsCount;
      for (let i = 0; i < rows * columns; i++) {
        // console.log(obstructionList);
        mainGrid.push(
          <DroppableBox
            size={size}
            isFull={obstructionList.includes(i)}
            addObstruction={addObstruction}
            i={i}
            color={waterFlow.includes(i) ? "blue" : "white"}
          >
            {obstructionList.includes(i) ? (
              <div
                key={i}
                className="m-px"
                style={{
                  background: "black",
                  height: "50px",
                  width: "50px",
                  border: "1px solid black",
                }}
              ></div>
            ) : null}
          </DroppableBox>
        );
      }
      return mainGrid;
    },
    [obstructionList, waterFlow]
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          width: "100vw",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {entryPrompt}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            className="my-0.5"
          >
            {createEntryGrid().map((item) => {
              return item;
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "500px",
              flexWrap: "wrap",
              border: "1px solid black",
              boxSizing: "content-box",
            }}
          >
            {createMainGrid(rowCount, columnsCount).map((item) => {
              return item;
            })}
          </div>
        </div>
        <div
          key="x-draggable"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "200px",
            background: "white",
            flexWrap: "wrap",
            // border: "1px solid black",
            boxSizing: "content-box",
            alignContent: "flex-start",
          }}
        >
          {createDraggableGrid().map((item) => {
            return item;
          })}
        </div>
      </div>
      <button
        onClick={startSimulation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  my-0.5 mx-0.5 rounded"
      >
        Start Simulation
      </button>
    </>
  );
};
