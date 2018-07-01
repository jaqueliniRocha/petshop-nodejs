
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  db("petshop.tipos_pet").then((tipos_pets)=>{
    res.render('tipo_pet/lista',{
      tipos_pets: tipos_pets
    });
  },next);

});

router.get('/novo',(req,res,next)=>{
  res.render('tipo_pet/novo');
});

router.post('/',(req,res,next)=>{
  db("petshop.tipos_pet").insert(req.body).then((ids) => {
    res.redirect('/tipo_pet');
  },next)
});

router.get('/:id',(req,res,next)=>{
  const {id} = req.params;

  db("petshop.tipos_pet")
  .where("id", id)
  .first()
  .then((tipos_pet) => {
    console.log(tipos_pet);
    if (!tipos_pet) {
      return res.send(400);
    }

    res.render("tipo_pet/editar.njk",{
      tipos_pet: tipos_pet
    });
  },next);

});

router.put('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.tipos_pet")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/tipo_pet');
  },next)
});

router.delete('/:id', (req,res,next)=>{
  const {id} = req.params;

  db("petshop.tipos_pet")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/tipo_pet');
  },next)
});

module.exports = router;
