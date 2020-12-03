module.exports.jogo = function(application, req,res){
    if(req.session.autorizado !== true){
        res.send('Faça Login');
        return;
    }

    var comando_invalido = 'N';
    if(req.query.comando_invalido == 'S'){
        comando_invalido = 'S';
    }

    var usuario = req.session.usuario; 
    var casa = req.session.casa;

    var conn = application.config.dbConn;
    var JogoDAO = new application.app.models.JogoDAO(conn);
    JogoDAO.iniciaJogo(usuario,req,res, casa, comando_invalido);

}

module.exports.exit = function(application, req,res){
    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });
    
}

module.exports.suditos = function(application, req,res){
    
        res.render("aldeoes", {validacao: {}});
}

module.exports.pergaminhos = function(application, req,res){
    
        res.render("pergaminhos", {validacao: {}});
}

module.exports.ordenar = function(application, req,res){
    
    var dadosForm = req.body;

    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','A quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?comando_invalido=S');
        return;
    }

    res.send('ok');
}