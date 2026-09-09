const test = require('node:test');
const assert = require('node:assert/strict');
const { produtos, renderizarCardapio } = require('../app.js');

test('o cardápio tem pelo menos três produtos identificados, sem duplicatas', () => {
  assert.ok(produtos.length >= 3);
  assert.equal(new Set(produtos.map((produto) => produto.id)).size, produtos.length);
  for (const produto of produtos) {
    assert.ok(produto.nome.trim());
    assert.ok(produto.descricao.trim());
  }
});

test('a página mostra todos os produtos e não duplica itens ao renderizar novamente', () => {
  function elemento(tag) {
    return {
      tag, textContent: '', children: [],
      append(...filhos) { this.children.push(...filhos); },
      replaceChildren(...filhos) { this.children = filhos; },
    };
  }
  const lista = elemento('ul');
  const documento = {
    getElementById(id) { assert.equal(id, 'produtos'); return lista; },
    createElement: elemento,
  };
  renderizarCardapio(documento);
  renderizarCardapio(documento);
  assert.equal(lista.children.length, produtos.length);
  assert.deepEqual(lista.children.map((item) => item.children[0].textContent), produtos.map((p) => p.nome));
});
