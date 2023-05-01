import time
from tkinter import font
from PySimpleGUI import PySimpleGUI as sg
import mysql.connector
import base64
import binascii
# py eu ja manjava
#        conn = mysql.connector.connect(host='192.168.100.28',database='itekilasystem',user='sistema',password='Info@1234')
#        cursor = conn.cursor()

font_titulos = ['Arial Black',20]
font_universal = ['Arial',15]
font_botao = ['Monospace',15]
font_info = ['Monospace',10]
cor_titulos = ['green']
cor_universal = ['gray']
cor_input = ['green']

def string_from_binary(binary): 
    return binascii.b2a_base64(binary, newline=False).decode('utf-8')
def string_to_binary(string): 
    return binascii.a2b_base64(string.encode('utf-8'))


def checkCaixa(registro):
    if registro == 'op1':
        return 'Caixa 1'
    if registro == 'op2':
        return 'Caixa 2'


def verificarEnquadramento(enquad):
    if enquad == 1:
        return 'Alimento'
    if enquad == 2:
        return 'Bebidas'
    if enquad == 3:
        return 'Legumes e Verduras'
    if enquad == 4:
        'Higiene'
    if enquad == 5:
        'Padaria'



sg.theme('DarkBrown4')
def janelaPrincipal():
    janelaLogin = [  
        [sg.Text('iTekila',font=font_titulos,justification='center',text_color=cor_titulos)],
        [sg.Text('Usuario',font=font_universal,text_color=cor_universal),sg.Input('',size=(25,1),font=font_universal,justification='center',key='userPanel')],
        [sg.Text('Senha  ',font=font_universal,text_color=cor_universal),sg.Input('',size=(25,1),font=font_universal,justification='center',password_char='*',key='userPanelpass')],
        [sg.Button('Entrar',font=font_botao),sg.Button('Sair',font=font_botao)]
    ]
    return sg.Window('iTekila',janelaLogin,finalize=True,size=(300,160),element_justification='center')

def janelaCentral():
    janelaMenu = [  
        [sg.Text("________ {} ________".format(valores['userPanel']),font=font_titulos)],
        [sg.Button('Avaria',font=font_botao)],
        [sg.Button('Troca',font=font_botao)],
        [sg.Button('Cadastro de Produtos',font=font_botao)],
        [sg.Button('Cadastro de Clientes',font=font_botao)],
        [sg.Text("_______________________________________________")]
    ]
    return sg.Window('iTekila Menu',janelaMenu,finalize=True,size=(400,280),element_justification='center')


