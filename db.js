var	knex	=	require('knex');
var	db	=	knex({
  client: 'postgresql',
  version: '10.3',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'postgres'
  }
});

module.exports	=	db;
