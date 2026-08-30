/* ══════════════════════════════════════════════════════════════
   CHAOS DECOS LABS — DADOS E COMPORTAMENTO COMPARTILHADOS
   ──────────────────────────────────────────────────────────────
   Vale para todas as páginas: loja, produtos, wishlist, carrinho.
   É AQUI que você mexe no catálogo — só neste arquivo.

   ⚠️ PREÇOS SÃO EXEMPLO. Antes de publicar, troque pelos valores
   que saírem da precificação real (custo + margem + gross-up da
   taxa do canal). Preço não sai no chute.

   ⚠️ MAQUETE: wishlist e carrinho guardam os itens só enquanto a
   página está aberta (memória). Ao trocar de página eles voltam
   ao exemplo. Quando a loja for pra valer, esse estado vem da
   plataforma (Shopify/Nuvemshop/backend próprio).

   COMO ADICIONAR UM PRODUTO: copie um bloco de PRODUTOS e edite.
     id        → identificador único, sem espaço
     nome      → nome da peça
     colecao   → linha/coleção a que pertence
     preco     → número em reais (sem "R$")
     art       → arte geométrica da 1ª foto  (art-a … art-i)
     art2      → arte geométrica do hover    (art-a2 … art-f2)
     flag      → selo opcional: 'novo' | 'lancamento' | 're-estoque'
     categoria → usada nos filtros
     src       → (opcional) 'assets/foto.jpg' — se existir, a foto
                 real substitui a arte geométrica
     src2      → (opcional) segunda foto, a que aparece no hover
   ══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   DADOS DA EMPRESA — OBRIGATÓRIOS POR LEI
   ──────────────────────────────────────────────────────────────
   O Decreto 7.962/2013 (a "Lei do E-commerce") manda o site exibir
   EM DESTAQUE: nome empresarial, CNPJ, endereço físico, endereço
   eletrônico e contato. Isso alimenta o rodapé e a página de
   políticas — mexe aqui e muda em todo lugar.

   ⚠️ PREENCHA OS (XXXXX) ANTES DE PUBLICAR. Site no ar sem CNPJ
   e sem endereço é infração ao CDC, e é a primeira coisa que o
   Procon olha numa reclamação.
   ══════════════════════════════════════════════════════════════ */
const EMPRESA = {
  fantasia:     'Chaos Decos Labs',
  razaoSocial:  '68.696.364 CARLOS EDUARDO MARIO ARGUELLO MARTINS DIAS BOICO',
  cnpj:         '68.696.364/0001-91',
  ie:           '50.040.404-6',       // Inscrição Estadual MS — contribuinte de ICMS
  endereco:     'R. Barigui, 58 — Parque dos Novos Estados',
  cidade:       'Campo Grande/MS',
  cep:          '79034-410',
  email:        'chaosdecorlabs@gmail.com',   // ⚠️ no CCIS consta o hotmail — alinhe os dois
  whatsappLink: 'https://wa.me/message/DAOAAENEEHYBA1',
  /* ⚠️ NECESSÁRIO PARA O PEDIDO POR WHATSAPP.
     Número em formato internacional, só dígitos: 55 + DDD + número.
     Ex.: '5567991166902'. O link curto wa.me/message/... abre a conversa
     mas NÃO aceita mensagem pronta — sem este campo, o site copia o
     pedido para a área de transferência e pede pro cliente colar. */
  whatsappE164: '5567991895835',

  whatsappNumero: '(67) 99189-5835',  // como aparece escrito no site
  prazoResposta:'5 dias úteis',       // prazo legal de resposta (Decreto 7.962, art. 4º)
  arrependimento: 7,                  // dias — CDC art. 49
};

/* ══════════════════════════════════════════════════════════════
   MODO "EM BREVE" — VITRINE SEM VENDA
   ──────────────────────────────────────────────────────────────
   Enquanto as peças e os preços não são os definitivos, o site
   mostra o catálogo mas NÃO deixa ninguém comprar. Assim ninguém
   escolhe por engano uma peça que ainda não existe, nem paga um
   preço de exemplo.

   O que acontece com ativo:true
     · nome e preço aparecem como "Em breve"
     · botões de comprar e de favoritar somem
     · carrinho e favoritas ficam vazios (inclusive o que já
       estivesse salvo no navegador de quem testou antes)
     · uma faixa no topo avisa que o catálogo está em preparação

   PARA ABRIR A LOJA: troque ativo para false. Uma linha só, e o
   site inteiro volta a vender.                                    */
const MODO_EM_BREVE = {
  ativo: true,
  esconderNome:  true,   // false = mantém o nome da peça, esconde só o preço
  esconderPreco: true,
};

