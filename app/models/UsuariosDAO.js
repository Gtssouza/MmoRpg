function UsuariosDAO(){

}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    console.log(usuario);
}

module.exports = function(){
    return UsuariosDAO;
}