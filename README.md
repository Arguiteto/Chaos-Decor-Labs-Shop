# Chaos Decos Labs — Em breve

Página única de espera, com aviso e link para o Instagram.

**Este repositório contém só esta página, de propósito.** O site da loja fica
guardado fora do ar até a hora de abrir — assim não existe loja escondida atrás
de uma cortina para alguém tentar burlar. Não há o que burlar.

## O que tem aqui

| Arquivo | O que é |
|---|---|
| `index.html` | A página inteira: HTML, CSS e nada mais. Sem JavaScript, sem arquivo externo |
| `.nojekyll` | Evita que o GitHub processe o site como blog |

## Como mexer

Tudo está dentro do `index.html`:

- **Instagram** — o `href` do botão e o texto do `@`, logo abaixo dele.
- **Texto do aviso** — o parágrafo depois do "Em breve".
- **Cores** — o bloco `:root`, no topo do `<style>`.

## Publicar

```bash
git add .
git commit -m "Tela em breve"
git push
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.

## Quando a loja abrir

Substitua o conteúdo deste repositório pelos arquivos do site completo. O
`index.html` da loja toma o lugar deste, e a `em-breve.html` some junto com a
cortina.
