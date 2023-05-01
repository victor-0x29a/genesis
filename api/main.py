import os
from flask import Flask 
from flask import json
from flask import request
from flask_cors import CORS
import pyautogui
global infoServer


app = Flask(__name__)

CORS(app)

infoServer = {
        'Api Name': "Interaction PC",
        'Version': "1.0"
}




app.config["DEBUG"] = True
@app.route("/", methods=['GET', 'POST'])
def main():
    return json.dumps(infoServer)



@app.route("/move", methods=["POST"])
def moveMouse():
    body_data = request.get_json()

    direcao = body_data["to"]
    if direcao == "cima":
        pos = pyautogui.position()
        pyautogui.moveTo(pos[0], pos[1]-20)
    if direcao == "baixo":
            pos = pyautogui.position()
            pyautogui.moveTo(pos[0], pos[1]+20)
    if direcao == "esquerda":
            pos = pyautogui.position()
            pyautogui.moveTo(pos[0]-20, pos[1])
    if direcao == "direita":
            pos = pyautogui.position()
            pyautogui.moveTo(pos[0]+20, pos[1])
        
    return "Ok"
@app.route("/click", methods=["POST"])
def clickIn():
    data_response = request.get_json()

    mouse = data_response["to"]

    if mouse == "left":
        pyautogui.leftClick()
    if mouse == "right":
        pyautogui.rightClick()
    
    return "Ok"

if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)

