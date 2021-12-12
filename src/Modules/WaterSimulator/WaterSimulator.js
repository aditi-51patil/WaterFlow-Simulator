import React, { useState, useEffect, useCallback } from "react";
import { EnterInputs } from "../EnterInputs/EnterInputs";
import { GridComp } from "../GridComp/GridComp";
export const WaterSimulator = (props) => {
  const [step, setStep] = useState(0);
  const [rowVal, setRowVal] = useState(0);
  const [rowError, setRowError] = useState({ touched: false, error: "" });
  const [columnsVal, setColumnsVal] = useState(0);
  const [columnError, setColumnError] = useState({ touched: false, error: "" });
  const [obstructionVal, setObstructionVal] = useState(0);
  const [obstructionError, setObstructionError] = useState({
    touched: false,
    error: "",
  });
  const [isSubmitDone, setIsSubmitDone] = useState(false);
  const handleValidation = (source) => {
    if (rowVal == 0 && rowError.touched) {
      setRowError((prevState) => ({
        touched: source == "submit" ? true : prevState.touched,
        error: "Row is required",
      }));
    } else {
      setRowError((prevState) => ({
        touched: source == "submit" ? true : prevState.touched,
        error: "",
      }));
    }
    if (columnsVal == 0 && columnError.touched) {
      setColumnError((prevState) => ({
        touched: source == "submit" ? true : prevState.touched,
        error: "Columns is required",
      }));
    } else {
      setColumnError((prevState) => ({
        touched: source == "submit" ? true : prevState.touched,
        error: "",
      }));
    }
    if (obstructionVal == 0 && obstructionError.touched) {
      setObstructionError((prevState) => ({
        touched: source == "submit" ? true : prevState.touched,
        error: "Obstruction is required",
      }));
    } else {
      setObstructionError((prevState) => ({
        touched: source == "submit" ? true : prevState.touched,
        error: "",
      }));
    }
    if (rowVal > 0 && columnsVal > 0 && obstructionVal > 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (isSubmitDone) {
      handleValidation();
    }
  }, [isSubmitDone, rowVal, columnsVal, obstructionVal]);
  const rowsChange = (e) => {
    setRowVal(parseInt(e.target.value, 10));
    setRowError({
      touched: true,
      error: e.target.value == 0 ? "row is required" : "",
    });
    // handleValidation();
  };
  const columnsChange = (e) => {
    setColumnsVal(parseInt(e.target.value, 10));
    setColumnError({
      touched: true,
      error: e.target.value == 0 ? "columns is required" : "",
    });
  };
  const obstructionChange = (e) => {
    setObstructionVal(parseInt(e.target.value, 10));
    setObstructionError({
      touched: true,
      error: e.target.value == 0 ? "obstruction is required" : "",
    });
    // handleValidation();
  };
  const handleSubmit = (e) => {
    setIsSubmitDone(true);
    let success = handleValidation("submit");
    if (success) {
      setStep(1);
    }
    console.log(e);
  };
  const renderStep = useCallback(() => {
    if (step == 0) {
      return (
        <div>
          <EnterInputs
            rowError={rowError.error}
            rowsChange={rowsChange}
            rowVal={rowVal}
            handleSubmit={handleSubmit}
            columnsVal={columnsVal}
            columnsChange={columnsChange}
            columnError={columnError.error}
            obstructionVal={obstructionVal}
            obstructionChange={obstructionChange}
            obstructionError={obstructionError.error}
          />
        </div>
      );
    } else {
      return (
        <div>
          <GridComp
            rowCount={rowVal}
            columnsCount={columnsVal}
            obstructionCount={obstructionVal}
          />
        </div>
      );
    }
  }, [
    step,
    rowVal,
    rowError,
    columnsVal,
    columnError,
    obstructionVal,
    obstructionError,
  ]);
  return (
    <div>
      {renderStep()}
      {step == 1 && (
        <button
          onClick={() => {
            setStep(0);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  my-0.5 mx-0.5  rounded"
        >
          Previous
        </button>
      )}
    </div>
  );
};
