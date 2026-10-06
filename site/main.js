// Carrossel "Nosso trabalho na estrada": passa sozinho a cada 3,5 s,
// pausa com o mouse em cima (ou ao tocar/focar) e tem setas.
(function () {
  var track = document.querySelector('[data-carousel-track]');
  if (!track) return;

  var prevBtn = document.querySelector('[data-carousel-prev]');
  var nextBtn = document.querySelector('[data-carousel-next]');
  var GAP = 20;
  var INTERVAL = 3500;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var behavior = reduceMotion ? 'auto' : 'smooth';
  var paused = false;

  // Fotos que não existem na pasta /fotos são removidas. Se nenhuma foto
  // existir ainda, os espaços vazios do layout continuam visíveis.
  var slides = Array.prototype.slice.call(track.querySelectorAll('.slide'));
  var pending = slides.length;
  var loaded = 0;

  function settle(slide, ok) {
    if (ok) loaded++;
    else slide.classList.add('is-missing');
    if (--pending > 0) return;
    slides.forEach(function (s) {
      if (!s.classList.contains('is-missing')) return;
      if (loaded > 0) s.remove();
      else {
        var img = s.querySelector('img');
        if (img) img.remove();
        s.classList.add('slide--empty');
      }
    });
  }

  slides.forEach(function (slide) {
    var img = slide.querySelector('img');
    if (!img) return settle(slide, false);
    // As fotos ficam fora da tela; carrega já para saber quais existem.
    img.loading = 'eager';
    if (img.complete) return settle(slide, img.naturalWidth > 0);
    img.addEventListener('load', function () { settle(slide, true); }, { once: true });
    img.addEventListener('error', function () { settle(slide, false); }, { once: true });
  });

  function step(dir, loop) {
    var card = track.querySelector('.slide');
    var w = card ? card.getBoundingClientRect().width + GAP : 300;
    if (dir > 0 && track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) {
      if (loop) track.scrollTo({ left: 0, behavior: behavior });
      return;
    }
    if (dir < 0 && track.scrollLeft <= 4) {
      if (loop) track.scrollTo({ left: track.scrollWidth, behavior: behavior });
      return;
    }
    track.scrollBy({ left: dir * w, behavior: behavior });
  }

  prevBtn && prevBtn.addEventListener('click', function () { step(-1, false); });
  nextBtn && nextBtn.addEventListener('click', function () { step(1, true); });

  track.addEventListener('mouseenter', function () { paused = true; });
  track.addEventListener('mouseleave', function () { paused = false; });
  track.addEventListener('focusin', function () { paused = true; });
  track.addEventListener('focusout', function () { paused = false; });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1, false); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1, false); }
  });

  // No celular, depois que a pessoa arrasta, espera um pouco antes de voltar a passar.
  var touchTimer;
  track.addEventListener('touchstart', function () {
    paused = true;
    clearTimeout(touchTimer);
  }, { passive: true });
  track.addEventListener('touchend', function () {
    clearTimeout(touchTimer);
    touchTimer = setTimeout(function () { paused = false; }, 6000);
  }, { passive: true });

  if (reduceMotion) return;
  setInterval(function () {
    if (!paused && !document.hidden) step(1, true);
  }, INTERVAL);
})();

// Ano atual no rodapé
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
