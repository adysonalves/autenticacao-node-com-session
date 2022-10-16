const User = require('../models/User');

const router = require('express').Router()

router.get('/', (req,res) => {
    res.status(200).send('Hello Wolrd!');
});

router.post('/register', async(req,res) => {
    let user = req.body.user;
    let passwd = req.body.passwd;

    await User.create({
        user: user,
        passwd: passwd
    }).then(success => {
        return res.status(200).send(`Usuário: ${user}, foi adicionado com sucesso!`)
    }).catch(err => {
        res.status(400).send(`Ocorreu um erro ao registrar: ${err}`);
    });
})

router.post('/login', async(req,res) => {
    if(req.session.logado){
        return res.status(401).send('Você já está autenticado.')
    }

   let buscarUsuario =  await User.findOne({
        where:{
            user: req.body.user
        }
    }).then(dados => {
        return dados;
    });

    if(buscarUsuario != null && buscarUsuario.passwd == req.body.passwd){
        req.session.logado = true;
        req.session.userData = buscarUsuario
        return res.status(200).send('Você foi autenticado com sucesso!')
    }

    return res.status(400).send('Usuário ou senha inválidos!');
});

router.get('/logout', (req,res) => {
    if(!req.session.logado){
        return res.redirect('/')
    }

    req.session.destroy();
    res.status(200).send('Você foi desconectado!');
})

module.exports = router;