def janelaCadpod():
    layout = [  
        [sg.Text('Nome',font=font_universal,text_color=cor_universal),sg.Input('',size=(35,1),key='nomepod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('EAN',font=font_universal,text_color=cor_universal),sg.Input('',size=(35,1),key='eanpod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Valor',font=font_universal,text_color=cor_universal),sg.Input('',size=(35,1),key='valorpod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Enquadramento',font=font_universal,text_color=cor_universal),sg.Input('',size=(35,1),key='enquadpod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Estoque',font=font_universal,text_color=cor_universal),sg.Input('',size=(35,1),key='estoqpod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Button('Cadastrar',font=font_botao),sg.Button('Consultar',font=font_botao),sg.Button('Voltar',font=font_botao)],
        [sg.Text('Atenção! para consultar, basta apenas digitar o EAN e apertar em Consultar!',font=font_info,text_color='green')]
    ]
    return sg.Window('iTekila Cadastro de Produtos',layout,finalize=True,size=(520,250),element_justification='center')

def janelaCadclient():
    layout  =   [   
        [sg.Text('Nome do Cliente',font=font_universal,text_color=cor_universal),sg.Input(key='clientName',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('CPF do Cliente',font=font_universal,text_color=cor_universal),sg.Input(key='clientCpf',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Email do cliente',font=font_universal,text_color=cor_universal),sg.Input(key='clientEmail',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Telefone do Cliente',font=font_universal,text_color=cor_universal),sg.Input(key='clientTelefone',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Bairro do Cliente',font=font_universal,text_color=cor_universal),sg.Input(key='clientBairro',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Endereço do Cliente',font=font_universal,text_color=cor_universal),sg.Input(key='clientEndereco',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Button('Cadastrar',font=font_botao),sg.Button('Ver Contas',font=font_botao),sg.Button('Ver todos os Clientes',font=font_botao),sg.Button('Remover Cliente',font=font_botao),
        [sg.Button('Voltar',font=font_botao)]],
        [sg.Button('Pagar mensalidade',font=font_botao)],
        [sg.Text('Atenção! para Pagar mensalidade, Remover cliente, basta apenas digitar o CPF.',font=font_info,text_color='green')]
    ]
    return sg.Window('iTekila Cadastro de Pessoas',layout, finalize=True, size=(740,340),element_justification='center')

def janelaAvaria():
    layout = [  
        [sg.Text('EAN',font=font_universal,text_color=cor_universal),sg.Input(key='eanPod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Text('Quantidade',font=font_universal,text_color=cor_universal),sg.Input(key='unPod',do_not_clear=False,text_color=cor_input,font=font_universal)],
        [sg.Button('Enviar',font=font_botao),sg.Button('Zerar',font=font_botao),sg.Button('Consultar',font=font_botao),sg.Button('Voltar',font=font_botao)],
        [sg.Button('Remover p/Un',font=font_botao)]
    ]
    return sg.Window('iTekila Avaria/Perda/Roubo',layout, finalize=True, size=(440,160),element_justification='center')


def janelaTroca():
    layout = [  
        [sg.Text('Em Breve =)',font=font_titulos)],
        [sg.Button('Voltar',font=font_botao)]
    ]
    return sg.Window("iTekila Troca",layout,finalize=True)






janela1, janela2, janela3, janela4, janela5, janela6 = janelaPrincipal(), None, None, None, None, None

while True:
    janela, eventos, valores = sg.read_all_windows()
    if eventos == sg.WIN_CLOSED or janela == janela1 and eventos == 'Sair':
        break
    if janela == janela1 and eventos == 'Entrar':
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor()
        query_One = "SELECT * FROM usuarios WHERE nome = '%s'" % (valores['userPanel'])
        cursor.execute(query_One)
        result_One = cursor.fetchall()
        verify_One = len(result_One)
        if verify_One < 1:
            time.sleep(2)
            sg.Popup('Usuário não encontrado.')
        else:
            for linha in result_One:
                administrador = linha[1]
                senha = linha[4]
                authlevel = linha[2]
                if senha == valores['userPanelpass']:
                    if authlevel == 2:
                        janela2 = janelaCentral()
                        janela1.hide()
                    else:
                        print(authlevel)
                        sg.Popup('Sem permissão!')
                else:
                    sg.Popup('Senha incorreta.')
    if janela == janela2 and eventos == 'Cadastro de Produtos':
        janela2.hide()
        janela3 = janelaCadpod()
    if janela == janela3 and eventos == 'Cadastrar':
        nomeProduto = valores['nomepod']
        eanProduto = valores['eanpod']
        valorProduto = valores['valorpod']
        enquadramentoProduto = valores['enquadpod']
        estoqueProduto = valores['estoqpod']

        #Conectando na db
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() #Cursor

        query = "INSERT INTO produtosCad(nome, ean, estoque, avaria, troca, enquadramento, valor) VALUES('%s', '%s', %s, %s, %s, '%s', '%s');" % (nomeProduto, eanProduto, estoqueProduto, 0, 0, enquadramentoProduto, valorProduto)

        queryVerify = "SELECT * FROM produtosCad WHERE nome = '%s';" % (nomeProduto)

        queryVerify2 = "SELECT * FROM produtosCad WHERE ean = '%s';" % (eanProduto)

        cursor.execute(queryVerify)
        data1 = cursor.fetchall()
        verify1 = len(data1)
        try:
            if verify1 < 1:
                cursor.execute(queryVerify2)
                data2 = cursor.fetchall()
                verify2 = len(data2)
                if verify2 < 1:
                    cursor.execute(query)
                    conn.commit()
                    sg.Popup('Produto cadastrado.')
                else:
                    sg.Popup('Ops, já existe um produto com essa EAN.')
            else:
                sg.Popup('Ops, Já existe um produto com esse nome.')
        except:
            sg.Popup('Erro Interno!')
    if janela == janela3 and eventos == 'Consultar':
        eanProduto = valores['eanpod']
        #Conectando na db
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() #Cursor

        query = "SELECT * FROM produtosCad WHERE ean = '%s'" % (eanProduto)
        cursor.execute(query)
        dataReceiv = cursor.fetchall()
        verifySimple = len(dataReceiv)
        if verifySimple < 1:
            sg.Popup('Ops, produto inexistente!')
        else:
            for linha in dataReceiv:
                nome = linha[1]
                estoque = linha[3]
                avaria = linha[4]
                troca = linha[5]
                enquadramento = verificarEnquadramento(linha[5])
                sg.Print('Produto: {}\nQuantidade no estoque: {}Un\nEstoque na avaria: {}Un\nEstoque em troca: {}Un\nEnquadramento: {}'.format(nome,estoque,avaria,troca,enquadramento))
    if janela == janela3 and eventos == 'Voltar':
        janela3.hide()
        janela2.un_hide()
    if janela == janela2 and eventos == 'Cadastro de Clientes':
        janela2.hide()
        janela4 = janelaCadclient()
    if janela == janela4 and eventos == 'Cadastrar':
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() #Cursor
        query = "INSERT INTO clientes(nome,cpf,compras,telefone,email,bairro,endereco) VALUES('%s','%s','%s','%s','%s','%s','%s');" % (valores['clientName'],valores['clientCpf'],'x',valores['clientTelefone'],valores['clientEmail'],valores['clientBairro'],valores['clientEndereco'])
        if valores['clientName'] == '' or valores['clientCpf'] == '' or valores['clientTelefone'] == '' or valores['clientEmail'] == '' or valores['clientBairro'] == '' or valores['clientEndereco']  == '':
            sg.Popup('Opa, verifique os campos!')
        else:
            try:
                cursor.execute(query)
                conn.commit()
                sg.Popup('Cadastrado!')
            except:
                sg.Popup('Erro interno!')
    if janela == janela4 and eventos == 'Ver todos os Clientes':
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() #Cursor
        query = 'SELECT * FROM clientes;'
        cursor.execute(query)
        data = cursor.fetchall()
        if len(data) < 1:
            sg.Popup('Nenhum cliente cadastrado.')
        else:
            for linha in data:
                mensagem = "Nome do cliente: {}\nCPF: {}\nCompras: {}\nTelefone: {}\nEmail: {}\nBairro: {}\nEndereco: {}\n\n".format(linha[0],linha[1],linha[2],linha[3],linha[4],linha[5],linha[6])
                sg.Print(mensagem)
    if janela == janela4 and eventos == 'Voltar':
        janela4.hide()
        janela2.un_hide()
    if janela == janela4 and eventos == 'Remover Cliente':
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() #Cursor
        query = "DELETE FROM clientes WHERE cpf = '%s';" % (valores['clientCpf'])
        try:
            cursor.execute(query)
            conn.commit()
            sg.Popup('Cliente removido do sistema!')
        except:
            sg.Popup('Erro interno, contate +5567993462261 via whatsapp!')
    if janela == janela4 and eventos == 'Ver Contas':
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() 
        queryCheck = "SELECT * FROM notasconfirmadas WHERE cpf = '%s'" % (valores['clientCpf'])
        cursor.execute(queryCheck)
        dataReceiv = cursor.fetchall()
        if len(dataReceiv) < 1:
            sg.Popup('Nenhuma conta em aberto!')
        else:
            for linha in dataReceiv:
                caixaOperante = linha[0]
                numeroNota = linha[1]
                cliente = linha[2]
                valorTotal = linha[3]
                dadoCrypted = linha[4] #Produtos em base64
                dadoDecrypted = base64.b64decode(str(dadoCrypted))
                out = str(dadoDecrypted)
                out = out.replace("\\n","\n")
                out = out.replace("b'"," ")
                out = out.replace("'"," ")
                mensagem = "Caixa operante: {}\nNumero da nota: {}\n        CPF: {}\nProdutos: {}\nValor total {}\n\n\n\n\n".format(checkCaixa(caixaOperante),numeroNota,cliente,out,valorTotal)
                sg.Print(mensagem)
    if janela == janela2 and eventos == 'Avaria':
        janela2.hide()
        janela5 = janelaAvaria()
    if janela == janela5 and eventos == 'Enviar':
        def diminuirProduct(ean, estoque, quantiaclient):

            conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
            cursor = conn.cursor() 
            result = int(estoque) - int(quantiaclient)
            query = "UPDATE produtoscad SET estoque = '%s' WHERE ean = '%s'" % (result, ean)
            try:
                cursor.execute(query)
                conn.commit()
            except:
                sg.Popup('Error #009')
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() 

        queryVerify = "SELECT estoque, nome FROM produtoscad WHERE ean = '%s'" % (valores['eanPod'])
        querySend = "SELECT estoque FROM produtosavaria WHERE ean = '%s'" % (valores['eanPod'])
        queryError = "SELECT "

        cursor.execute(queryVerify)

        dataReceiv = cursor.fetchall()

        if len(dataReceiv) < 1:
            sg.Popup('Produto inexistente com esse EAN!')
        else:
            for row in dataReceiv:
                estoqueUnidade = row[0]
                nomeEstoque = row[1]
                cursor.execute(querySend)
                dataReceivtwo = cursor.fetchall()
                if len(dataReceivtwo) < 1:
                    querySendtwo = "INSERT INTO produtosavaria(nome, ean, estoque) VALUES('%s','%s','%s')" % (nomeEstoque, valores['eanPod'], valores['unPod'])
                    try:
                        cursor.execute(querySendtwo)
                        conn.commit()
                        diminuirProduct(valores['eanPod'], estoqueUnidade, valores['unPod'])
                        sg.Popup('Enviado!')
                    except:
                        sg.Popup('Erro encontrado!')
                else:
                    for row in dataReceivtwo:
                        querySendThree = "SELECT estoque FROM produtosavaria WHERE ean = '%s'" % (valores['eanPod'])
                        cursor.execute(querySendThree)
                        dataReceivThree = cursor.fetchall()
                        for row in dataReceivThree:
                            estoque01 = int(row[0])
                            estoqueCliente = int(valores['unPod'])
                            calc = estoque01 + estoqueCliente
                            queryFour = "UPDATE produtosavaria SET estoque = '%s' WHERE ean = '%s'" % (calc, valores['eanPod'])
                            try:
                                cursor.execute(queryFour)
                                conn.commit()
                                diminuirProduct(valores['eanPod'], estoqueUnidade, valores['unPod'])
                                sg.Popup("Enviado!")
                            except:
                                sg.Popup("Erro encontrado!")
    if janela == janela5 and eventos == 'Consultar':
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() 
        queryFetch = "SELECT * FROM produtosavaria" 
        cursor.execute(queryFetch)
        dataFetch = cursor.fetchall()
        if len(dataFetch) < 1:
            sg.Popup('Nenhum produto esta avariado.')
        else:
            for linha in dataFetch:
                nome = linha[0]
                estoque = linha[2]
                sg.Print("Nome do produto: %s\nEstoque em situação de avaria: %s\n\n" % (nome,estoque))
    if janela == janela5 and eventos == 'Voltar':
        janela5.hide()
        janela2.un_hide()
    if janela == janela5 and eventos == 'Zerar':
        i = 0
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() 
        queryStart = "SELECT ean FROM produtosavaria;"
        cursor.execute(queryStart)
        data = cursor.fetchall()
        while i < len(data):
            for item in data:
                i += 1
                queryEnd = "DELETE FROM produtosavaria WHERE ean = '%s'" % (item[0])
                cursor.execute(queryEnd)
                conn.commit()
        sg.Popup('Temporada resetada!')
    if janela == janela5 and eventos == 'Remover p/Un':
        ean = valores['eanPod']
        qnt = valores['unPod']
        conn = mysql.connector.connect(host='localhost',database='itekilasystem',user='root',password='')
        cursor = conn.cursor() 
        queryVerify = "SELECT estoque FROM produtosavaria WHERE ean = '%s'" % (ean)
        cursor.execute(queryVerify)
        data = cursor.fetchall()
        if len(data) < 1:
            sg.Popup('Nenhum produto encontrado.')
        else:
            for item in data:
                estoqueAvaria = item[0]
                calc = int(estoqueAvaria) - int(qnt)
                querySend = "UPDATE produtosavaria SET estoque = '%s' WHERE ean = '%s'" % (calc, ean)
                cursor.execute(querySend)
                conn.commit()
                queryVerifyCad = "SELECT estoque FROM produtoscad WHERE ean = '%s'" % (ean)
                cursor.execute(queryVerifyCad)
                dataReceiv2 = cursor.fetchall()
                for linha in dataReceiv2:
                    estoqueAtual = linha[0]
                    calc2 = int(estoqueAtual) + int(qnt)
                    queryUpdate = "UPDATE produtoscad SET estoque = '%s' WHERE ean = '%s'" % (calc2, ean)
                    cursor.execute(queryUpdate)
                    conn.commit()
                    sg.Popup('01 Produtos alterados.')
    if janela == janela2 and eventos == 'Troca':
        janela6 = janelaTroca()
        janela2.hide()
    if janela == janela6 and eventos == 'Voltar':
        janela6.hide()
        janela2.un_hide()
                        
                    




