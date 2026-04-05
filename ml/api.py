from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("model/model.pkl")

class BatchInput(BaseModel):
    features: list  # list of lists

@app.post("/predict-batch")
def predict_batch(data: BatchInput):
    features = np.array(data.features)
    scores = model.predict_proba(features)[:, 1]
    return {"scores": scores.tolist()}