class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
        };
        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        // Botão para abrir/fechar o chat
        openButton.addEventListener('click', () => this.toggleState(chatBox));
        // Botão para enviar mensagens
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        // Enviar mensagens ao pressionar Enter
        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({ key }) => {
            if (key === 'Enter') {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatBox) {
        this.state = !this.state;

        // Mostra ou esconde o chatbox
        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatBox) {
        const textField = chatBox.querySelector('input');
        const text1 = textField.value.trim(); // Remove espaços extras
        if (text1 === "") {
            return; // Não faz nada se o campo estiver vazio
        }

        const msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        // Envia a mensagem para o back-end
        fetch(SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const msg2 = { name: "Sam", message: data.answer };
                this.messages.push(msg2);
                this.updateChatText(chatBox);
                textField.value = ''; // Limpa o campo de entrada
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatBox);
                textField.value = ''; // Limpa o campo mesmo em caso de erro
            });
    }

    updateChatText(chatBox) {
        let html = '';
        this.messages.slice().reverse().forEach(function (item) {
            if (item.name === "Sam") {
                html += `<div class="message__item messages__item--visitor">${item.message}</div>`;
            } else {
                html += `<div class="message__item messages__item--operator">${item.message}</div>`;
            }
        });

        const chatMessages = chatBox.querySelector('.chatbox__messages div');
        chatMessages.innerHTML = html;
    }
}

const SCRIPT_ROOT = document.querySelector('script').getAttribute('data-script-root'); // Pega o valor do HTML
const chatbox = new Chatbox();
chatbox.display();
