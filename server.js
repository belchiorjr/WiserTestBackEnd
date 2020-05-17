/*
Programa: Wiser Teste - BackEnd
Processo Seletivo: Programador Full Stack 
Desenvolvedor: Belchior Pereira de Araújo Júnior
*/


/* Inicializações de módulos */ 

var child_process = require("child_process");
var express = require('express');
var mysql = require('mysql');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var connection = mysql.createPool({
    connectionLimit:50,
    host:'localhost',
    user:'root',
    password: '',
    database: 'wiser_test_back_end'
});


/***************************************************
Armazenar os dados e encurtar uma url
***************************************************/
app.post('/encurtador', function(request, response) {
    
    var url = request.body.url;
    
    // Valida texto url
    if (!/^[htp:\/]+[a-zA-Z\d.-\/]+$/.test(url)) {
        response.json({erro:'Url inválida!'});
        return;
    }
    
    // Tenta conectar 
    connection.getConnection(function (error, con) {
        
        if (!!error) {
            con.release();
            response.json({erro:'Não foi possível conectar com o banco de dados!'});
            return;
        } 
        
        // Constrói a sql
        var sqlModel = "INSERT INTO urls_encurtadas (url, key_crypt, dta_valid) VALUES (?,"; 
        sqlModel +=  "substring(MD5(? + NOW() + interval (ROUND(RAND()*(22-5)+5)) SECOND), ROUND(RAND()*(22-5)+5), ROUND(RAND()*(10-5)+5)), ";                   
        sqlModel +=  "NOW() + INTERVAL 1 DAY)";
        
        con.query(sqlModel, [url, url], function(error, res) {
                
                if (error) {                  
                    con.release();
                    response.json({erro:'Não foi possível cadastrar a url encurtada!'});
                    return;
                }
                
                if (res.insertId) {
                    con.query("SELECT * FROM urls_encurtadas WHERE id = ?",[res.insertId], function (error, row) {
                        if (error) {
                            response.json({erro:'Não foi possível recupera a url encurtada!'});
                            return;
                        }
                        
                        // Objeto de retorno
                        const returnJson = {
                            "newUrl": "http://" + request.headers.host + "/" + row[0].key_crypt
                        }
                        
                        response.json(returnJson);
                        return;
                    });
                }
            }
        );
    });    
});
    
    
/*********************************************************
Leitura das chave e redirecionamento para url da chave.
*********************************************************/
app.get('*', function(request, response) {

    var urlRedirect = null;
    var chave = null;

    // Checa o parametro chave para pesquisar a url.
    if  (/^(\/[a-zA-Z\d]{5,10})$/gm.test(request.url)) {
        var chave = request.url.replace(/^\S+\/+/gm, '');
        chave = chave.replace(/[\/]/, '');
    }

    // Chave OK?
    if (!chave) {
        response.status(404).send('Chave inválida para pesquisa!');
        return;
    }


    // Tenta conectar 
    connection.getConnection(function (error, con) {
        
        if (!!error) {
            con.release();
            response.status(301).send('Não foi possível conectar com o banco de dados!');
            return;
        } 
        
        // Sql para pesquisa da url com a chave 
        var sql = "SELECT url, CASE WHEN TIMESTAMPDIFF(second, dta_valid, NOW()) > 0 THEN FALSE ELSE TRUE END valida FROM urls_encurtadas WHERE key_crypt = ?";
        

        // Seleciona no Banco de dados 
        con.query(sql, [chave],
            function(error, res) {
                if (error) {
                    erroJson = {erro:'Ocorreu um erro ao pesquisa a url'};
                } else if (res) {

                    if (res[0].valida) {
                        response.redirect(res[0].url);
                    } else {
                        response.status(404).send('Chave vencida, necessário cadastrar outra!');
                    }
                } 
            }
        );
    });
});

app.listen(8081);