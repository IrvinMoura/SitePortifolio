// Protótipo da fase 2 — interações I-02 a I-08 em JS mínimo, sem dependências.
(() => {
  const root = document.documentElement;
  const KEY = 'memorial-proto';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };
  const save = (patch) => {
    const next = { ...read(), ...patch };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* sem armazenamento: só não persiste */ }
  };

  // Painel do protótipo: tipografia, acento, pendências
  const panel = document.querySelector('[data-proto]');
  if (panel) {
    const form = panel.querySelector('form');
    form.type.value = root.dataset.type;
    form.accent.value = root.dataset.accent;
    form.pend.checked = root.dataset.pend === 'on';
    form.addEventListener('change', (e) => {
      const { name, value, checked } = e.target;
      if (name === 'type' || name === 'accent') {
        root.dataset[name] = value;
        save({ [name]: value });
      } else if (name === 'pend') {
        if (checked) root.dataset.pend = 'on'; else delete root.dataset.pend;
        save({ pend: checked });
      }
    });
    if (read().panelOpen && innerWidth >= 768) panel.open = true;
    panel.addEventListener('toggle', () => save({ panelOpen: panel.open }));
  }

  // Tema (I-07)
  const toggle = document.querySelector('[data-theme-toggle]');
  const syncToggle = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.textContent = dark ? 'Tema claro' : 'Tema escuro';
  };
  if (toggle) {
    syncToggle();
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      const apply = () => { root.dataset.theme = next; syncToggle(); };
      if (document.startViewTransition && !reduced.matches) document.startViewTransition(apply);
      else apply();
      save({ theme: next });
    });
  }

  // Fig. 0 — figura-assinatura (I-08)
  document.querySelectorAll('[data-flow]').forEach((fig) => {
    const buttons = fig.querySelectorAll('[data-set]');
    const live = fig.querySelector('[data-flow-live]');
    buttons.forEach((btn) => btn.addEventListener('click', () => {
      const state = btn.dataset.set;
      if (fig.dataset.state === state) return;
      fig.dataset.state = state;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      live.textContent = state === 'depois'
        ? 'Mostrando o processo com um sistema: quatro etapas automáticas.'
        : 'Mostrando o processo como é hoje: quatro etapas manuais, com retrabalho.';
    }));
  });

  // Copiar e-mail (I-05)
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const status = btn.parentElement.querySelector('[data-copy-status]');
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        status.textContent = 'Copiado';
      } catch {
        status.textContent = 'Não foi possível copiar';
      }
      setTimeout(() => { status.textContent = ''; }, 2000);
    });
  });

  // Horário local de Brasília
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30_000);
  }

  // Índice com seção ativa (I-03)
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if (tocLinks.length) {
    const byId = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '0px 0px -75% 0px' });
    document.querySelectorAll('.mem h2[id]').forEach((h) => spy.observe(h));
  }

  // Entrada de seção (I-02): só abaixo da dobra, uma vez, sem reduced motion
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('pre');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add('pre');
        io.observe(el);
      }
    });
  }
})();
