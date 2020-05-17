# WiserTestBackEnd
Challenge Back End | Encurtador de URLs da Wiser Educação


#Necessário ter instalado o NodeJs, Mysql e Postman caso tenha segue os links.
https://nodejs.org/pt-br/
https://www.mysql.com/downloads/


#Instalação banco no mysql, através de algum software de suporte ao mysql de sua preferência.
Sugestão: HeidiSql, caso não tenha e queira instalar segue o link
https://www.heidisql.com/download.php


#Cofiguração da base de dados mysql
Abra o arquivo server.js na raíz da aplicação
Configure os dados necessários ({Local}, {}) para acessar a base de dados

var connection = mysql.createPool({
    connectionLimit:50,
    host:'{Local}', // Informe o endereço ip ou dns onde está rodando o sgbd
    user:'{Usuário}', // Informe o usuário do banco de dados
    password: '{Senha}', // Informe a senha do usuário
    database: 'wiser_test_back_end'
});


#Instalação dos pacotes necessários
Acesse a pasta onde está aplicação pelo terminal
Execute o comando: npm install


#Executar a aplicação back-end
Execute o comando: node \.server.js


#Executar a aplicação com o client Postman
Abra o arquivo collection_test_postman no postman
Cadastre as urls e teste as leituras




