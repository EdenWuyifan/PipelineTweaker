import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { PipelineGrid } from './PipelineGrid';
import {DraggableStep} from './DraggableStep';
import testJson from './test_pipeline_meta.json';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/members").then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
    }, 30000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="App">
      < PipelineGrid data={testJson} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;
