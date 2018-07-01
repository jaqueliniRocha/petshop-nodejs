
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  db("petshop.marcas").then((marcas)=>{
    res.render('marca/lista',{
      marcas: marcas
    });
  },next);
});

router.get('/novo',(req,res,next)=>{
  res.render('marca/novo');
});

router.post('/',(req,res,next)=>{
  db("petshop.marcas").insert(req.body).then((ids) => {
    res.redirect('/marca');
  },next)
});

router.get('/:id',(req,res,next)=>{
  const {id} = req.params;

  db("petshop.marcas")
  .where("id", id)
  .first()
  .then((marca) => {
    console.log(marca);
    if (!marca) {
      return res.send(400);
    }

    res.render("marca/editar.njk",{
      marca: marca
    });
  },next);

});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.marcas")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/marca');
  },next)
});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.marcas")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/marca');
  },next)
});

module.exports = router;
