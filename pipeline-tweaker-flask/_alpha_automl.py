import logging
from io import StringIO

import numpy as np
import pandas as pd
from sklearn.model_selection import cross_val_score
from alpha_automl import AutoMLClassifier, AutoMLRegressor
from alpha_automl.pipeline_synthesis.pipeline_builder import BaseBuilder
from alpha_automl.data_profiler import profile_data


logger = logging.getLogger(__name__)

automl = None
X_train = None
y_train = None


def new_classification_task(csv):
    csvStringIO = StringIO(csv)
    train_dataset = pd.read_csv(csvStringIO, sep=",")
    target_column = "class"

    global X_train, y_train, automl
    X_train = train_dataset.drop(columns=[target_column])
    y_train = train_dataset[[target_column]]

    logger.info(f"task start! {train_dataset.columns}")
    automl = AutoMLClassifier(time_bound=1, verbose=logging.WARNING)
    logger.info(f"alpha_automl: {automl}")
    automl.fit(X_train, y_train)

    logger.info(f"task end! {automl.pipelines['Pipeline #1'].get_pipeline()}")

    return (
        automl.pipelines["Pipeline #1"].get_pipeline(),
        automl.pipelines["Pipeline #1"].get_score(),
    )


def builder_make_pipeline(primitives):
    metadata = profile_data(X_train)
    builder = BaseBuilder(metadata, {"new_primitives": {}})
    return builder.make_pipeline(primitives)


def rescore_previous_task(pipeline):
    if X_train is None or y_train is None or automl is None:
        logger.critical("X_train, y_train or automl is None!")
        return 0

    logger.critical(pipeline)

    pipeline_obj = builder_make_pipeline(pipeline)

    pipeline_obj.fit(X_train, y_train)
    scores = cross_val_score(
        pipeline_obj,
        X_train,
        y_train,
        cv=automl.splitter,
        scoring=automl.scorer,
        error_score="raise",
    )
    score = np.average(scores)

    return score
