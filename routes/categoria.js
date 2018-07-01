
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  db("petshop.categorias").then((categorias)=>{
    res.render('categoria/lista',{
      categorias: categorias
    });
  },next);
});

router.get('/novo',(req,res,next)=>{
  res.render('categoria/novo');
});

router.post('/',(req,res,next)=>{
  db("petshop.categorias").insert(req.body).then((ids) => {
    res.redirect('/categoria');
  },next)
});

router.get('/:id',(req,res,next)=>{
  const {id} = req.params;

  db("petshop.categorias")
  .where("id", id)
  .first()
  .then((categoria) => {
    console.log(categoria);
    if (!categoria) {
      return res.send(400);
    }

    res.render("categoria/editar.njk",{
      categoria: categoria
    });
  },next);

});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.categorias")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/categoria');
  },next)
});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.categorias")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/categoria');
  },next)
});

module.exports = router;
