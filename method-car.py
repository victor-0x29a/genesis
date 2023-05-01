
veiculo = 0


class Bmw:
    def __init__(self, modelo, cavalaria, tracao):
        self.modelo = modelo 
        self.cavalaria = 800
        self.tracao = tracao
        self.ignicao = 0
    
    def ligar(self):
        self.ignicao = 1 
        print("O veiculo ligou.")

    def desligar(self):
        if self.ignicao > 0:
            self.ignicao = 0 
            print("O veiculo desligou")
        else:
            print("Veiculo ja esta desligado")
            pass

while True:
    modeloBm = str(input("Digite o Modelo de sua bmw\n-->"))
    
    if len(modeloBm) > 2:
        horseBm = int(input("Digite a cavalaria de sua BMW\n-->"))
        if len(str(horseBm)) > 1:
            tracaoBm = str(input("Digite a tracao do veiculo\n-->"))
            if len(tracaoBm) > 2:
                veiculo = Bmw(modeloBm, horseBm, tracaoBm)
                break
            else:
                print("Digite uma tracao acima de 2 caracteres!")
        else:
            print("Digite uma cavalaria acima de 2 caracteres!")
    else:
        print("Digite um modelo valido!")


veiculo.desligar()

