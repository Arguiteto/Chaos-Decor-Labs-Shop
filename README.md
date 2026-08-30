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
| `produto.html` | Página da peça: galeria, cor do filamento, quantidade, ficha e relacionadas |
| `favoritas.html` | Peças salvas no navegador, com "add ao carrinho" e o botão de interesse |
| `carrinho.html` | Itens, cor, quantidade, resumo e o pedido pelo WhatsApp |
| `politicas.html` | **Obrigatória por lei.** Entrega, trocas, arrependimento, LGPD, termos |

## Arquivos compartilhados

| Arquivo | O que faz |
|---|---|
| `chaos-dados.js` | **O catálogo.** Produtos, fichas técnicas, preços, ícones, topo e rodapé |
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

Depois preencha a **ficha** dela em `FICHAS`, no mesmo arquivo — é o que
alimenta a página do produto:

```js
'vaso-p': {
  descricao:'Vaso de mesa em cilindro com base chanfrada…',
  medidas:'⌀ 9 × 14 cm',
  peso:'95 g',
  cores:['vermelho','navy','mostarda','verde','creme'],  // filamentos que você imprime
},
```

Material, prazo e avisos de uso vêm de `FICHA_PADRAO` e valem para todas as
peças — mude lá uma vez e muda em todas. Peça sem ficha cadastrada aparece com
`(XXXXX)` no lugar do dado, de propósito: é pra saltar aos olhos, não pra
passar batido.

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

## Tipografia

Uma família só, **Helvetica**, em dois pesos (regular e bold) — do jeito suíço.
Helvetica é licenciada e não se baixa da web, então a pilha em `chaos-loja.css`
pega a que existir na máquina de quem visita:

```css
--font-body: 'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', 'Nimbus Sans', sans-serif;
```

| Sistema | O que aparece de verdade |
|---|---|
| Mac e iPhone | Helvetica Neue — a fonte real |
| Windows | Arial — mesmas medidas, desenho quase igual |
| Linux | Liberation / Nimbus Sans — clones métricos |
| Android | a sans do sistema (Roboto) |

Como todas têm a **mesma métrica**, o layout não muda de máquina pra máquina:
nada quebra, nada desalinha. E como não há webfont, o site não depende de
nenhum servidor externo pra carregar — abre mais rápido e funciona offline.

Só existem os pesos **400 e 700** no CSS. Pedir 500, 600 ou 800 faria o
navegador engordar a letra na marra (*fake bold*), que borra na tela.

> Nota: a referência de marca em `marca.md` pede tipografia **geométrica**
> (Futura/Poppins). Helvetica é **neo-grotesca** — outra escola, igualmente
> modernista. A troca foi decisão de projeto; se ela virar padrão da marca,
> vale atualizar o `marca.md` pra os dois não se contradizerem.

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

## ⚠️ Preencha antes de publicar — os (XXXXX)

Razão social, CNPJ, Inscrição Estadual e endereço já estão preenchidos no
objeto `EMPRESA`, no topo do `chaos-dados.js`, com os dados do CCIS/SEFAZ-MS.
**Ainda faltam quatro coisas:**

**Nada.** Razão social, CNPJ, IE, endereço, contato, WhatsApp, formas de
pagamento, tabela de parcelamento e data das políticas estão todos preenchidos.

Só confira uma vez, depois de publicar: clique em **"Fechar pedido pelo
WhatsApp"** no carrinho e veja se cai na sua conversa com o pedido escrito.
O número foi montado como `5567991895835` — o que você passou tinha 8 dígitos
e celular tem 9, então entrou o nono.

### 🔒 A loja está em modo "Em breve"

Enquanto as peças e os preços não são os definitivos, o site mostra o catálogo
mas **não deixa ninguém comprar** — ninguém escolhe por engano uma peça que
ainda não existe, nem paga um preço de exemplo.

Com `MODO_EM_BREVE.ativo = true` (no `chaos-dados.js`):

