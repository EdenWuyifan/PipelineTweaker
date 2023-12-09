import logging
from io import StringIO

import pandas as pd
from alpha_automl import AutoMLClassifier, AutoMLRegressor

logger = logging.getLogger(__name__)


def new_classification_task(csv):
    csvStringIO = StringIO(csv)
    train_dataset = pd.read_csv(csvStringIO, sep=",")
    target_column = "class"

    X_train = train_dataset.drop(columns=[target_column])
    y_train = train_dataset[[target_column]]

    logger.info(f"task start! {train_dataset.columns}")
    try:
        automl = AutoMLClassifier(time_bound=1, verbose=logging.DEBUG)
        logger.info(f"alpha_automl: {automl}")
        automl.fit(X_train, y_train)
    except Exception as e:
        logger.info(f"alpha_automl: {e}")
    
    logger.info(f"task end! {automl.pipelines['Pipeline #1']}")
    
    return automl.pipelines["Pipeline #1"]