# API para envio de e-mails

## Baixe o código da API

`git clone https://github.com/juniodeveloper/send-email.git`

Dentro da pasta do projeto no prompt ou na janela de comando, execute

`yarn` ou `npm install`

Para testar a API

`yarn dev`

## Crie um arquivo .env na raiz do projeto

Adicione as seguintes variáveis

```markdown
SERVER_PORT=3333
USER=seu_email
PASSWORD=senha_do_email
SMTP=smtp_do_provedor_de_email
SMTP_PORT=porta_do_smtp
TOKEN_API=qualquer_token
```

## Exemplo de envio de e-mail

```javascript

const axios = require('axios')
const querystring = require('querystring')

function sendEmail() {

    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer 67d9b3e0-a44f-474e-91f5-06b1af66a281'
        }
    }

    const body = {
        to: 'to@exemple.com',
        from: 'from@exemple.com',
        subject: 'Welcome',
        html: '<h1>Hello, Word!</h1>'
    }

    axios.post(
        'http://localhost:3333/api/send/email',
        querystring.stringify(body), headers
    ).then(() => {
        console.log('Success')
    }).catch((error) => {
        console.log(error.response.data.message)
    })

}

sendEmail()

```

## Gere a pasta de produção

`yarn build`
