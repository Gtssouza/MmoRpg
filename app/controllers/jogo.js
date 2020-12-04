module.exports.jogo = function(application, req,res){
    if(req.session.autorizado !== true){
        res.send('Faça Login');
        return;
    }

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario; 
    var casa = req.session.casa;

    var conn = application.config.dbConn;
    var JogoDAO = new application.app.models.JogoDAO(conn);
    JogoDAO.iniciaJogo(usuario,req,res, casa, msg);

}

module.exports.exit = function(application, req,res){
    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });
    
}

module.exports.suditos = function(application, req,res){
    if(req.session.autorizado !== true){
        res.send('Faça Login');
        return;
    }
    
        res.render("aldeoes", {validacao: {}});
}

module.exports.pergaminhos = function(application, req,res){
    if(req.session.autorizado !== true){
        res.send('Faça Login');
        return;
    }
        //recuperar as ações inseridas no banco de dados
        var usuario = req.session.usuario;
        var conn = application.config.dbConn;
        var JogoDAO = new application.app.models.JogoDAO(conn);

        JogoDAO.getAcoes(usuario, res);

       
}

module.exports.ordenar = function(application, req,res){
    if(req.session.autorizado !== true){
        res.send('Faça Login');
        return;
    }
    
    var dadosForm = req.body;

    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','A quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }

    var conn = application.config.dbConn;
    var JogoDAO = new application.app.models.JogoDAO(conn);

    dadosForm.usuario = req.session.usuario;//para unir a ação com o usuario q a fez
    JogoDAO.acao(dadosForm);
    res.redirect('jogo?msg=B');
}

module.exports.revogar = function(application, req,res){
    var url_query = req.query;
    var _id = url_query.id_acao;

    var conn = application.config.dbConn;
    var JogoDAO = new application.app.models.JogoDAO(conn);

    JogoDAO.revogarAcao(_id);
}