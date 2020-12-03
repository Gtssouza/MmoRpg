module.exports.jogo = function(application, req,res){
    if(req.session.autorizado !== true){
        res.send('Faça Login');
        return;
    }

    var usuario = req.session.usuario; 
    var casa = req.session.casa;

    var conn = application.config.dbConn;
    var JogoDAO = new application.app.models.JogoDAO(conn);
    JogoDAO.iniciaJogo(usuario,req,res, casa);
        
    
    
}

module.exports.exit = function(application, req,res){
    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });
    
}