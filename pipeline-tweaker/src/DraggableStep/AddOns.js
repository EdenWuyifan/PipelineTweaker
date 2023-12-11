import React, {Component, useState} from "react";
import Dropdown from 'react-dropdown';
import axios from "axios";

export class AddOns extends Component {
    constructor(props) {
        super(props);
        let showScore = props.showScore;
        let showColumnIndex = props.showColumnIndex;
        let showGraph = props.showGraph;
        let score = props.score;
        let columnIndex = props.columnIndex;

        this.state = {
            // Score
            showScore,
            score,

            // Column Transformer
            showColumnIndex,
            columnIndex,

            // Graph [TBD]
            showGraph,
        };
    };

    render() {
        return (
            <div className="add-ons">
                {this.state.showScore &&
                    <p>Importance: {this.state.score}</p>
                }
                {this.state.showColumnIndex &&
                    <p>Importance: {this.state.columnIndex}</p>
                }
            </div>
        ); 
    }
}

export class DropDownSelect extends Component {
    constructor(props) {
        super(props);
        let idx = props.idx;
        let primitives = props.primitives;
        let currPrimitive = props.currPrimitive;

        this.state = {
            idx,
            primitives,
            currPrimitive,
        };
    };

    handlePrimitive = (option)=> {
        const currPrimitive = option.value;
        this.setState({currPrimitive});
        window.pipeline[this.state.idx].name = currPrimitive;
        console.log(window.pipeline);
    }
    
    createDropDownOption = (primitives)=> {
        let options = [];
        for (let item of primitives) {
            let splits = item.split(".");

            let pair = {
                value: item,
                label: splits[splits.length-1],
            }
            options.push(pair);
        }
        return options;
    }
    
    render() {
        const dropdownOption = this.createDropDownOption(this.state.primitives);

        return (
            <Dropdown 
                options={dropdownOption} 
                onChange={this.handlePrimitive} 
                value={this.state.currPrimitive}
                placeholder="Select an option"
            />
        );
    }
}


export function UploadCsv() {
    const customHeader = {
        headers: {
            // Authorization: `Bearer ${getLocalStorageToken()}`,
            "Content-Type": 'multipart/form-data',
        },
    };
    
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const taskOptions = [
        'classification', 'regression',
    ];
    const defaultTaskOption = taskOptions[0];
    const [task, setTask] = useState(defaultTaskOption);
    const handleTask = (option)=> {
        setTask(option.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;

                let formData = new FormData();
                formData.append("type", "csv_input");
                formData.append("task", task);
                formData.append("csv", csvOutput);
                formData.append("target_column", e.target.form.targetColumn.value);
                axios.post("/newtask", formData, customHeader).then((response) => {
                    console.log(response.status, response.data.token);
                });
            };
            fileReader.readAsText(file);
        }


    };
    
    return (
        <form id="upload-csv" style={{ textAlign: "center" }}>
            <Dropdown options={taskOptions} onChange={handleTask} value={defaultTaskOption} placeholder="Select an option" />
            <br /><input type={"file"} accept={".csv"} onChange={handleOnChange} /> <br />
            <p>Target Column: <input type={"text"} name={"targetColumn"} value={"class"} /></p>
            <button onClick={(e) => {handleOnSubmit(e);}} >IMPORT CSV</button>
        </form>
    );
}

export function Output(score) {

    const customHeader = {
        headers: {
            // Authorization: `Bearer ${getLocalStorageToken()}`,
            "Content-Type": 'multipart/form-data',
        },
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        let newPipeline = window.pipeline;
        let formData = new FormData();
        formData.append("type", "rescore");
        newPipeline.forEach((item) => {
            formData.append('pipeline[]', item.name);
        });

        axios.post("/rescore", formData, customHeader).then((response) => {
            console.log(response.status, response.data.token);
        });
    };

    return (
        <div className="output">
            <p>Score: {score.score}</p>
            <form id="output" style={{ textAlign: "center" }}>
                <button onClick={(e) => {handleOnSubmit(e);}} >RECOMPUTE SCORE</button>
            </form>
        </div>
    );
}