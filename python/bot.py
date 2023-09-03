from bardapi import Bard
import os
import time

os.environ["_BARD_API_KEY"] = "agjasxUdbOfroZzU9W3Nv8czdGlNZK4LNuVm1xMv58s3gNs73Aw_LvW7ljqs7ZkO_Kkc9g."

def get_user_prompt(prompt):
    ans = Bard().get_answer(prompt)["content"]
    return ans

while True:
    user_input = input()
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
        response = "Innappropriate question"
    print(response)