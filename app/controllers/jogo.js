module.exports.jogo = function(application, req,res){
    if(req.session.autorizado){
        res.render('jogo');
    }else{
        res.send('Faça Login');
    }
    
}