function emBreve(){ return MODO_EM_BREVE.ativo; }

function nomeExibido(p){
  return (emBreve() && MODO_EM_BREVE.esconderNome) ? 'Em breve' : p.nome;
}
function precoExibido(p){
  return (emBreve() && MODO_EM_BREVE.esconderPreco) ? 'Em breve' : precoBR(p.preco);
}

/* ── Formas de pagamento ──────────────────────────────────────
   ⚠️ PARCELAMENTO COM JUROS tem regra própria: o CDC (art. 52)
   obriga a informar ANTES da compra o preço à vista, a taxa de
   juros (ao mês e efetiva ao ano), o número de parcelas e o total
   a pagar com o financiamento. Se quem cobra os juros é a
   maquininha/gateway, esses números aparecem no checkout — mas
   têm que aparecer antes de o cliente confirmar, não depois.     */
const PAGAMENTO = {
  formas:   ['Pix', 'Cartão de débito', 'Cartão de crédito'],
  parcelas: 12,

  /* ⚠️ A CHAVE QUE MUDA TUDO.
     As taxas abaixo são as da InfinitePay no LINK DE PAGAMENTO, e elas são
     cobradas DE VOCÊ, descontadas da venda — não são juros do cliente.
     A InfinitePay tem um botão "Repassar taxas" que decide quem paga:

     repassaTaxa: true  → o cliente paga mais. O site diz "com juros" e mostra
                          a taxa, o total e o valor da parcela (CDC, art. 52).
     repassaTaxa: false → o cliente paga o mesmo em 1x ou 12x. O site tem de
                          dizer "SEM juros", e a taxa sai da sua margem — numa
                          peça de R$ 159 em 12x, são R$ 26,49 que somem.

     Deixe este valor igual ao que está ligado na sua conta InfinitePay.
     Site dizendo "com juros" quando o cliente não paga juros é informação
     errada no anúncio; o contrário é pior ainda.                            */
  repassaTaxa: true,

  /* Taxa por número de parcelas, em % (InfinitePay, link de pagamento).
     Reconfira quando a InfinitePay reajustar — a taxa cai conforme seu
     faturamento mensal sobe. */
  taxas: { 1:4.20, 2:6.09, 3:7.01, 4:7.91, 5:8.80, 6:9.67,
           7:12.59, 8:13.42, 9:14.25, 10:15.06, 11:15.87, 12:16.66 },
};

/* ── Cálculo do parcelamento ──────────────────────────────────
   Devolve, para cada número de parcelas, tudo que o artigo 52 do
   CDC manda informar: valor da parcela, total a pagar, quanto é
   acréscimo e a taxa de juros efetiva ao mês e ao ano.           */
function parcelamento(precoVista){
  return Object.keys(PAGAMENTO.taxas).map(Number).map((n) => {
    const taxa  = PAGAMENTO.taxas[n] / 100;
    const total = PAGAMENTO.repassaTaxa ? precoVista / (1 - taxa) : precoVista;
    const parcela = total / n;

    /* Taxa efetiva: qual juros mensal faz n parcelas de "parcela"
       valerem hoje o preço à vista. Resolvido por bisseção. */
    let jurosMes = 0;
    /* Em 1× não existe "juros ao mês": é uma cobrança única, e o que
       há é um acréscimo sobre o preço à vista. Mostrar taxa mensal
       ali confundiria o cliente em vez de informar. */
    if (PAGAMENTO.repassaTaxa && total > precoVista && n > 1){
      let baixo = 0, alto = 1;
      for (let k = 0; k < 100; k++){
        const meio = (baixo + alto) / 2;
        let vp = 0;
        for (let m = 1; m <= n; m++) vp += parcela / Math.pow(1 + meio, m);
        if (vp > precoVista) baixo = meio; else alto = meio;
      }
      jurosMes = (baixo + alto) / 2;
    }

    return {
      n, taxa: PAGAMENTO.taxas[n], parcela, total,
      acrescimo: total - precoVista,
      jurosMes: jurosMes * 100,
      jurosAno: (Math.pow(1 + jurosMes, 12) - 1) * 100,
    };
  });
}

/* Frase curta para a página do produto: "12x de R$ 15,90 com juros" */
function chamadaParcelamento(precoVista){
  const ultima = parcelamento(precoVista).find((p) => p.n === PAGAMENTO.parcelas);
  if (!ultima) return '';
  const juros = PAGAMENTO.repassaTaxa ? 'com juros' : 'sem juros';
  return `até ${ultima.n}× de ${precoBR2(ultima.parcela)} ${juros}`;
}

