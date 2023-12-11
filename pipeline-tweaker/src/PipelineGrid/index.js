import React, {Component, useState } from "react";
import {DraggableStep} from '../DraggableStep';

window.pipeline = [];
export class PipelineGrid extends Component {
    constructor(props) {
        super(props);
        let pipeline = props.data.pipeline;
        let primitiveType = props.data.primitive_types;
        let score = props.data.score;
        
        let steps;
        if (props.data.pipeline["steps"]) {
            steps = props.data.pipeline.steps;
        }
        
        let typeList = this.reformatPrimitiveTypes(props.data.primitive_types);
        
        SetPipeline(steps);

        this.state = {
            pipeline,
            primitiveType,
            score,
            steps,
            typeList,
        };
    };

    reformatPrimitiveTypes = (primitiveType)=> {
        const typeList = {};
        for (const key in primitiveType) {
            let values = primitiveType[key];
            for (const i in values) {
                if (!typeList.hasOwnProperty(values[i])) {
                    typeList[values[i]] = key;
                }
            }
        }
        return typeList;
    }

    generateDraggable = (i)=> {
        let step = this.state.steps[i];
        let stepName = this.state.typeList[step.name];
        let primitives = this.state.primitiveType[stepName];
        let params = step.params;

        let draggableConfig = {
            step_idx: i,
            step: step,
            stepName: stepName,
            primitives: primitives,
            params: params,
            score: 0,
        }
        return (<DraggableStep data={draggableConfig}/>);
    }

    generateInput = ()=> {
        let stepName = "INPUT";
        let draggableConfig = {
            step_idx: -1,
            step: {},
            stepName: stepName,
            primitives: {},
            params: {},
            score: this.state.score,
        }
        return (<DraggableStep data={draggableConfig}/>);
    }

    generateOutput = ()=> {
        let stepName = "OUTPUT";
        let draggableConfig = {
            step_idx: 999,
            step: {},
            stepName: stepName,
            primitives: {},
            params: {},
            score: this.state.score,
        }
        return (<DraggableStep data={draggableConfig}/>);
    }


    render() {
        const pipelineId = this.state.pipeline.pipeline_id;
        let stepList = [];
        

        // 1. Generate Input
        stepList.push(this.generateInput());

        // 2. Generate Steplist
        for (let i = 0; i < this.state.steps.length; i++) {
            stepList.push(this.generateDraggable(i));
        }


        // 3. Generate Output
        stepList.push(this.generateOutput());

        return(
            <div className="pipeline-grid">
                <p>{pipelineId}</p>
                {stepList}
            </div>
        );
    }

}


function SetPipeline(steps) {
    let tempPipeline = [];
    for (let i = 0; i < steps.length; i++) {
        tempPipeline.push({
            name: steps[i].name,
        })
    }
    window.pipeline = tempPipeline;
}