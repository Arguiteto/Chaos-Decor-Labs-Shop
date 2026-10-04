/* ══════════════════════════════════════════════════════════════
   CHAOS DECOS LABS — A CORTINA
   ──────────────────────────────────────────────────────────────
   Enquanto a loja não abre, o site inteiro fica atrás de uma tela
   "Em breve". Este arquivo é carregado no <head> de TODAS as
   páginas, antes de qualquer coisa aparecer — por isso a pessoa é
   levada para a tela de espera sem ver a loja piscar na frente.

   ┌─────────────────────────────────────────────────────────┐
   │  PARA ABRIR A LOJA: troque para false, na linha abaixo.  │
   │  Uma linha só — e o site inteiro volta a funcionar.      │
   └─────────────────────────────────────────────────────────┘

   ⚠️ ISTO É UMA CORTINA, NÃO UM COFRE. Ela impede o visitante
   comum de entrar, mas quem souber desligar o JavaScript ou abrir
   o código-fonte enxerga as páginas. Não guarde aqui nada que não
   possa ser visto — e não é o caso: o site não tem dado sigiloso.

   Quando abrir a loja, lembre também de olhar o MODO_EM_BREVE no
   chaos-dados.js: são dois interruptores diferentes.
     · SITE_BLOQUEADO (aqui) → ninguém entra no site
     · MODO_EM_BREVE (lá)    → entra, vê a vitrine, mas não compra
   ══════════════════════════════════════════════════════════════ */
const SITE_BLOQUEADO = true;

(function cortina(){
  const naTelaDeEspera = /em-breve\.html$/.test(location.pathname);

  /* Bloqueado e tentando entrar em qualquer outra página → cortina. */
  if (SITE_BLOQUEADO && !naTelaDeEspera){
    location.replace('em-breve.html');
    return;
  }

  /* Loja aberta e alguém chegou na tela de espera (link velho,
     favorito antigo) → manda pra home, que agora existe. */
  if (!SITE_BLOQUEADO && naTelaDeEspera){
    location.replace('index.html');
  }
})();
