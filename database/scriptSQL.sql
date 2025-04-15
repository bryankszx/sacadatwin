create database db_controle_filmes_ab;

use db_controle_filmes_ab;

create table tbl_filme(
id   int not null primary key auto_increment,
nome varchar(80) not null,
duracao time not null,
sinopse text not null,
data_lancamento date not null,
foto_capa varchar(200),
link_trailer varchar(200)
);

/* Tabela Ator */

create table tbl_ator (
    id_ator int not null auto_increment,
    nome varchar(45) not null,
    primary key (id_ator)
);
