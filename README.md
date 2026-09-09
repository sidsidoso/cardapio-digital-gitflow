# Cardápio Digital

Projeto acadêmico para demonstrar o ciclo de desenvolvimento com Git, GitHub e GitFlow.

Abra `index.html` no navegador para consultar os três produtos e seus preços em reais. Não é necessário instalar dependências.

Para validar com Node.js 22.13 ou superior: `npm test` e `npm run check`.

## Versões e evidências

- [Guia da avaliação com commits e comandos](docs/EVIDENCIAS.md).
- [Release 1.0.0](https://github.com/sidsidoso/cardapio-digital-gitflow/tree/1.0.0): três produtos com preços.
- [Versão corrigida 1.0.1](https://github.com/sidsidoso/cardapio-digital-gitflow/tree/1.0.1): correção do nome de um produto via hotfix.
- [Comparação entre versões](https://github.com/sidsidoso/cardapio-digital-gitflow/compare/1.0.0...1.0.1).
- [Histórico de versões](CHANGELOG.md).

O GitFlow usa `main` para versões entregues e `develop` para integração. As branches
`feature/listar-produtos`, `release/1.0.0` e `hotfix/1.0.1` são mantidas como evidência
da avaliação usando a opção `-k` ao finalizar cada etapa. Seus merges são explícitos.

O erro de grafia em 1.0.0 foi incluído propositalmente para simular a descoberta de
um problema após a entrega. A expressão "produção" nesta atividade representa a
branch `main`; não há implantação comercial nem serviço de pedidos.

Os produtos e valores são fictícios; o projeto não recebe pedidos nem pagamentos.
