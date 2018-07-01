
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  db("petshop.usuarios")
  .where({
    username: req.body.username,
    senha: req.body.senha
  })
  .first()
  .then((usuario) => {
    if (!usuario) {
      res.render('login',{
        msg: "Usuário/senha inválido"
      });
    } else {
      res.render('layout');
    }

  },next);
});

module.exports = router;
