
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  db("petshop.fornecedores").then((fornecedores)=>{
    res.render('fornecedor/lista',{
      fornecedores: fornecedores
    });
  },next);

});

router.get('/novo',(req,res,next)=>{
  res.render('fornecedor/novo');
});

router.post('/',(req,res,next)=>{
  db("petshop.fornecedores").insert(req.body).then((ids) => {
    res.redirect('/fornecedor');
  },next)
});

router.get('/:id',(req,res,next)=>{
  const {id} = req.params;

  db("petshop.fornecedores")
  .where("id", id)
  .first()
  .then((fornecedor) => {
    console.log(fornecedor);
    if (!fornecedor) {
      return res.send(400);
    }

    res.render("fornecedor/editar.njk",{
      fornecedor: fornecedor
    });
  },next);

});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.fornecedores")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/fornecedor');
  },next)
});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.fornecedores")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/fornecedor');
  },next)
});

module.exports = router;
