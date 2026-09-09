'use strict';

const produtos = [
  { id: 'hamburguer', nome: 'Hambúrguer Artesanal', descricao: 'Pão, hambúrguer e queijo.', precoCentavos: 2590 },
  { id: 'batata', nome: 'Batata Frita', descricao: 'Porção de batatas douradas e crocantes.', precoCentavos: 1290 },
  { id: 'suco', nome: 'Suco de Laranja', descricao: 'Suco de laranja servido gelado.', precoCentavos: 800 },
];

function formatarPreco(centavos) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centavos / 100);
}

function renderizarCardapio(documento) {
  const lista = documento.getElementById('produtos');
  lista.replaceChildren();
  for (const produto of produtos) {
    const item = documento.createElement('li');
    const nome = documento.createElement('h2');
    const descricao = documento.createElement('p');
    nome.textContent = produto.nome;
    descricao.textContent = produto.descricao;
    item.append(nome, descricao);
    const preco = documento.createElement('strong');
    preco.className = 'preco';
    preco.textContent = formatarPreco(produto.precoCentavos);
    item.append(preco);
    lista.append(item);
  }
}

if (typeof document !== 'undefined') renderizarCardapio(document);
if (typeof module !== 'undefined') module.exports = { produtos, renderizarCardapio, formatarPreco };
