// carrega módulos
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressNunjucks = require('express-nunjucks');
var methodOverride = require('method-override');

// carrega rotas
var loginRouter = require('./routes/login');
var usuarioRouter = require('./routes/usuario');
var categoriaRouter = require('./routes/categoria');
var marcaRouter = require('./routes/marca');
var produtoRouter = require('./routes/produto');
var tipoPetRouter = require('./routes/tipo_pet');
var fornecedorRouter = require('./routes/fornecedor');

//carrega express para configurá-lo
var app = express();

//define o nunjucks como módulo de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
var njk = expressNunjucks(app,{watch:true, noCache: true});

//configura express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//módulo method override permite utilizar métodos HTTP
//como PUT, DELETE e PATCH nas rotas
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {

    var method = req.body._method
    delete req.body._method
    return method
  }
}));

//define os caminhos das rotas
app.use('/', loginRouter);
app.use('/usuario', usuarioRouter);
app.use('/categoria', categoriaRouter);
app.use('/marca', marcaRouter);
app.use('/produto', produtoRouter);
app.use('/tipo_pet', tipoPetRouter);
app.use('/fornecedor', fornecedorRouter);

//abaixo são funções criadas pelo express para gerenciar erros
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
