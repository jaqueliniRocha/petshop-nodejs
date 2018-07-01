CREATE TABLE petshop.marcas
(
    id serial PRIMARY KEY NOT NULL,
    nome varchar(200) NOT NULL,
    nome_empresa varchar(600),
    telefone_empresa varchar(20)
);
CREATE UNIQUE INDEX marcas_id_uindex ON petshop.marca (id);

CREATE TABLE petshop.categorias
(
    id serial PRIMARY KEY NOT NULL,
    nome varchar(200) NOT NULL
);
CREATE UNIQUE INDEX categorias_id_uindex ON petshop.categorias (id);

CREATE TABLE petshop.tipos_pet
(
    id serial PRIMARY KEY NOT NULL,
    nome varchar(200) NOT NULL
);
CREATE UNIQUE INDEX tipos_pet_id_uindex ON petshop.tipos_pet (id);

CREATE TABLE petshop.produtos
(
  id           serial PRIMARY KEY NOT NULL,
  nome         varchar(200) NOT NULL,
  descricao    varchar(600),
  preco        numeric(10,2) NOT NULL,
  id_categoria int,
  id_marca     int,
  id_tipo_pet  int,
    CONSTRAINT "produtos_petshop.marcas_id_fk" FOREIGN KEY (id_marca) REFERENCES petshop.marcas (id),
    CONSTRAINT "produtos_petshop.tipos_pet_id_fk" FOREIGN KEY (id_tipo_pet) REFERENCES petshop.tipos_pet (id),
    CONSTRAINT "produtos_petshop.categorias_id_fk" FOREIGN KEY (id_categoria) REFERENCES petshop.categorias (id)
);
CREATE UNIQUE INDEX produtos_id_uindex ON petshop.produtos (id);

CREATE TABLE petshop.usuarios
(
    id serial PRIMARY KEY NOT NULL,
    nome varchar(300) NOT NULL,
    cpf varchar(11) NOT NULL,
    username varchar(60) NOT NULL,
    cargo varchar(200),
    email varchar(600),
    senha varchar(200)
);
CREATE UNIQUE INDEX usuarios_id_uindex ON petshop.usuarios (id);

CREATE TABLE petshop.fornecedores
(
    id serial PRIMARY KEY NOT NULL,
    nome varchar(300) NOT NULL,
    endereco varchar(1000),
    telefone varchar(20),
    cnpj varchar(14) NOT NULL
);
CREATE UNIQUE INDEX fornecedores_id_uindex ON petshop.fornecedores (id);
