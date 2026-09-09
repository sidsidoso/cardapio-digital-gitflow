# Evidências — avaliação prática de Git, GitHub e GitFlow

Repositório público: [sidsidoso/cardapio-digital-gitflow](https://github.com/sidsidoso/cardapio-digital-gitflow).
O projeto se chama **Cardápio Digital**. O sufixo do repositório distingue esta avaliação de outro projeto existente.

## Etapas da atividade

| Etapas | Evidência |
| --- | --- |
| 1–3: repositório, README e versão mínima | [150b477 — commit inicial](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/150b477), página ainda sem produtos |
| 4: inicialização do GitFlow | `git flow init -d`, configurado com `main` e `develop` |
| 5–6: feature a partir de develop, dois commits | [8b92df2 — três produtos](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/8b92df2) e [cca98ab — apresentação e testes](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/cca98ab) |
| 7–8: integração e envio da feature | [887190d — merge em develop](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/887190d); branch `feature/listar-produtos` preservada |
| 9–10: release criada de develop e preços adicionados | [1185e6e — preços e versão 1.0.0](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/1185e6e), na branch `release/1.0.0` |
| 11–12: finalização e publicação da release | [185737d — merge em main e tag 1.0.0](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/185737d); [c1e77b0 — retorno para develop](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/c1e77b0) |
| 13–14: hotfix posterior à release | Branch `hotfix/1.0.1` criada de `main`; [3cabcf9 — correção exclusiva e teste de regressão](https://github.com/sidsidoso/cardapio-digital-gitflow/commit/3cabcf9) |
| 15–16: finalização e publicação do hotfix | Merges de `hotfix/1.0.1` em `main` e `develop`; [tag anotada 1.0.1](https://github.com/sidsidoso/cardapio-digital-gitflow/tree/1.0.1) |
| 17: conferência | [Histórico de main](https://github.com/sidsidoso/cardapio-digital-gitflow/commits/main), [histórico de develop](https://github.com/sidsidoso/cardapio-digital-gitflow/commits/develop), [branches](https://github.com/sidsidoso/cardapio-digital-gitflow/branches) e [tags](https://github.com/sidsidoso/cardapio-digital-gitflow/tags) |

## Fluxo executado

Comandos centrais, intercalados com as edições e os commits indicados acima:

```sh
git init -b main
git remote add origin https://github.com/sidsidoso/cardapio-digital-gitflow.git
git add README.md .gitignore index.html
git commit -m "chore: cria estrutura inicial do Cardápio Digital"
git flow init -d
git flow feature start listar-produtos
# Commit dos produtos; depois, commit da apresentação e testes.
git flow feature finish -k listar-produtos
git push -u origin main develop feature/listar-produtos
git flow release start 1.0.0
# Commit específico dos preços e atualização da versão.
git flow release finish -k -m "Versão 1.0.0: cardápio com três produtos e preços" 1.0.0
git push -u origin main develop release/1.0.0 --tags
git flow hotfix start 1.0.1
# Commit exclusivo da correção; depois, versão e documentação das evidências.
git flow hotfix finish -k -m "Versão 1.0.1: correção do nome do hambúrguer" 1.0.1
git push -u origin main develop feature/listar-produtos release/1.0.0 hotfix/1.0.1 --tags
```

GitFlow AVH 1.12.3 executado pelo Git Bash. O prefixo das tags está vazio:
as tags são **1.0.0** e **1.0.1**, sem `v`. A opção `-k` mantém as branches
auxiliares para inspeção, sem impedir os merges de finalização.
A publicação inicial precisou de uma segunda tentativa devido à propriedade
da pasta no ambiente isolado; a release foi criada nesse intervalo, antes de qualquer edição de preços.

## Conferência em uma cópia nova

```sh
git clone https://github.com/sidsidoso/cardapio-digital-gitflow.git
cd cardapio-digital-gitflow
git branch -a
git log --graph --oneline --decorate --all
git show 1.0.0:app.js
git diff 1.0.0 1.0.1 -- app.js
git cat-file -t refs/tags/1.0.0
git cat-file -t refs/tags/1.0.1
npm test
npm run check
```

Os dois comandos `git cat-file` devem exibir `tag`, identificando tags anotadas.
O diff de `app.js` entre as versões mostra somente a correção de
`Hambúrgue Artesanal` para `Hambúrguer Artesanal`, com os preços preservados.
Para verificar a propagação, os comandos abaixo devem terminar com código zero:

```sh
git merge-base --is-ancestor 1.0.0 1.0.1
git merge-base --is-ancestor 3cabcf9 origin/main
git merge-base --is-ancestor 3cabcf9 origin/develop
git diff --exit-code origin/main origin/develop
```

A configuração do GitFlow fica em `.git/config` e não é versionada. Caso queira
continuar o desenvolvimento após clonar, crie `develop` local com
`git switch --track origin/develop` e execute `git flow init -d`, mantendo `main`
como produção e `develop` como desenvolvimento.

## Validação funcional

- Feature: dois testes passaram, além da checagem de sintaxe.
- Release: quatro testes passaram, incluindo preços e sua exibição em reais.
- Hotfix: o teste novo falhou com o nome antigo; após a correção, os cinco testes passaram.
- Nenhuma dependência externa; os testes usam `node:test` e `node:assert/strict`.
- A renderização é verificada com um documento simulado; não equivale a um teste visual em navegador.
- `index.html` funciona diretamente no navegador, sem servidor ou instalação.
