import React from "react";
export const EnterInputs = ({
  rowVal,
  rowsChange,
  handleSubmit,
  rowError,
  columnError,
  columnsVal,
  columnsChange,
  obstructionVal,
  obstructionChange,
  obstructionError,
}) => {
  return (
    <div style={{ width: "700px", padding: "100px" }}>
      <form
        onSubmit={(sub) => {
          sub.preventDefault();
          handleSubmit(sub);
        }}
      >
        <div>
          <label htmlFor="row">
            <h5 class="text-2xl font-normal leading-normal mt-0 mb-2 ">
              Number of rows(1-10): {rowVal}
            </h5>
          </label>
          <input
            type="range"
            value={rowVal}
            onChange={rowsChange}
            id="row"
            name="row"
            min="0"
            max="10"
          />
          <div style={{ color: "red" }}>{rowError}</div>
        </div>
        <div>
          <label htmlFor="column">
            <h5 class="text-2xl font-normal leading-normal mt-0 mb-2">
              Number of columns(1-10): {columnsVal}
            </h5>
          </label>
          <input
            type="range"
            value={columnsVal}
            onChange={columnsChange}
            id="column"
            name="column"
            min="0"
            max="10"
          />
          <div style={{ color: "red" }}>{columnError}</div>
        </div>
        <div>
          <label htmlFor="obstruction">
            <h5 class="text-2xl font-normal leading-normal mt-0 mb-2">
              Number of Obstructions(1-10): {obstructionVal}
            </h5>
          </label>
          <input
            type="range"
            value={obstructionVal}
            onChange={obstructionChange}
            id="obstruction"
            name="obstruction"
            min="0"
            max="10"
          />
          <div style={{ color: "red" }}>{obstructionError}</div>
        </div>
        <div>
          {/* <input type="submit" /> */}

          <button
            type="submit"
            // onClick={() => {
            //   setStep(1);
            // }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  my-0.5 mx-0.5 rounded"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
