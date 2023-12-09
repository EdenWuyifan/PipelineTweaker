import time

from flask import Flask, request
from flask_cors import CORS

from _alpha_automl import new_classification_task

app = Flask(__name__)

task_result = {
    "pipeline": None,
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
        task_result["pipeline"] = new_classification_task(csv)
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)