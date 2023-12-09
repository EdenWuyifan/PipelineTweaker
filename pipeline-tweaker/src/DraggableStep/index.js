import React, {Component} from "react";
import Draggable from 'react-draggable';
import "./draggableStep.css";
import 'react-dropdown/style.css'
import {AddOns, DropDownSelect, UploadCsv} from "./AddOns";

export class DraggableStep extends Component {
    constructor(props) {
        super(props);
        let step_idx = props.data.step_idx;
        let step = props.data.step;
        let stepName = props.data.stepName;
        let primitives = props.data.primitives;
        let currPrimitive = step.name;

        this.state = {
            step_idx,
            step,
            stepName,
            primitives,
            currPrimitive,
        };
    };

    generateDropDownSelect = ()=> {
        let primitiveType = this.state.stepName;
        let dropdownConfig;
        switch (primitiveType) {
        case "INPUT":
            return (
                <UploadCsv />
            );
        case "OUTPUT":
            return;
        default:
            console.log("We are here!!");
            dropdownConfig = {
                idx: this.state.step_idx,
                primitives: this.state.primitives,
                currPrimitive: this.state.currPrimitive,
            }
            return (
                <DropDownSelect {...dropdownConfig}/>
            );
        }
    }

    generateAddOns = ()=> {
        let primitiveType = this.state.stepName;
        let addOnConfig;
        switch (primitiveType) {
        case "FEATURE_SCALER":
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

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return (
            <Draggable handle="strong" {...dragHandlers}>
            <div className="box no-cursor">
                <strong className="cursor"><div>{this.state.stepName}</div></strong>
                <form>
                    {this.generateDropDownSelect()}
                </form>
                {this.generateAddOns()}
            </div>
            </Draggable>
        );
    }
}