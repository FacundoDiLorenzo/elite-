// Élite — interacciones, sin dependencias
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  // Secuencia de entrada del hero: se lanza en el siguiente frame para que el estado inicial se pinte
  const start = () => requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));
  if (document.fonts && document.fonts.ready) {
    // Espera las fuentes (como mucho 600 ms) para que el título no cambie de forma mientras entra
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(start);
  } else {
    start();
  }

  // Menú móvil
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });

  // Pausar el patrón NO LIMITS cuando el hero no está a la vista
  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => hero.classList.toggle('is-offscreen', !entry.isIntersecting)).observe(hero);
  }

  // Servicios: la vista previa sigue al servicio activo (hover, foco o scroll)
  const items = [...document.querySelectorAll('.svc')];
  const frames = [...document.querySelectorAll('.services__frame')];
  const activate = (key) => {
    items.forEach((el) => el.classList.toggle('is-active', el.dataset.svc === key));
    frames.forEach((el) => el.classList.toggle('is-active', el.dataset.svc === key));
  };
  items.forEach((el) => {
    el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') activate(el.dataset.svc); });
    el.addEventListener('focus', () => activate(el.dataset.svc));
  });
  if ('IntersectionObserver' in window && window.matchMedia('(min-width: 861px)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) activate(entry.target.dataset.svc); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    items.forEach((el) => io.observe(el));
  }

  // Marca en el menú la sección visible
  const links = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + entry.target.id)));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => so.observe(s));
  }

  // Año del footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
