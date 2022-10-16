require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// SESSION
app.use(session({
    secret: 'bT1w2ZmMluWHVisS7SSyyRrPmesub6PA',
    resave: false,
    saveUninitialized: true
}));


// MODELS
const User = require('./models/User');

// DATABASE
const {Sequelize, sequelize} = require('./database/conexao');
// sequelize.sync();

// MIDDLEWARES
app.use('/dashboard', (req,res,next) => {
    if(req.session.logado != true){
        res.status(401).send('Acesso Negado! Usuário não autenticado.');
    } else{
        next();
    }
});

//ROTAS
const index = require('./routes/index');
const dashboard = require('./routes/dashboard');

app.use('/', index);
app.use('/dashboard', dashboard);

app.use((req,res) => {
    res.send('404 not found...');
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})