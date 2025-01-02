
# Chatbot simples com Flask e JavaScript

Essa é a minha versão do chat bot que pode ser encontrado [aqui](https://github.com/python-engineer/pytorch-chatbot)


## Preparação de Ambiente:


clonar repositório e criar ambiente virtual

Detalhe Importante, os comandos são em Shell e pode mudar caso seu terminal seja Bash ou qualquer outro
```
git clone https://github.com/Xesadas/Chatbot.git
cd Chatbot
python -m venv venv
venv/scripts/activate
```
Instalar dependências
```
pip install Flask torch torchvision nltk
```
Instalar pacote nltk 
```
python
import nltk
nltk.download('punkt')
```
Modifique `intents.json` com diferentes perguntas e respostas de acordo com a sua necessidade

Treine o bot 
```
python train.py
```
Isso irá gerar o arquivo data.pth. Em seguida, execute o seguinte comando no console para testá-lo:
```
python chat.py
```
Em seguida, vá até o app.py e dê run!

(Frontend levemente bugado, aceito correções)
## Creditos:
Essa repo foi usada no frontend code:
https://github.com/hitchcliff/front-end-chatjs



