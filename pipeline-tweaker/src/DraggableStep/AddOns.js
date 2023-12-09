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
    const [data, setDate] = useState();
    const fileReader = new FileReader();
    
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;

                let formData = new FormData();
                formData.append("type", "csv_input");
                formData.append("csv", csvOutput);

                axios.post("/newtask", formData, customHeader).then((response) => {
                    console.log(response.status, response.data.token);
                });
            };
            fileReader.readAsText(file);
        }
    };
    
    return (
        <form style={{ textAlign: "center" }}>
            <input type={"file"} accept={".csv"} onChange={handleOnChange} />
            <button onClick={(e) => {handleOnSubmit(e);}} >IMPORT CSV</button>
        </form>
    );
}