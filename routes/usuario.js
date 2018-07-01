
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  db("petshop.usuarios").then((usuarios)=>{
    res.render('usuario/lista',{
      usuarios: usuarios
    });
  },next);

});

router.get('/novo',(req,res,next)=>{
  res.render('usuario/novo');
});

router.post('/',(req,res,next)=>{
  db("petshop.usuarios").insert(req.body).then((ids) => {
    res.redirect('/usuario');
  },next)
});

router.get('/:id',(req,res,next)=>{
  const {id} = req.params;

  db("petshop.usuarios")
  .where("id", id)
  .first()
  .then((usuario) => {
    console.log(usuario);
    if (!usuario) {
      return res.send(400);
    }

    res.render("usuario/editar.njk",{
      usuario: usuario
    });
  },next);

});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.usuarios")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/usuario');
  },next)
});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.usuarios")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/usuario');
  },next)
});

module.exports = router;
