import uvicorn
from main import textValid
from fastapi import FastAPI, Body

HOST = 'localhost'
PORT = 9999

app = FastAPI()

@app.post("/server")
def f_get(text: str = Body(..., embed=True)):
    data = textValid(text)
    return data

if __name__ == "__main__":

    uvicorn.run(app, host=HOST, port=PORT)