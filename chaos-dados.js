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

const PRODUTOS = [
  { id:'vaso-p',      nome:'Vaso Bauhaus P',       colecao:'Primária', preco: 89, art:'art-a', art2:'art-a2', categoria:'Vasos & Cachepôs', flag:'novo' },
  { id:'cachepo-mod', nome:'Cachepô Módulo',       colecao:'Módulo',   preco:119, art:'art-b', art2:'art-b2', categoria:'Vasos & Cachepôs' },
  { id:'lum-cil',     nome:'Luminária Cilindro',   colecao:'Forma',    preco:159, art:'art-c', art2:'art-c2', categoria:'Luminárias', flag:'lancamento' },
  { id:'porta-grid',  nome:'Porta-Trecos Grid',    colecao:'Grid',     preco: 69, art:'art-d', art2:'art-d2', categoria:'Organizadores' },
  { id:'suporte-geo', nome:'Suporte Geométrico',   colecao:'Forma',    preco: 79, art:'art-e', art2:'art-e2', categoria:'Objetos de Mesa' },
  { id:'org-prim',    nome:'Organizador Primária', colecao:'Primária', preco: 99, art:'art-f', art2:'art-f2', categoria:'Organizadores', flag:'re-estoque' },
  { id:'vaso-g',      nome:'Vaso Bauhaus G',       colecao:'Primária', preco:139, art:'art-g', art2:'art-a2', categoria:'Vasos & Cachepôs' },
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

/* ── Estado da maquete (memória apenas — ver aviso no topo) ── */
const WISHLIST = ['lum-cil', 'vaso-p', 'org-prim'];               // ids favoritados
const CARRINHO = [                                                // itens no carrinho
  { id:'cachepo-mod', qtd:1 },
  { id:'porta-grid',  qtd:2 },
];

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
    <div class="header-row">
      <button class="search-toggle" id="searchToggle" aria-expanded="false" aria-controls="searchPanel">
        <span class="icon">${ICONES.busca}</span>
        <span>Buscar</span>
      </button>

      <a class="brand" href="index.html">
        <span class="brand-mark"><span class="m1"></span><span class="m2"></span></span>
        <span class="brand-name">Chaos Decos<small>Design 3D · Bauhaus</small></span>
      </a>

      <div class="header-actions">
        <div class="currency-select">
          <select aria-label="Moeda de compra">
            <option>R$ (BRL)</option>
            <option>US$ (USD)</option>
          </select>
        </div>
        <a class="top-link" href="#"><span class="icon">${ICONES.usuario}</span><span>Entrar</span></a>
        <a class="top-link ${paginaAtual === 'wishlist' ? 'is-current' : ''}" href="wishlist.html">
          <span class="icon">${ICONES.coracao}</span><span>Wishlist</span>
          ${WISHLIST.length ? `<span class="badge-count">${WISHLIST.length}</span>` : ''}
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
  alvo.innerHTML = `
    <div class="wrap">
      <p><strong>Chaos Decos Labs</strong> — objetos impressos em 3D, sob encomenda. Prazo de produção informado em cada peça.</p>
      <p>Shopee · Mercado Livre · TikTok Shop · Instagram · WhatsApp</p>
    </div>
  `;
}

/* ── Arraste horizontal reaproveitável (carrosséis) ───────── */
function ativarArraste(trilha){
  let arrastando = false, inicioX = 0, scrollInicial = 0;
  trilha.addEventListener('pointerdown', (e) => {
    arrastando = true;
    trilha.classList.add('is-dragging');
    inicioX = e.clientX;
    scrollInicial = trilha.scrollLeft;
    trilha.setPointerCapture(e.pointerId);
  });
  trilha.addEventListener('pointermove', (e) => {
    if (!arrastando) return;
    trilha.scrollLeft = scrollInicial - (e.clientX - inicioX) * 1.2;
  });
  const parar = () => { arrastando = false; trilha.classList.remove('is-dragging'); };
  trilha.addEventListener('pointerup', parar);
  trilha.addEventListener('pointercancel', parar);
  trilha.addEventListener('pointerleave', parar);
}
