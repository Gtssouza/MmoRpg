module.exports.index = function(application, req,res){
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('usuario','Usuario não pode ser vazio').notEmpty();
    req.assert('senha','senha não pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    //conexao com o banco de dados
    var conn = application.config.dbConn;

    //autenticação
    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);

    UsuariosDAO.autenticar(dadosForm, req, res);

    //res.send('tudo ok para validar')
}