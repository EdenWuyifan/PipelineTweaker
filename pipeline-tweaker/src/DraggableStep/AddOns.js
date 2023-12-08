import React, {Component} from "react";

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