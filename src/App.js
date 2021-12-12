import { WaterSimulator } from "./Modules/WaterSimulator/WaterSimulator.js";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App main_comp">
      <DndProvider backend={HTML5Backend}>
        <WaterSimulator />
      </DndProvider>
    </div>
  );
}

export default App;