- nome e preço aparecem como **"Em breve"** em todas as páginas;
- os botões de comprar e de favoritar somem;
- carrinho e favoritas ficam vazios — inclusive o que já estivesse salvo no
  navegador de quem entrou antes;
- some a ordenação por preço, que não faria sentido;
- uma faixa no topo avisa que o catálogo está em preparação e chama pro WhatsApp.

**Para abrir a loja:** troque `ativo` para `false`. Uma linha, e o site inteiro
volta a vender.

```js
const MODO_EM_BREVE = {
  ativo: true,           // ← false quando o catálogo estiver pronto
  esconderNome:  true,   // false = mantém o nome da peça, esconde só o preço
  esconderPreco: true,
};
```

Se quiser um meio-termo — mostrar o nome das peças e esconder só o preço —
basta `esconderNome: false`.

### O que deixamos de publicar (e o que isso implica)

A pedido seu, saíram da tela: **razão social, nome fantasia (na ficha), Inscrição
Estadual e endereço**. Continuam guardados no objeto `EMPRESA` — servem para
proposta, documento no timbrado e nota fiscal — mas não vão mais para o site.
Publicados hoje: **CNPJ, e-mail e WhatsApp**.

Vale você saber o que isso significa, para decidir com a informação na mão:

- O Decreto 7.962/2013, art. 2º, I e II, pede **nome empresarial, CNPJ e
  endereço físico** visíveis. Com só o CNPJ, o site fica parcialmente fora
  dessa exigência. Na prática o CNPJ já permite a qualquer pessoa (e ao Procon)
  chegar aos outros dados numa consulta pública — mas a exigência é de exibir.
- **Meio-termo, se quiser:** publicar apenas **cidade e UF** ("Campo Grande/MS")
  em vez do endereço completo. Atende à ideia de localizar o vendedor sem expor
  o número da sua casa. É o que muitos MEIs que produzem em casa fazem. Me
  avise que eu coloco.

Também saíram, a pedido: os avisos de que a peça **não é estanque** e de que
**não vai em forno, micro-ondas ou lava-louças**, e a frase em linguagem simples
sobre o que a garantia cobre. A garantia legal de 90 dias continua declarada.

> Sobre o "não é estanque": esse é o aviso que mais evita devolução em vaso
> impresso. Sem ele, o cliente que puser água direto e vir vazar tem argumento
> de que não foi informado. Se quiser, dá para trazer de volta só esse, escrito
> de um jeito mais leve — por exemplo, dizendo que os vasos **acompanham ou
> pedem um copo interno**, o que soa como característica do produto em vez de
> defeito.

### Quem paga a taxa da InfinitePay?

As taxas em `PAGAMENTO.taxas` são as da InfinitePay no **link de pagamento**, e
elas são cobradas **de você**, descontadas da venda. Não são juros do cliente.
A InfinitePay tem um botão **"Repassar taxas"** que decide quem paga a conta, e
o site precisa dizer a mesma coisa que está ligada lá:

| Na InfinitePay | `repassaTaxa` | O que o site diz | Quem paga |
|---|---|---|---|
| Repassar taxas **ligado** | `true` | "12× com juros" + tabela completa | o cliente |
| Repassar taxas **desligado** | `false` | "12× sem juros" | você, da sua margem |

**Está em `true` e confirmado**: o repasse está ligado na conta InfinitePay, o
cliente paga o acréscimo e o site declara isso com a tabela completa.

Uma consequência que vale para a precificação: como a taxa não sai do seu
bolso, **o site é o seu canal sem comissão**. Diferente de Shopee e Mercado
Livre, aqui não há gross-up de taxa a fazer — o preço de tabela é o que você
recebe. Se um dia desligar o repasse, aí sim a taxa vira custo de canal e entra
no preço por `preço/(1−taxa)`: numa peça de R$ 159 em 12×, os 16,66% levariam
R$ 26,49, mais de vinte vezes o que o DAS custa naquela venda.

