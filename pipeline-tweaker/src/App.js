import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { PipelineGrid } from './PipelineGrid';
import { isEqual } from "lodash";

function App() {
  const [data, setData] = useState({
    "pipeline": {
      "steps": [],
    },
    "primitive_types": {},
    "score": 0,
  })
  const [gridKey, setGridKey] = useState(false);

  const toggleGridKey = () => {
        setGridKey(!gridKey);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/members").then(
        res => res.json()
      ).then(
        newData => {
          if (!isEqual(newData, data)) {
            console.log(newData)
            console.log(data)
            setData(newData)
          }
        }
      )
    }, 5000);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    toggleGridKey();
  }, [data]);
  
  return (
    <div className="App">
      <div id="pipeline-grid">
        < PipelineGrid key={gridKey} data={data} />
      </div>
    </div>
  );
}

export default App;
