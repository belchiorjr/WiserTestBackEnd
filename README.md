# WiserTestBackEnd
Challenge Back End | Encurtador de URLs da Wiser Educação


<h5>Necessário ter instalado o NodeJs, Mysql caso tenha segue os links.<h5>
<p>https://nodejs.org/pt-br/</p>
<p>https://www.mysql.com/downloads/</p>

<h5>Para realizar os testes sugiro que utilize o Postman<h5>
<p>https://www.postman.com/</p>

<h5>Instalação banco no mysql, através de algum software de suporte ao mysql de sua preferência.
<p>Sugestão: HeidiSql, caso não tenha e queira instalar segue o link https://www.heidisql.com/download.php
</p>

<h5>Cofiguração da base de dados mysql</h5>
<p>Abra o arquivo server.js na raíz da aplicação
Configure os dados necessários ({Local}, {}) para acessar a base de dados
</p>

<br>
    <br>
    var connection = mysql.createPool({<br>
        connectionLimit:50,<br>
        host:'{Local}', <br>
        user:'{Usuário}', <br>
        password: '{Senha}', <br>
        database: 'wiser_test_back_end'<br>
    });<br>
    <br>
<br>


<h5>Instalação dos pacotes necessários</h5>
<p>Acesse a pasta onde está aplicação pelo terminal<br>
Execute o comando: npm install
</p>


<h5>Executar a aplicação back-end</h5>
<p>Execute o comando: node \.server.js</p>


<h5>Executar a aplicação com o client Postman</h5>
<p>Abra o arquivo collection_test_postman no postman<br>
Cadastre as urls e teste as leituras</p>