### Parcelamento com juros: o artigo 52 do CDC

Vender parcelado **com juros** obriga a informar, **antes** de o cliente
confirmar a compra: preço à vista, taxa de juros ao mês e efetiva ao ano,
acréscimos, número e periodicidade das parcelas, e o total a pagar com o
financiamento. Também vale saber:

- multa por atraso não pode passar de **2% da parcela** (art. 52, § 1º);
- o cliente pode **quitar antes** com redução proporcional dos juros (§ 2º).

A página de políticas **calcula e publica essa tabela sozinha** a partir de
`PAGAMENTO.taxas` — parcela, total, acréscimo e juros efetivo ao mês e ao ano.
Mexeu na taxa, a tabela se refaz. A página do produto e o carrinho mostram
"até 12× de R$ X" com o mesmo cálculo.

O que ainda depende de você: **abrir o link de pagamento da InfinitePay e
conferir se a tela mostra a taxa e o total ao cliente** antes da confirmação.
Não basta estar no contrato deles nem na sua página de políticas.

Um detalhe a alinhar: o e-mail publicado no site é o **gmail**, mas no CCIS
consta o **hotmail**. Notificação oficial vai para o registrado — vale deixar
os dois iguais, ou pelo menos manter o hotmail sob o seu olho.

## Favoritas e carrinho: salvos no navegador, não em banco

As duas listas usam `localStorage` — o navegador do visitante guarda e devolve
na próxima visita. Sem servidor, sem banco, sem conta de usuário.

**O que isso resolve:** a pessoa favorita hoje, fecha o navegador, volta na
semana que vem e a lista está lá. O carrinho também sobrevive à navegação entre
páginas — dá pra montar o pedido aos poucos.

**O que isso NÃO resolve — e é importante:**

| Limite | Consequência prática |
|---|---|
| É por navegador e por aparelho | Favoritou no celular não aparece no computador |
| Some ao limpar dados do site | Aba anônima nunca guarda nada |
| **Você não enxerga** | O dado nunca sai do aparelho do cliente |

Aquela sua anotação no wireframe — *"item curtido cria um aviso pra mim"* — é
justamente a parte que exige conta de usuário e banco de dados. O que dá pra
fazer sem isso está na página de Favoritas: o botão **"Tenho interesse nestas
peças"** abre o WhatsApp com a lista pronta. O cliente decide mandar, e você
recebe o interesse com a peça já escolhida — sem rastrear ninguém pelas costas.

Tudo passa por `try/catch`: em aba anônima e com cookies bloqueados o navegador
**lança erro** só de tocar no `localStorage`, e sem essa proteção a página
inteira quebraria. Testado: com o storage bloqueado, o site funciona normal,
só não lembra.

A política de privacidade declara isso, como a LGPD pede.

## Como o pedido fecha (pelo WhatsApp)

O site **não tem checkout automático**, e isso é uma escolha: GitHub Pages só
serve arquivos, não roda código de servidor — e o Checkout Integrado da
InfinitePay exige uma chamada de servidor. O caminho escolhido dispensa isso:

1. O cliente monta o carrinho escolhendo peça, **cor** e quantidade.
2. "Fechar pedido pelo WhatsApp" abre sua conversa com o pedido já escrito,
   itemizado, com subtotal e um campo "Meu CEP:" para ele completar.
3. Você confere, cota o frete pelo CEP e devolve o **link de pagamento da
   InfinitePay** com o total exato.

Vantagem: resolve frete e pedido com várias peças sem servidor nenhum, e põe
você em contato com o cliente — que, para peça sob encomenda com escolha de
cor, costuma ajudar a fechar. Custo: o pedido não é automático, depende de
você responder.

