const Usuario = require("../../src/model/Usuario");
const Livro = require("../../src/model/Livro");
const ServicoEmprestimo = require("../../src/service/ServiceEmprestimo");
const mensagens = require("../../src/util/mensagens");
const constants = require("../../src/util/constants");
const casos = require("../dados/emprestimo.json")

describe("Emprestimo", ()=> {

    test('Testa usuario e livro valido', () => {

        // Arrange
        const usuario = new Usuario({id: 1, nome: "dani", ativo: true, emprestimosAtivos: 2, multaPendente: 20});
        const livro = new Livro({id: 1, titulo: "Teste ES", disponivel: true});

        // Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)

        // Assert
        expect(saida).toBe(true);

    });


    test('Testa usuario valido e livro invalido', () => {
        const usuario = new Usuario({id: 1, nome: "dani", ativo: true, emprestimosAtivos: 2, multaPendente: 20});
        const livro = new Livro({id: 1, titulo: "Teste ES", disponivel: false});
        const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)
        expect(saida).toBe(false);
    });

    test('Testa usuario invalido (ativo) e livro valido', () => {
        const usuario = new Usuario({id: 1, nome: "dani", ativo: false, emprestimosAtivos: 2, multaPendente: 20});
        const livro = new Livro({id: 1, titulo: "Teste ES", disponivel: true});
        const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)
        expect(saida).toBe(false);
    });

    test('Testa usuario invalido (emprestimo) e livro valido', () => {
        const usuario = new Usuario({id: 1, nome: "dani", ativo: true, emprestimosAtivos: constants.USUARIO_LIMITE_EMPRESTIMOS + 1, multaPendente: 20});
        const livro = new Livro({id: 1, titulo: "Teste ES", disponivel: true});
        const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)
        expect(saida).toBe(false);
    });

    test('Testa usuario invalido (multa) e livro valido', () => {
        const usuario = new Usuario({id: 1, nome: "dani", ativo: true, emprestimosAtivos: 0, multaPendente: constants.USUARIO_LIMITE_MULTA + 1});
        const livro = new Livro({id: 1, titulo: "Teste ES", disponivel: true});
        const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)
        expect(saida).toBe(false);
    });

    test('Testa usuario valido e livro valido (toThrow)', () => {
        const usuario = new Usuario({id: 1, nome: "dani", ativo: true, emprestimosAtivos: 2, multaPendente: 20});
        const livro = new Livro({id: 1, titulo: "Teste ES", disponivel: false});
        expect(()=> ServicoEmprestimo.autorizarEmprestimo(usuario, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
    });

    test.each(casos)('$descricao', (caso)=>{

        //arrange
        const usuario = new Usuario({
            id: 1, nome: "dani", 
            ativo: caso.ativo, 
            emprestimosAtivos: 
            caso.emprestimosAtivos, 
            multaPendente: caso.multaPendente
        });

        const livro = new Livro({
            id: 1, 
            titulo: "Teste ES", 
            disponivel: caso.livroDisponivel
        });

        //assert
        if(caso.livroDisponivel) {
            //act
            const saida = ServicoEmprestimo.autorizarEmprestimo(usuario, livro)
            expect(caso.saida).toBe(saida)
        } else {
            //act/assert
            expect(()=> ServicoEmprestimo.autorizarEmprestimo(usuario, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
        }

    });
});