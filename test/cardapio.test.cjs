const test = require('node:test');
const assert = require('node:assert/strict');
const { produtos, renderizarCardapio, formatarPreco } = require('../app.js');

test('regressão do hotfix: o nome do hambúrguer tem a grafia correta', () => {
  assert.equal(produtos.find((p) => p.id === 'hamburguer').nome, 'Hambúrguer Artesanal');
});

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
  function descendentes(elemento) {
    return [elemento, ...elemento.children.flatMap(descendentes)];
  }
  const titulos = descendentes(lista).filter((elemento) => elemento.tag === 'h2');
  const precos = descendentes(lista).filter((elemento) => elemento.className === 'preco');
  assert.deepEqual(titulos.map((item) => item.textContent), produtos.map((p) => p.nome));
  assert.deepEqual(precos.map((item) => item.textContent.replace(/\s/g, ' ')), ['R$ 25,90', 'R$ 12,90', 'R$ 8,00']);
  const imagens = descendentes(lista).filter((elemento) => elemento.tag === 'img');
  assert.equal(imagens.length, produtos.length);
  for (const imagem of imagens) {
    assert.ok(imagem.alt.trim(), 'cada imagem deve ter descrição acessível');
    const caminho = require('node:path').resolve(__dirname, '..', imagem.src);
    const bytes = require('node:fs').readFileSync(caminho);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'imagem PNG local válida');
  }
});

test('todos os preços são positivos, em centavos inteiros', () => {
  assert.deepEqual(produtos.map((p) => p.precoCentavos), [2590, 1290, 800]);
  assert.ok(produtos.every((p) => Number.isInteger(p.precoCentavos) && p.precoCentavos > 0));
});

test('preços usam reais e duas casas decimais', () => {
  assert.equal(formatarPreco(2590).replace(/\s/g, ' '), 'R$ 25,90');
  assert.equal(formatarPreco(800).replace(/\s/g, ' '), 'R$ 8,00');
});
