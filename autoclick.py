
from concurrent.futures import thread
import threading
import pyautogui as p 
import time
import keyboard as teclado
import sys


security = False

class clickMouse:
    def __init__(self, key):
        i = 0
        while i < 50:
            i+=1
            p.click()
        
            if teclado.is_pressed(key):
                break
        


            

def main(quantidadeThreads, key):
    funcoes = []
    for k in range(int(quantidadeThreads)):
        l = 0 
        l+=1
        funcoes.append("t"+str(l))
    for f in funcoes:
        f = threading.Thread(target=clickMouse, args=key)
        f.start()


def start():
    key = str(input("Key to enable autoclick\n-> "))
    keyOff = str(input("Key to disable autoclick\n-> "))
    number = int(input("Number of threads\n-> "))
    if len(key) >= 1 and len(keyOff) >= 1 and number >= 1:
        main(number, key)


    else:
        print("Autoclick Failed.")




if __name__ == '__main__':
    while True:

        ss = True
        if ss == False:
            ss = True
        while ss:
            if teclado.is_pressed("b"):
                main(5, "n")
                ss = False




    


