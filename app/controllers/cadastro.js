module.exports.cadastro = function(application, req,res){
    res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome','Nome não pode ser vazio').notEmpty();
    req.assert('usuario','Usuario não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazio').notEmpty();
    req.assert('casa','Casa não pode ser vazio').notEmpty();

    var error = req.validationErrors();

    if(error){
        res.render('cadastro', {validacao: error, dadosForm: dadosForm});
        return;
    }

    var conn = application.config.dbConn;

    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);
    var JogoDAO = new application.app.models.JogoDAO(conn);

    UsuariosDAO.inserirUsuario(dadosForm);

    //gerando parametros para jogoDAO
    JogoDAO.gerarParams(dadosForm.usuario);


    //res.send('Podemos cadastrar');
}