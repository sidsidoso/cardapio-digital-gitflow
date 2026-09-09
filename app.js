'use strict';

const produtos = [
  { id: 'hamburguer', nome: 'Hambúrguer Artesanal', descricao: 'Pão, hambúrguer e queijo.', precoCentavos: 2590 },
  { id: 'batata', nome: 'Batata Frita', descricao: 'Porção de batatas douradas e crocantes.', precoCentavos: 1290 },
  { id: 'suco', nome: 'Suco de Laranja', descricao: 'Suco de laranja servido gelado.', precoCentavos: 800 },
];

const apresentacao = {
  hamburguer: { categoria: 'O PRINCIPAL', imagem: 'assets/hamburguer.png', alt: 'Hambúrguer com pão tostado, carne e queijo derretido.', destaque: 'O clássico da casa' },
  batata: { categoria: 'PARA ACOMPANHAR', imagem: 'assets/batata.png', alt: 'Porção de batatas fritas douradas em uma cesta.' },
  suco: { categoria: 'PARA REFRESCAR', imagem: 'assets/suco.png', alt: 'Copo de suco de laranja gelado acompanhado de laranjas.' },
};

function formatarPreco(centavos) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centavos / 100);
}

function renderizarCardapio(documento) {
  const lista = documento.getElementById('produtos');
  lista.replaceChildren();
  for (const [indice, produto] of produtos.entries()) {
    const visual = apresentacao[produto.id];
    const item = documento.createElement('li');
    item.className = `produto produto--${produto.id}`;
    const foto = documento.createElement('div');
    foto.className = 'produto-foto';
    const imagem = documento.createElement('img');
    imagem.src = visual.imagem;
    imagem.alt = visual.alt;
    imagem.width = 1536;
    imagem.height = 1024;
    imagem.decoding = 'async';
    foto.append(imagem);
    if (visual.destaque) {
      const selo = documento.createElement('span');
      selo.className = 'produto-selo';
      selo.textContent = visual.destaque;
      foto.append(selo);
    }
    const conteudo = documento.createElement('div');
    conteudo.className = 'produto-conteudo';
    const categoria = documento.createElement('p');
    categoria.className = 'produto-categoria';
    categoria.textContent = `${String(indice + 1).padStart(2, '0')} / ${visual.categoria}`;
    const nome = documento.createElement('h2');
    const descricao = documento.createElement('p');
    descricao.className = 'produto-descricao';
    nome.textContent = produto.nome;
    descricao.textContent = produto.descricao;
    conteudo.append(categoria, nome, descricao);
    const preco = documento.createElement('strong');
    preco.className = 'preco';
    preco.textContent = formatarPreco(produto.precoCentavos);
    conteudo.append(preco);
    item.append(foto, conteudo);
    lista.append(item);
  }
}

if (typeof document !== 'undefined') renderizarCardapio(document);
if (typeof module !== 'undefined') module.exports = { produtos, renderizarCardapio, formatarPreco };
