function UsuariosDAO(conn){
    this._connection = conn();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

/*
------------Inserindo dados documentação-----------------

link: https://www.npmjs.com/package/mongodb

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  insertDocuments(db, function() {
    client.close();
  });
});


*/

UsuariosDAO.prototype.autenticar = function(usuario, req,res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if(req.session.autorizado){
                    res.redirect("jogo");
                }else{
                    res.render("index", {validacao: {}});
                }
            });
            /* OU
            collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq:usuario.senha}}); 
            */
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsuariosDAO;
}