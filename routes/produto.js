
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  if(req.query.nome){
    db("petshop.produtos")
    .where('nome', 'like', '%'+ req.query.nome +'%')
    .then((produtos) => {
      res.render('produto/lista',{
        produtos: produtos
      });
    },next);

  } else {
    db("petshop.produtos").then((produtos)=>{
      res.render('produto/lista',{
        produtos: produtos
      });
    },next);
  }
});

router.get('/novo',(req,res,next)=>{
  res.render('produto/novo');
});

router.post('/',(req,res,next)=>{
  db("petshop.produtos").insert(req.body).then((ids) => {
    res.redirect('/produto');
  },next)
});

router.get('/:id',(req,res,next)=>{
  const {id} = req.params;

  db("petshop.produtos")
  .where("id", id)
  .first()
  .then((produto) => {
    if (!produto) {
      return res.send(400);
    }

    res.render("produto/editar.njk",{
      produto: produto
    });
  },next);

});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.produtos")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/produto');
  },next)
});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.produtos")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/produto');
  },next)
});

module.exports = router;
