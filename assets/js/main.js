(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* year */
  $('#year').textContent = new Date().getFullYear();

  /* nav */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  $('#burger').addEventListener('click', () => nav.classList.toggle('open'));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* reveal on scroll */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el, i) => {
    // stagger siblings inside grids
    const parent = el.parentElement;
    const idx = [...parent.children].filter(c => c.classList.contains('reveal')).indexOf(el);
    if (parent.matches('.why-grid, .features, .timeline, .faq, .hero-inner')) el.style.transitionDelay = (idx * 0.08) + 's';
    io.observe(el);
  });

  /* counters */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
      const t0 = performance.now(), dur = 1400;
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* cursor glow */
  const glow = $('.cursor-glow');
  if (glow && matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  /* ---------- live device previews ---------- */
  const devices = $$('.device-laptop, .device-phone');
  const VIRTUAL = { laptop: [1440, 900], phone: [390, 845] };

  const fit = dev => {
    const vp = $('.screen-viewport', dev);
    const ifr = $('iframe', vp);
    const [w, h] = dev.classList.contains('device-phone') ? VIRTUAL.phone : VIRTUAL.laptop;
    const scale = vp.clientWidth / w;
    ifr.style.width = w + 'px';
    ifr.style.height = (vp.clientHeight / scale) + 'px';
    ifr.style.transform = `scale(${scale})`;
  };

  const ro = new ResizeObserver(entries => entries.forEach(e => fit(e.target.closest('.device-laptop, .device-phone'))));

  // load iframes only when close to viewport
  const loadIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const ifr = $('iframe', e.target);
      if (!ifr.src) ifr.src = e.target.dataset.src;
      loadIO.unobserve(e.target);
    });
  }, { rootMargin: '400px 0px' });

  devices.forEach(dev => {
    fit(dev);
    ro.observe($('.screen-viewport', dev));
    loadIO.observe(dev);

    // click opens live demo
    dev.addEventListener('click', () => window.open(dev.dataset.src, '_blank'));

    // hover: auto-scroll the site inside the screen
    let raf = null, dir = 0;
    const step = () => {
      try {
        const win = $('iframe', dev).contentWindow;
        const doc = win.document.documentElement;
        const max = doc.scrollHeight - win.innerHeight;
        const y = win.scrollY;
        if (dir > 0 && y < max) win.scrollTo(0, Math.min(max, y + 2.2));
        else if (dir < 0 && y > 0) win.scrollTo(0, Math.max(0, y - Math.max(18, y * 0.08)));
        else { raf = null; return; }
        raf = requestAnimationFrame(step);
      } catch (err) { raf = null; } // cross-origin (e.g. opened from file://) — just skip
    };
    dev.addEventListener('mouseenter', () => { dir = 1; if (!raf) raf = requestAnimationFrame(step); });
    dev.addEventListener('mouseleave', () => { dir = -1; if (!raf) raf = requestAnimationFrame(step); });
  });

  /* subtle tilt on project visuals */
  if (matchMedia('(hover: hover)').matches) {
    $$('.project-visual').forEach(v => {
      v.addEventListener('pointermove', e => {
        const r = v.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        v.style.transform = `perspective(1600px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
      });
      v.addEventListener('pointerleave', () => { v.style.transform = ''; });
      v.style.transition = 'transform .6s cubic-bezier(.2,.7,.1,1)';
    });
  }

  /* contact form (demo — connect to Formspree / e-mail service later) */
  const toast = $('#toast');
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    toast.classList.add('show');
    e.target.reset();
    setTimeout(() => toast.classList.remove('show'), 4000);
  });
})();
