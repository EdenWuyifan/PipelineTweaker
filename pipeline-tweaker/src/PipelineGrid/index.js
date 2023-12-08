import React, {Component} from "react";
import {DraggableStep} from '../DraggableStep';

export class PipelineGrid extends Component {
    constructor(props) {
        super(props);
        
        let pipeline = props.data.pipeline;
        let primitiveType = props.data.primitive_types;

        let steps = props.data.pipeline.steps;
        let typeList = this.reformatPrimitiveTypes(props.data.primitive_types);

        this.state = {
            pipeline,
            primitiveType,
            steps,
            typeList,
        };
    };

    reformatPrimitiveTypes = (primitiveType)=> {
        const typeList = {};
        for (const key in primitiveType) {
            let value = primitiveType[key];
            if (!typeList.hasOwnProperty(value)) {
                typeList[value] = [];
            }
            typeList[value].push(key);
        }
        return typeList;
    }

    generateDraggable = (i)=> {
        let step = this.state.steps[i];
        let stepName = this.state.primitiveType[step.primitive.python_path];
        let primitives = this.state.typeList[stepName];

        const draggableConfig = {
            step: step,
            stepName: stepName,
            primitives: primitives,
        }
        return (<DraggableStep data={draggableConfig}/>);
    }


    render() {
        const pipelineId = this.state.pipeline.pipeline_id;
        let stepList = [];
        
        for (let i = 0; i < this.state.steps.length; i++) {
            stepList.push(this.generateDraggable(i));
        }
        return(
            <div className="pipeline-grid">
                <p>{pipelineId}</p>
                {stepList}
            </div>
        );
    }

}