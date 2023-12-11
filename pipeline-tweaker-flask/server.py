import time

from flask import Flask
from flask import request
from flask_cors import CORS

from _alpha_automl import new_classification_task
from _alpha_automl import rescore_previous_task
from _pipeline_preprocess import export_pipeline_json

app = Flask(__name__)

task_result = {
    "pipeline": {"steps": []},
    "primitive_types": {},
    "score": 0,
}


@app.route("/members")
def members():
    return task_result


@app.route("/newtask", methods=["POST"])
def newtask():
    # print(f'[!!!!!!!!!!!!!] {request.form["type"]}')
    # image_file = request.files.get('image', '')

    type = request.form["type"]
    if type == "csv_input":
        csv = request.form["csv"]
        task = request.form["task"]
        print(task)
        target_column = request.form["target_column"]
        
        if task == "classification":
            pipeline, score = new_classification_task(csv, target_column)
        elif task == "regression":
            # Not ready yet!
            return
        [
            task_result["pipeline"],
            task_result["primitive_types"],
        ] = export_pipeline_json(pipeline)
        task_result["score"] = score
        print(task_result)
    return "ok"


@app.route("/rescore", methods=["POST"])
def rescore():
    type = request.form["type"]
    if type == "rescore":
        pipeline_obj, new_score = rescore_previous_task(request.form.getlist("pipeline[]"))
        print(new_score)
        [
            task_result["pipeline"],
            task_result["primitive_types"],
        ] = export_pipeline_json(pipeline_obj)
        task_result["score"] = new_score

    return "ok"


if __name__ == "__main__":
    app.run(port=4455, debug=True, host='0.0.0.0')
