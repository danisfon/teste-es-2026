const Usuario = require("../../src/model/Usuario");
const Livro = require("../../src/model/Livro");
const ServicoEmprestimo = require("../../src/service/ServiceEmprestimo");

test('Testa usuario e livro valido', () => {

// Arrange
const usuario = new Usuario({id: 1, nome: "dani", ativo: true, emprestimosAtivos: 2, multaPendente: 20});
const livro = new Livro = ({id: 1, titulo: "Teste ES", disponivel: true});

// Act
const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)

// Assert
expect(true).toBe(saida);

})