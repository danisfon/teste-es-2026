class ServicoEmprestimo {
    static autorizarEmprestimo(usuario) {
        return this.validarUsuario(usuario)
    }

     static validarUsuario(usuario) {
        if(!usuario.ativo) {
            return false;
        }

        if(usuario.emprestimosAtivos >= constants.USUARIO_LIMITE_EMPRESTIMOS) {
            return false;
        }

        if(usuario.multaPendente > constants.USUARIO_MULTA_PENDENTE) {
            return false;
        }
        
        return true;
    }

    static validarLivro(livro) {
        return livro.disponivel;
    }
}

module.exports = ServicoEmprestimo;