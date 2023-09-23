const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do CORS
const corsOptions = {
    origin: ['https://pxulin-producer.netlify.app', 'https://pxulin-producer.netlify.app/contact'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'lillook321@gmail.com',
        pass: 'ufrehigiikkbtvry'
    }
});

app.get('/', (req, res) => {
    res.send('Servidor ligado!');
});

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Mensagem:', message);

    const mailOptions = {
        from: 'lillook321@gmail.com',
        to: 'lillook321@gmail.com',
        subject: 'Nova mensagem do formulário',
        text: `Nova mensagem do formulário:\n\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o email:', error);
            res.status(500).json({ error: 'Erro ao enviar o email' });
        } else {
            console.log('Email enviado:', info.response);
            res.status(200).json({ message: 'Dados recebidos com sucesso!' });
        }
    });
});

module.exports = app;