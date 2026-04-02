class ServicoEmprestimo {
    static autorizarEmprestimo(usuario) {
        return this.validarUsuario(usuario)
    }

     static validarUsuario(usuario) {
        if(!usuario.ativo) {
            return false;
        }

        if(usuario.emprestimosAtivos > constants.USUARIO_LIMITE_EMPRESTIMOS) {
            return false;
        }

        return true;
    }
}

module.exports = ServicoEmprestimo;