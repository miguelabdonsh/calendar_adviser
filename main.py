from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")

@app.get("/api")
def read_root():
    return {"message": "Welcome to FastAPI"}
