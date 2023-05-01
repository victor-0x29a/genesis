
import pyautogui 
import os
import time 
import cv2

# opencv-python
# pillow
channels = ["channel1.png","channel2.png","channel3.png","channel4.png","channel5.png"]
def delay(type):
    if type == "s":
        time.sleep(1)
    elif type == "m":
        time.sleep(2.5)
    elif type == "g":
        time.sleep(4.5)

def getChannels():
    for ch in channels:
        pyautogui.moveTo(216,301,2)
        delay("s")
        pyautogui.scroll(-100)
        delay("s")
        canal = pyautogui.locateOnScreen("imgs/"+ch, grayscale=False, confidence=0.8)
        if canal:
            pyautogui.rightClick(canal)
            delay("s")
            pyautogui.click("imgs/config01.png")
            delay("s")
            pyautogui.click("imgs/config02.png")
            delay("s")
            pyautogui.click("imgs/config03.png")
            delay("s")
            pyautogui.moveTo(673,427,1)
            delay("s")
            pyautogui.scroll(-600)
            delay("s")
            pyautogui.click("imgs/config04.png")
            
            delay("s")
            pyautogui.click("imgs/config05.png")
            delay("s")
            pyautogui.press("esc")
            channels.remove(ch)
            continue
        else:
            try:
                canal = pyautogui.locateOnScreen("imgs/"+ch, grayscale=False, confidence=0.4)
                if canal:
                    pyautogui.rightClick(canal)
                    delay("s")
                    pyautogui.click("imgs/config01.png")
                    delay("s")
                    pyautogui.click("imgs/config02.png")
                    delay("s")
                    pyautogui.click("imgs/config03.png")
                    delay("s")
                    pyautogui.moveTo(673,427,1)
                    delay("s")
                    pyautogui.scroll(-600)
                    delay("s")
                    pyautogui.click("imgs/config04.png")
                    
                    delay("s")
                    pyautogui.click("imgs/config05.png")
                    delay("s")
                    pyautogui.press("esc")
                    channels.remove(ch)
                    continue
                else:
                    channels.remove(ch)
                    continue
            except:
                channels.remove(ch)
                continue

class searchDiscord:
    screen = False

    path = False

    def __init__(self, isOnScreen):
        searchDiscord.screen = isOnScreen

    def check():
        return searchDiscord.screen

    def addPathDiscord(path):
        searchDiscord.path = path

    def getPathDiscord():
        if searchDiscord.path:
            return searchDiscord.path
        else:
            return False


if __name__ == '__main__':
    #C:\Users\victor\AppData\Local\Discord\app-1.0.9006

    while(searchDiscord.screen == False):
        addDc = str(input("Diretorio do seu discord\n--> "))
        if len(addDc) > 5:
            searchDiscord.addPathDiscord(addDc)
            dcPath = searchDiscord.getPathDiscord()
            if dcPath:
                try:
                    pyautogui.keyDown("win")
                    pyautogui.press("r")
                    pyautogui.keyUp("win")
                    delay("s")
                    pyautogui.write(dcPath+"\discord.exe")
                    pyautogui.press("enter")
                    delay("m")
                    searchDiscord(True)
                except:
                    print("Discord not found. 3")
            else:
                print("Path inválido. 2")
                break
        else:
            print("Path inválido. 1")
            break

    onImg = False

    while(onImg == False):
        logoDc = pyautogui.locateOnScreen("imgs/discord-pt2.png", grayscale=True, confidence=0.9)
        if logoDc:
            pyautogui.click(logoDc)
            onImg = True
        else:
            print("Ajuste sua tela! 1")
            break
    if onImg:
        pyautogui.moveTo(216,301,2)
        pyautogui.scroll(1540) # Move tudo pra cima
        delay("s")
        pyautogui.scroll(-800)
        delay("s")
        getChannels()





