'use strict';

const produtos = [
  { id: 'hamburguer', nome: 'Hambúrgue Artesanal', descricao: 'Pão, hambúrguer e queijo.' },
  { id: 'batata', nome: 'Batata Frita', descricao: 'Porção de batatas douradas e crocantes.' },
  { id: 'suco', nome: 'Suco de Laranja', descricao: 'Suco de laranja servido gelado.' },
];

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
    lista.append(item);
  }
}

if (typeof document !== 'undefined') renderizarCardapio(document);
if (typeof module !== 'undefined') module.exports = { produtos, renderizarCardapio };
