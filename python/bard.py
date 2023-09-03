from fastapi import FastAPI, Query
from dotenv import load_dotenv
from bardapi import Bard
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, status
import os

load_dotenv()

os.environ["_BARD_API_KEY"] = os.getenv("BARD_KEY")

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_origin_regex="https:\/\/.*\.uffizzi\.com",
    allow_methods=["GET", "POST", "PUT", "DELETE", "UPDATE", "OPTIONS"],
    allow_headers=["*"],
)


def get_user_prompt(prompt):
    ans = Bard().get_answer(prompt)["content"]
    return ans

@app.get("/")
def index():
    return {"Welcome To My ChatBot"}

@app.get("/ask", status_code=status.HTTP_200_OK)
def ask_question(user_input: str = Query(...)):
    prompt = f"""
    Give an answer to the prompt below like you're speaking
    to a high school student. Your job is to explain your answers like 
    you're speaking to a 15 year old.
    The text is shared in the lines below:
    {user_input}
    """
    try:
        response = get_user_prompt(prompt)
    except:
        raise HTTPException(status_code=403, detail="Inappropriate Question")
    
    return {"response": response}