**Quando quiser automatizar**, o caminho é o Checkout Integrado da InfinitePay
(`POST api.checkout.infinitepay.io/links`). Ele precisa de um servidor, então a
migração é trocar a hospedagem do GitHub Pages para **Vercel, Netlify ou
Cloudflare** — todos gratuitos, aceitam exatamente estes mesmos arquivos e
permitem uma função pequena que faz essa chamada. O site não precisa ser
refeito.

## O que a lei exige de um site de venda

O **Decreto 7.962/2013** — a "Lei do E-commerce", que regulamenta o Código de
Defesa do Consumidor para vendas online — manda o site exibir em destaque:

| Exigência | Onde está resolvido |
|---|---|
| Nome empresarial e CNPJ (art. 2º, I) | rodapé de todas as páginas + `politicas.html#empresa` |
| Endereço físico e eletrônico, contato (art. 2º, II) | rodapé + seção "Quem vende" |
| Características essenciais e riscos do produto (art. 2º, III) | ficha e avisos na página de cada peça |
| Despesas adicionais, frete (art. 2º, IV) | "sem frete" no card + seção "Prazos e entrega" |
| Condições da oferta e formas de pagamento (art. 2º, V) | seção "Formas de pagamento" |
| Preço à vista, juros e total no parcelamento (CDC, art. 52) | seção "Formas de pagamento" + checkout |
| Canal de atendimento, resposta em 5 dias (art. 4º) | rodapé + seção "Atendimento" |
| Direito de arrependimento e como exercer (art. 5º) | link na página do produto, no carrinho e seção própria |
| Garantia legal de 90 dias (CDC, art. 26) | seção "Trocas, defeitos e garantia" |
| Tratamento de dados (LGPD) | seção "Privacidade" |

## O que este site **não** resolve

- **Nota fiscal.** O CCIS traz **Contribuinte ICMS: SIM**, e a atividade
  principal é industrial (CNAE 2229-3/99 — fabricação de artefatos de material
  plástico). Isso confirma a obrigação de emitir documento fiscal eletrônico
  (NF-e, e NFC-e na venda presencial ao consumidor) a cada venda. Confirme com
  a **SEFAZ-MS** e com seu contador o modelo e o prazo que se aplicam.
  Um site não emite nota; quem emite é você ou a plataforma.
- **Checkout automático.** O pedido fecha pelo WhatsApp, não por um checkout
  no site (veja abaixo). Cobrança, frete e rastreio passam por você.
- **Aval jurídico.** Os textos das políticas são um modelo bem construído e
  fiel à lei citada, não uma peça revisada para o seu caso. Antes de publicar,
  peça a um advogado ou ao seu contador para bater o olho — principalmente na
  parte de peças personalizadas.

---

## Antes de vender de verdade

Quatro pontos que **não** estão resolvidos aqui, de propósito:

1. **Preços, medidas e pesos do `chaos-dados.js` são de exemplo** — por isso a
   loja está em modo "Em breve" (veja acima). Substitua Substitua pelos valores da
   precificação real (custo do filamento por grama, tempo de impressão, energia,
   depreciação, mão de obra, fator de falha, margem e o gross-up da taxa de cada
   canal). Preço não sai no chute — e medida errada no anúncio vira devolução:
   meça a peça impressa antes de publicar.
2. **Favoritas e carrinho ficam no navegador do cliente** (veja a seção abaixo),
   não num banco de dados. Estoque, pagamento e frete continuam fora do site.
3. **Prazo é promessa.** O site declara produção sob encomenda em 3 a 5 dias
   úteis, em `FICHA_PADRAO.prazo`. Confirme contra a sua fila real de impressão
   antes de publicar.
4. **Não há avaliações.** A referência que inspirou a página traz nota e número
   de reviews; aqui isso ficou de fora de propósito — estrela inventada é
   propaganda enganosa. Quando houver avaliação de verdade, ela entra com a
   origem declarada.

Verdade no anúncio: material real, medidas reais, prazo real.

---

Chaos Decos Labs · design 3D
