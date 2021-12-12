import { WaterSimulator } from "./Modules/WaterSimulator/WaterSimulator.js";
import "./App.css";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
function App() {
  return (
    <div className="App main_comp">
      <DndProvider options={HTML5toTouch}>
        {/* // backend={HTML5Backend}> */}
        <WaterSimulator />
      </DndProvider>
    </div>
  );
}

export default App;
