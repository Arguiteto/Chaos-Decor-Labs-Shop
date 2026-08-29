# Chaos Decos Labs — Loja

Vitrine da **Chaos Decos Labs**: objetos de decoração impressos em 3D, com
linguagem Bauhaus — forma segue função, geometria clara, cor com propósito.

Site estático: HTML, CSS e JavaScript puros. Sem build, sem instalação, sem
dependência. Abrir o `index.html` no navegador já funciona.

---

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Home (hall): carrossel grande de produtos + carrossel "Decor para casa" |
| `produtos.html` | Catálogo: grade com filtro por categoria e ordenação por preço/nome |
| `wishlist.html` | Peças salvas, com "add ao carrinho" e remover |
| `carrinho.html` | Itens, quantidade e resumo do pedido |

## Arquivos compartilhados

| Arquivo | O que faz |
|---|---|
| `chaos-dados.js` | **O catálogo.** Produtos, categorias, preços, ícones, topo e rodapé |
| `chaos-loja.css` | **O visual.** Cores, tipografia e layout de todas as páginas |
| `assets/` | Onde entram as fotos reais dos produtos |

Topo e rodapé são gerados pelo `chaos-dados.js`, então nunca ficam diferentes
entre uma página e outra: mexeu num lugar, mudou em todas.

---

## Como adicionar um produto

Abra `chaos-dados.js`, ache `const PRODUTOS` e copie um bloco:

```js
{
  id:'vaso-p',                  // identificador único, sem espaço
  nome:'Vaso Bauhaus P',
  colecao:'Primária',
  preco: 89,                    // número, sem "R$"
  categoria:'Vasos & Cachepôs',
  art:'art-a', art2:'art-a2',   // composição geométrica (1ª foto e hover)
  flag:'novo'                   // opcional: 'novo' | 'lancamento' | 're-estoque'
},
```

A categoria nova aparece sozinha no filtro da página de produtos.

## Como trocar a arte pela foto real

As composições geométricas (`art-a` … `art-i`) são provisórias. Coloque a
imagem em `assets/` e informe o caminho no produto:

```js
{ id:'vaso-p', nome:'Vaso Bauhaus P', /* … */
  src:'assets/vaso-p-1.jpg',    // foto principal
  src2:'assets/vaso-p-2.jpg' }  // foto que aparece no hover
```

Havendo `src`, a foto substitui a arte automaticamente — não precisa mexer em
HTML nem CSS.

## Como mudar as cores

Tudo sai das variáveis no topo do `chaos-loja.css`:

```css
--red:#C1392B;   --navy:#1B396B;   --mustard:#E9A11B;
--green:#4E7A3F; --cream:#F0E4D0;  --ink:#1A1A1A;
```

Regra da marca: fundo creme, no máximo 1–2 primárias por peça de comunicação.

---

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Loja Chaos Decos Labs: home, produtos, wishlist e carrinho"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) →
Save**. Em alguns minutos o site sai no ar em
`https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

O arquivo `.nojekyll` já está incluso — ele evita que o GitHub tente processar
o site como blog e ignore pastas.

---

## Antes de vender de verdade

Três pontos que **não** estão resolvidos aqui, de propósito:

1. **Os preços do `chaos-dados.js` são de exemplo.** Substitua pelos valores da
   precificação real (custo do filamento por grama, tempo de impressão, energia,
   depreciação, mão de obra, fator de falha, margem e o gross-up da taxa de cada
   canal). Preço não sai no chute.
2. **Wishlist e carrinho são maquete.** Guardam os itens só enquanto a página
   está aberta; ao trocar de página voltam ao exemplo. Carrinho, estoque,
   pagamento e frete precisam de uma plataforma de e-commerce ou de um backend.
3. **Prazo é promessa.** O carrinho declara produção sob encomenda em até 5 dias
   úteis. Confirme esse número contra a sua fila real de impressão antes de
   publicar, e ajuste no `carrinho.html`.

Verdade no anúncio: material real, medidas reais, prazo real.

---

Chaos Decos Labs · design 3D
