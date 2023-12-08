import React, {Component} from "react";
import Draggable from 'react-draggable';
import "./draggableStep.css";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {AddOns} from "./AddOns";

export class DraggableStep extends Component {
    constructor(props) {
        super(props);
        let step = props.data.step;
        let stepName = props.data.stepName;
        let primitives = props.data.primitives;
        let currPrimitive = step.primitive.python_path;

        this.state = {
            step,
            stepName,
            primitives,
            currPrimitive,
        };
    };

    handlePrimitive = (option)=> {
        const currPrimitive = option.value;
        this.setState({currPrimitive});
    }

    generateAddOns = ()=> {
        let primitiveType = this.state.stepName;
        let addOnConfig;
        switch (primitiveType) {
        case "Feature Scaler":
            addOnConfig = {
                showScore: true,
                showColumnIndex: true,
                showGraph: false,
                score: 0.5,
                columnIndex: 1
            }
            break;
        default:
            addOnConfig = {
                showScore: false,
                showColumnIndex: false,
                showGraph: false,
            }
        }
        return (
            <AddOns {...addOnConfig}/>
        )
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
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const dropdownOption = this.createDropDownOption(this.state.primitives);
        return (
            <Draggable handle="strong" {...dragHandlers}>
            <div className="box no-cursor">
                <strong className="cursor"><div>{this.state.stepName}</div></strong>
                <form>
                    <Dropdown 
                        options={dropdownOption} 
                        onChange={this.handlePrimitive} 
                        value={this.state.currPrimitive}
                        placeholder="Select an option"
                    />
                </form>
                {this.generateAddOns()}
            </div>
            </Draggable>
        );
    }
}