/* Preço com centavos — parcela sem centavo engana o cliente */
function precoBR2(valor){
  return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ── Pedido por WhatsApp ──────────────────────────────────────
   O carrinho não fecha a compra sozinho: ele monta o pedido em
   texto e joga na sua conversa. Você confere o CEP, calcula o frete
   e devolve o link de pagamento da InfinitePay com o total exato.
   Sem servidor nenhum — e com o cliente na sua mão, que para peça
   sob encomenda, com cor escolhida, costuma ajudar a fechar.      */
function textoDoPedido(linhas, subtotal){
  const itens = linhas.map((l) => {
    const cor = l.cor && CORES_FILAMENTO[l.cor] ? ` — cor ${CORES_FILAMENTO[l.cor].nome}` : '';
    return `• ${l.qtd}× ${l.produto.nome}${cor} — ${precoBR2(l.produto.preco * l.qtd)}`;
  }).join('\n');

  return [
    `Olá! Quero fechar este pedido na ${EMPRESA.fantasia}:`,
    '',
    itens,
    '',
    `Subtotal: ${precoBR2(subtotal)} (sem frete)`,
    '',
    'Meu CEP: ',
  ].join('\n');
}

/* ── "Tenho interesse nestas peças" ───────────────────────────
   O jeito de você saber que alguém favoritou algo sem ter banco de
   dados: o próprio cliente manda a lista, se quiser. É consentido,
   e quem chega já vem com a peça escolhida na mão.               */
function linkInteresseWhatsApp(pecas){
  if (!EMPRESA.whatsappE164 || !pecas.length) return null;
  const texto = [
    `Olá! Tenho interesse nestas peças da ${EMPRESA.fantasia}:`,
    '',
    pecas.map((p) => `• ${p.nome} — ${precoBR2(p.preco)}`).join('\n'),
    '',
    'Pode me falar mais sobre elas?',
  ].join('\n');
  return 'https://wa.me/' + EMPRESA.whatsappE164 + '?text=' + encodeURIComponent(texto);
}

/* Link que abre a conversa já com o pedido escrito. Só funciona com
   o número em whatsappE164; sem ele devolve null e a página usa o
   plano B (copiar o pedido para o cliente colar). */
function linkPedidoWhatsApp(linhas, subtotal){
  if (!EMPRESA.whatsappE164) return null;
  return 'https://wa.me/' + EMPRESA.whatsappE164 + '?text=' + encodeURIComponent(textoDoPedido(linhas, subtotal));
}

/* WhatsApp: mostra o número junto se ele estiver confirmado. */
function whatsappHTML(rotulo){
  const texto = EMPRESA.whatsappNumero || (rotulo || 'Chamar no WhatsApp');
  return `<a href="${EMPRESA.whatsappLink}" target="_blank" rel="noopener">${texto}</a>`;
}

const PRODUTOS = [
  { id:'vaso-p',      nome:'Vaso Cilindro P',       colecao:'Primária', preco: 89, art:'art-a', art2:'art-a2', categoria:'Vasos & Cachepôs', flag:'novo' },
  { id:'cachepo-mod', nome:'Cachepô Módulo',       colecao:'Módulo',   preco:119, art:'art-b', art2:'art-b2', categoria:'Vasos & Cachepôs' },
  { id:'lum-cil',     nome:'Luminária Cilindro',   colecao:'Forma',    preco:159, art:'art-c', art2:'art-c2', categoria:'Luminárias', flag:'lancamento' },
  { id:'porta-grid',  nome:'Porta-Trecos Grid',    colecao:'Grid',     preco: 69, art:'art-d', art2:'art-d2', categoria:'Organizadores' },
  { id:'suporte-geo', nome:'Suporte Geométrico',   colecao:'Forma',    preco: 79, art:'art-e', art2:'art-e2', categoria:'Objetos de Mesa' },
  { id:'org-prim',    nome:'Organizador Primária', colecao:'Primária', preco: 99, art:'art-f', art2:'art-f2', categoria:'Organizadores', flag:'re-estoque' },
  { id:'vaso-g',      nome:'Vaso Cilindro G',       colecao:'Primária', preco:139, art:'art-g', art2:'art-a2', categoria:'Vasos & Cachepôs' },
  { id:'bandeja-mod', nome:'Bandeja Módulo',       colecao:'Módulo',   preco: 74, art:'art-h', art2:'art-c2', categoria:'Objetos de Mesa' },
  { id:'lum-mesa',    nome:'Luminária de Mesa',    colecao:'Oficina',  preco:189, art:'art-i', art2:'art-b2', categoria:'Luminárias', flag:'novo' },
  { id:'porta-lapis', nome:'Porta-Lápis Grid',     colecao:'Grid',     preco: 49, art:'art-e', art2:'art-f2', categoria:'Objetos de Mesa' },
  { id:'cachepo-p',   nome:'Cachepô Primária P',   colecao:'Primária', preco: 64, art:'art-f', art2:'art-d2', categoria:'Vasos & Cachepôs' },
  { id:'org-oficina', nome:'Organizador Oficina',  colecao:'Oficina',  preco:109, art:'art-c', art2:'art-e2', categoria:'Organizadores' },
];

const CATEGORIAS = [
  { nome:'Vasos & Cachepôs', art:'art-b' },
  { nome:'Luminárias',       art:'art-g' },
  { nome:'Organizadores',    art:'art-h' },
  { nome:'Objetos de Mesa',  art:'art-i' },
  { nome:'Porta-Trecos',     art:'art-d' },
];

/* ══════════════════════════════════════════════════════════════
   FICHA TÉCNICA DE CADA PEÇA (usada na página do produto)
   ──────────────────────────────────────────────────────────────
   ⚠️ MEDIDAS, PESO E TEMPO SÃO EXEMPLO. Troque pelos números
   medidos na peça real e pelo tempo que o slicer mostrar. Medida
   errada no anúncio vira devolução — e a marca promete medida real.

   cores → quais filamentos da paleta você imprime naquela peça.
           Vira a bolinha de seleção na página do produto.
   ══════════════════════════════════════════════════════════════ */
const FICHA_PADRAO = {
  material: 'PLA — filamento de origem vegetal, rígido e sem cheiro',
  prazo:    'Impressa sob encomenda: 3 a 5 dias úteis de produção, antes do envio',
  cuidados: [
    'Limpe com pano úmido e sabão neutro.',
    'Não deixe em carro fechado nem sob sol direto: acima de ~55 °C o PLA amolece e a peça entorta.',
  ],
};

const FICHAS = {
  'vaso-p':      { descricao:'Vaso de mesa em cilindro com base chanfrada. Segura flor seca, galho ou um copo interno com água.', medidas:'⌀ 9 × 14 cm', peso:'95 g',  cores:['vermelho','navy','mostarda','verde','creme'] },
  'cachepo-mod': { descricao:'Cachepô modular: encaixa em outro igual para formar coluna. Cabe vaso plástico de 11 cm.',         medidas:'13 × 13 × 12 cm', peso:'140 g', cores:['navy','mostarda','verde','creme'] },
  'lum-cil':     { descricao:'Cúpula cilíndrica com parede fina que difunde a luz. Acompanha soquete E27 e cabo com interruptor.', medidas:'⌀ 16 × 22 cm', peso:'210 g', cores:['creme','mostarda','vermelho'] },
  'porta-grid':  { descricao:'Bandeja com divisórias em grade para chave, moeda e carregador. Base com pé de silicone.',         medidas:'18 × 12 × 4 cm',  peso:'110 g', cores:['vermelho','navy','mostarda','verde','creme'] },
  'suporte-geo': { descricao:'Suporte inclinado para celular ou tablet. Ângulo fixo de 60°, com canal para o cabo passar.',      medidas:'10 × 8 × 9 cm',   peso:'85 g',  cores:['vermelho','navy','creme'] },
  'org-prim':    { descricao:'Organizador de gaveta com três compartimentos de tamanhos diferentes. Empilha com outro igual.',    medidas:'22 × 14 × 6 cm',  peso:'180 g', cores:['vermelho','navy','mostarda','verde','creme'] },
  'vaso-g':      { descricao:'A versão alta do Vaso Cilindro, para galhos e folhagens longas. Base larga, não tomba fácil.',      medidas:'⌀ 12 × 24 cm',    peso:'190 g', cores:['vermelho','navy','mostarda','verde','creme'] },
  'bandeja-mod': { descricao:'Bandeja rasa para mesa de centro ou banheiro. Borda alta de 2 cm segura o que está dentro.',       medidas:'24 × 16 × 3 cm',  peso:'130 g', cores:['navy','mostarda','verde','creme'] },
  'lum-mesa':    { descricao:'Luminária de mesa com haste e cúpula cônica. Luz dirigida para leitura, LED morno incluso.',       medidas:'18 × 18 × 34 cm', peso:'380 g', cores:['creme','navy','vermelho'] },
  'porta-lapis': { descricao:'Porta-lápis em cilindro com ranhuras verticais — a marca de camada da impressão vira textura.',    medidas:'⌀ 8 × 10 cm',     peso:'70 g',  cores:['vermelho','navy','mostarda','verde','creme'] },
  'cachepo-p':   { descricao:'Cachepô pequeno para suculenta ou muda. Furo de dreno e pratinho embutido na base.',               medidas:'⌀ 10 × 9 cm',     peso:'80 g',  cores:['vermelho','mostarda','verde','creme'] },
  'org-oficina': { descricao:'Organizador de bancada para ferramenta, pincel e chave de fenda. Nove furos de diâmetros variados.', medidas:'20 × 10 × 8 cm', peso:'160 g', cores:['navy','mostarda','verde'] },
};

/* Nome e cor real de cada filamento da paleta (bolinhas do produto) */
const CORES_FILAMENTO = {
  vermelho: { nome:'Vermelho', hex:'#C1392B' },
  navy:     { nome:'Navy',     hex:'#1B396B' },
  mostarda: { nome:'Mostarda', hex:'#E9A11B' },
  verde:    { nome:'Verde',    hex:'#4E7A3F' },
  creme:    { nome:'Creme',    hex:'#F0E4D0' },
};

/* Junta a ficha da peça com os campos padrão da marca */
function fichaDe(id){
  return Object.assign({}, FICHA_PADRAO, FICHAS[id] || {
    descricao:'(XXXXX) — descreva a função da peça',
    medidas:'(XXXXX)', peso:'(XXXXX)', cores:['creme'],
  });
}

/* Link para a página de detalhe de uma peça */
function linkProduto(id){
  return 'produto.html?id=' + encodeURIComponent(id);
}

/* ══════════════════════════════════════════════════════════════
   FAVORITAS E CARRINHO — SALVOS NO NAVEGADOR DO CLIENTE
   ──────────────────────────────────────────────────────────────
   Usamos localStorage: o navegador guarda e devolve na próxima
   visita, sem banco de dados nenhum. O que isso É e o que NÃO É:

   ✓ A lista sobrevive a fechar a aba, fechar o navegador e voltar
     dias depois. O carrinho também: dá pra escolher no celular,
     sair e voltar pra fechar o pedido.

   ✗ Fica no navegador daquele aparelho. Favoritou no celular não
     aparece no computador — não há conta de usuário ligando os dois.
   ✗ Some se a pessoa limpar os dados do navegador ou usar aba
     anônima.
   ✗ VOCÊ NÃO VÊ NADA DISSO. O dado nunca sai do aparelho dele.
     Para você receber aviso de "fulano favoritou tal peça" seria
     preciso conta de usuário e banco de dados — outro projeto.
     O que dá pra fazer sem isso está na página de Favoritas: um
     botão que manda a lista pro seu WhatsApp, se o cliente quiser.

   Todo acesso vai dentro de try/catch porque em aba anônima e com
   cookies bloqueados o navegador SIMPLESMENTE LANÇA ERRO ao tocar
   no localStorage — sem isso, a página inteira quebraria.
   ══════════════════════════════════════════════════════════════ */
const GUARDA = {
  ler(chave, padrao){
    try {
      const bruto = window.localStorage.getItem('chaos:' + chave);
      return bruto ? JSON.parse(bruto) : padrao;
    } catch (_) {
      return padrao;   // aba anônima, storage bloqueado, JSON corrompido
    }
  },
  salvar(chave, valor){
    try { window.localStorage.setItem('chaos:' + chave, JSON.stringify(valor)); }
    catch (_) { /* sem storage o site continua funcionando, só não lembra */ }
  },
};

/* ── Estado do cliente (persiste no navegador dele) ── */
/* Começam vazios: quem chega pela primeira vez não tem nada salvo.
   A partir daí, o que a pessoa favoritar ou puser no carrinho fica
   guardado no navegador dela. */
const FAVORITAS = GUARDA.ler('favoritas', []);          // ids das peças favoritadas
const CARRINHO  = GUARDA.ler('carrinho', []);           // { id, qtd, cor }

/* Com a loja em "Em breve", zeramos o que estiver salvo: ninguém pode
   ficar com peça no carrinho de quando o site ainda vendia (ou de
   quando você testou). Esvaziar aqui evita pedido fantasma. */
if (emBreve()){
  FAVORITAS.length = 0;
  CARRINHO.length = 0;
  GUARDA.salvar('favoritas', FAVORITAS);
  GUARDA.salvar('carrinho', CARRINHO);
}

/* Compatibilidade: o nome antigo ainda funciona, apontando para a
   mesma lista. Assim nenhum código velho quebra. */
const WISHLIST = FAVORITAS;

function salvarEstado(){
  GUARDA.salvar('favoritas', FAVORITAS);
  GUARDA.salvar('carrinho', CARRINHO);
}

/* Rede de segurança: se algum ponto esquecer de salvar, salvamos ao
   sair da página — inclusive quando o celular manda o navegador
   pro segundo plano, que é quando 'unload' não dispara. */
window.addEventListener('pagehide', salvarEstado);

/* ── Utilidades ───────────────────────────────────────────── */
function acharProduto(id){
  return PRODUTOS.find((p) => p.id === id);
}

/* Texto do selo que aparece no canto da foto */
const ROTULO_FLAG = {
  'novo':       'Novo',
  'lancamento': 'Lançamento',
  're-estoque': 'De volta',
};
function flagHTML(produto){
  if (!produto.flag) return '';
  const texto = ROTULO_FLAG[produto.flag] || produto.flag;
  return `<span class="product-flag is-${produto.flag}">${texto}</span>`;
}

function precoBR(valor){
  return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
}

/* Desenha a "foto": usa a imagem real se houver src, senão a arte geométrica. */
function arteHTML(item, opcoes){
  const o = opcoes || {};
  const classeExtra = o.classe ? ' ' + o.classe : '';
  const sombra = o.sombra ? '<div class="shade"></div>' : '';
  const foto = o.segunda ? item.src2 : item.src;
  const arte = o.segunda ? (item.art2 || item.art) : item.art;
  if (foto){
    return `<div class="prod-art${classeExtra}" style="background-image:url('${foto}');background-size:cover;background-position:center;">${sombra}</div>`;
  }
  return `<div class="prod-art ${arte}${classeExtra}">${sombra}</div>`;
}

/* ── Ícones (SVG inline, herdam a cor do texto) ───────────── */
const ICONES = {
  busca:    '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.4-4.4"/></svg>',
  usuario:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6"/></svg>',
  coracao:  '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 11c-2.5 4.6-9.5 9-9.5 9z"/></svg>',
  sacola:   '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  casa:     '<svg viewBox="0 0 24 24"><path d="M4 11l8-6 8 6v9H4v-9z"/></svg>',
  esquerda: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  direita:  '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  lixeira:  '<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/></svg>',
  aviso:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>',
};

/* ── Cabeçalho compartilhado ──────────────────────────────────
   Cada página chama montarCabecalho('produtos') etc. para marcar
   a aba ativa. Assim o topo é idêntico em todas as páginas.     */
function montarCabecalho(paginaAtual){
  const alvo = document.getElementById('cabecalho');
  if (!alvo) return;

  const abas = [
    { id:'produtos',     rotulo:'Todos os Produtos', href:'produtos.html' },
    { id:'promocao',     rotulo:'Promoção',          href:'produtos.html', classe:'is-sale' },
    { id:'colecoes',     rotulo:'Coleções',          href:'produtos.html' },
    { id:'em-breve',     rotulo:'Em Breve',          href:'produtos.html' },
    { id:'mais-vendidos',rotulo:'Mais Vendidos',     href:'produtos.html' },
  ];

  alvo.innerHTML = `
    ${emBreve() ? `
      <div class="aviso-breve">
        <p>Catálogo em preparação — as peças e os preços ainda não estão definitivos.</p>
      </div>` : ''}

    <div class="header-row">
      <button class="search-toggle" id="searchToggle" aria-expanded="false" aria-controls="searchPanel">
        <span class="icon">${ICONES.busca}</span>
        <span>Buscar</span>
      </button>

      <a class="brand" href="index.html">
        <span class="brand-mark"><span class="m1"></span><span class="m2"></span></span>
        <span class="brand-name">Chaos Decos<small>Design 3D</small></span>
      </a>

      <div class="header-actions">
        <div class="currency-select">
          <select aria-label="Moeda de compra">
            <option>R$ (BRL)</option>
            <option>US$ (USD)</option>
          </select>
        </div>
        <!-- "Entrar" removido: não existe login nesta loja. Botão que
             não faz nada é promessa quebrada — o cliente clica, não
             acontece nada, e a confiança cai. Quando houver conta de
             usuário, é só devolver este link aqui:
             <a class="top-link" href="#"><span class="icon">${'$'}{ICONES.usuario}</span><span>Entrar</span></a> -->
        <a class="top-link ${paginaAtual === 'favoritas' ? 'is-current' : ''}" href="favoritas.html">
          <span class="icon">${ICONES.coracao}</span><span>Favoritas</span>
          ${FAVORITAS.length ? `<span class="badge-count">${FAVORITAS.length}</span>` : ''}
        </a>
        <a class="top-link ${paginaAtual === 'carrinho' ? 'is-current' : ''}" href="carrinho.html">
          <span class="icon">${ICONES.sacola}</span><span>Carrinho</span>
          ${CARRINHO.length ? `<span class="badge-count">${CARRINHO.reduce((s, i) => s + i.qtd, 0)}</span>` : ''}
        </a>
      </div>
    </div>

    <div class="search-panel" id="searchPanel">
      <div class="wrap"><input type="text" placeholder="Buscar vasos, luminárias, organizadores…"></div>
    </div>

    <nav class="main-nav">
      <ul>
        ${abas.map((a) => `<li><a href="${a.href}" class="${a.classe || ''} ${paginaAtual === a.id ? 'is-active' : ''}">${a.rotulo}</a></li>`).join('')}
      </ul>
    </nav>
  `;

  const botaoBusca = document.getElementById('searchToggle');
  const painelBusca = document.getElementById('searchPanel');
  botaoBusca.addEventListener('click', () => {
    const abrir = !painelBusca.classList.contains('is-open');
    painelBusca.classList.toggle('is-open', abrir);
    botaoBusca.setAttribute('aria-expanded', String(abrir));
    if (abrir) painelBusca.querySelector('input').focus();
  });
}

/* ── Rodapé compartilhado ─────────────────────────────────── */
function montarRodape(){
  const alvo = document.getElementById('rodape');
  if (!alvo) return;

  /* O bloco de identificação abaixo não é decoração: é o que o
     Decreto 7.962/2013 (art. 2º, I e II) exige em destaque. */
  alvo.innerHTML = `
    <div class="wrap footer-grid">
      <div class="footer-col">
        <p class="footer-brand">${EMPRESA.fantasia}</p>
        <p>Objetos de decoração impressos em 3D, produzidos sob encomenda.
           O prazo de produção é informado na página de cada peça.</p>
      </div>

      <div class="footer-col">
        <p class="footer-title">Atendimento</p>
        <p><a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></p>
        <p>${whatsappHTML('Chamar no WhatsApp')}</p>
        <p class="footer-mini">Respondemos em até ${EMPRESA.prazoResposta}.</p>
      </div>

      <div class="footer-col">
        <p class="footer-title">Informações</p>
        <p><a href="politicas.html#entrega">Entrega e prazos</a></p>
        <p><a href="politicas.html#trocas">Trocas e devoluções</a></p>
        <p><a href="politicas.html#privacidade">Privacidade</a></p>
        <p><a href="politicas.html#termos">Termos de uso</a></p>
      </div>

      <div class="footer-col">
        <p class="footer-title">Onde compramos e vendemos</p>
        <p>Shopee · Mercado Livre · TikTok Shop</p>
        <p>Instagram · WhatsApp</p>
      </div>
    </div>

    <div class="wrap footer-legal">
      <!-- Publicamos só o CNPJ. Razão social, IE e endereço ficam
           guardados em EMPRESA (servem para documento, proposta e
           nota fiscal), mas não vão para a tela.
           ⚠️ Ver a nota "O que deixamos de publicar" no README. -->
      <p>CNPJ ${EMPRESA.cnpj}</p>
      <p class="footer-mini">Preços em reais (R$). Peças produzidas sob encomenda —
         veja <a href="politicas.html#arrependimento">prazos e direito de arrependimento</a>.</p>
    </div>
  `;
}

/* ── Arraste horizontal reaproveitável (carrosséis) ───────────
   No MOUSE: arrastamos na mão, mexendo no scrollLeft.
   No DEDO:  deixamos o próprio navegador rolar (é mais fluido, e
   se a gente também mexesse no scroll os dois brigariam e o
   carrossel travava). Só avisamos quem chamou, pra pausar o giro. */
function ativarArraste(trilha, ganchos){
  const g = ganchos || {};
  const LIMIAR = 5;                       // px que o mouse anda antes de virar arraste
  let apertado = false, arrastou = false;
  let inicioX = 0, scrollInicial = 0, ponteiro = null;

  trilha.addEventListener('pointerdown', (e) => {
    if (g.aoTocar) g.aoTocar();
    if (e.pointerType !== 'mouse') return;   // dedo/caneta: rolagem nativa do navegador
    apertado = true;
    arrastou = false;
    inicioX = e.clientX;
    scrollInicial = trilha.scrollLeft;
    ponteiro = e.pointerId;
    /* ATENÇÃO: nada de setPointerCapture aqui. Capturar no primeiro
       clique faz o navegador redirecionar os eventos pra trilha, e aí
       o clique nunca chega no link do card — o carrossel vira uma
       vitrine que não abre nada. Só capturamos quando vira arraste. */
  });

  trilha.addEventListener('pointermove', (e) => {
    if (!apertado) return;
    const andou = e.clientX - inicioX;
    if (!arrastou){
      if (Math.abs(andou) < LIMIAR) return;  // ainda é um clique parado
      arrastou = true;
      trilha.classList.add('is-dragging');
      try { trilha.setPointerCapture(ponteiro); } catch (_) {}
    }
    trilha.scrollLeft = scrollInicial - andou * 1.2;
    if (g.aoMover) g.aoMover();
  });

  /* Se a pessoa arrastou, o clique que vem em seguida é sobra do gesto:
     engolimos ele uma única vez pra não abrir o produto sem querer. */
  trilha.addEventListener('click', (e) => {
    if (!arrastou) return;
    e.preventDefault();
    e.stopPropagation();
    arrastou = false;
  }, true);

  const soltar = () => {
    if (!apertado) return;
    apertado = false;
    trilha.classList.remove('is-dragging');
    if (g.aoSoltar) g.aoSoltar();
  };
  trilha.addEventListener('pointerup', soltar);
  trilha.addEventListener('pointercancel', soltar);
  trilha.addEventListener('pointerleave', soltar);
}

/* ── Carrossel que gira sozinho, em loop ──────────────────────
   A trilha precisa ter a lista de itens DUPLICADA: ao chegar na
   metade, voltamos pro começo e ninguém percebe a emenda.

   POR QUE ASSIM: a versão antiga somava 0,7 px direto no
   scrollLeft a cada 16 ms. No computador funciona; no celular o
   navegador arredonda o scrollLeft pra número inteiro, então
   0,7 virava 0 e o carrossel ficava parado. Agora a posição é
   guardada numa variável própria (com casas decimais) e o
   scrollLeft só recebe o resultado — o arredondamento do
   navegador não zera mais o movimento.

   Também trocamos setInterval por requestAnimationFrame: anda na
   mesma velocidade em qualquer tela e pausa sozinho quando a aba
   sai da frente, sem gastar bateria. */
function autoCarrossel(trilha, opcoes){
  const o = Object.assign({ velocidade: 42, pausa: 1200 }, opcoes || {});
  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let posicao = 0, instanteAnterior = 0, rodando = false, quadro = null, timerRetomar = null;
  /* Trava do mouse: enquanto o cursor está sobre o carrossel, NADA
     religa o giro — nem o temporizador da rolagem. Sem esta trava, o
     resto do movimento gerava um evento de scroll que remarcava a
     volta e o carrossel voltava a andar com o mouse ainda em cima. */
  let travadoPorMouse = false;

  function iniciar(){
    if (semAnimacao || rodando || travadoPorMouse) return;
    posicao = trilha.scrollLeft;        // retoma de onde o usuário parou
    instanteAnterior = 0;
    rodando = true;
    trilha.classList.add('is-auto-scrolling');
    quadro = requestAnimationFrame(andar);
  }

  function andar(instante){
    if (!rodando) return;
    if (!instanteAnterior) instanteAnterior = instante;
    const segundos = Math.min((instante - instanteAnterior) / 1000, 0.05);
    instanteAnterior = instante;

    const emenda = trilha.scrollWidth / 2;   // onde a lista se repete
    if (emenda > 0){
      posicao += o.velocidade * segundos;
      if (posicao >= emenda) posicao -= emenda;
      trilha.scrollLeft = posicao;
    }
    if (o.aoMover) o.aoMover();
    quadro = requestAnimationFrame(andar);
  }

  function parar(){
    rodando = false;
    trilha.classList.remove('is-auto-scrolling');
    if (quadro) cancelAnimationFrame(quadro);
    quadro = null;
    window.clearTimeout(timerRetomar);
  }

  function retomar(){
    parar();
    timerRetomar = window.setTimeout(iniciar, o.pausa);
  }

  ativarArraste(trilha, { aoTocar: parar, aoSoltar: retomar, aoMover: o.aoMover });

  /* Mouse em cima: para na hora. Acertar um botão que está andando é
     irritante — e é justamente quando a pessoa quer clicar em "Ver Item".
     Só vale onde existe cursor; no celular não muda nada. */
  if (o.pausarNoHover !== false && window.matchMedia('(hover: hover)').matches){
    trilha.addEventListener('mouseenter', () => { travadoPorMouse = true; parar(); });
    trilha.addEventListener('mouseleave', () => { travadoPorMouse = false; iniciar(); });
  }

  /* Rolagem por inércia (o "empurrão" do dedo) continua depois que o
     toque acabou: enquanto ela rolar, adiamos a volta do giro. */
  trilha.addEventListener('scroll', () => {
    if (rodando || travadoPorMouse) return;
    if (o.aoMover) o.aoMover();
    window.clearTimeout(timerRetomar);
    timerRetomar = window.setTimeout(iniciar, o.pausa);
  }, { passive: true });

  trilha.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;   // gesto horizontal: deixa passar
    e.preventDefault();
    parar();
    trilha.scrollLeft += e.deltaY;
    if (o.aoMover) o.aoMover();
    retomar();
  }, { passive: false });

  if (o.iniciarJa !== false) iniciar();

  return { iniciar, parar, retomar };
}
