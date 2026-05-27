/**
 * Minimal client JS for static archive: FAQ accordion, pricing packs, mobile nav.
 * Injected into scraped index.html as /original-interactions.js
 */
(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return [...(root || document).querySelectorAll(sel)];
  }

  // FAQ accordion
  qsa('#faq [style*="border-bottom"]').forEach((row) => {
    const btn = qs('button', row);
    const panel = btn?.nextElementSibling;
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = panel.style.gridTemplateRows === '1fr';
      qsa('#faq [style*="border-bottom"]').forEach((other) => {
        const b = qs('button', other);
        const p = b?.nextElementSibling;
        const span = b?.querySelector('span:last-child');
        if (!p || !span) return;
        p.style.gridTemplateRows = '0fr';
        span.textContent = '+';
      });
      if (!open) {
        panel.style.gridTemplateRows = '1fr';
        const span = btn.querySelector('span:last-child');
        if (span) span.textContent = '−';
      }
    });
  });

  // Pricing pack toggle
  const packToggle = qs('.ls-pack-toggle');
  const packSection = packToggle?.closest('section');
  const packGrid = qs('.ls-pack-grid', packSection);
  if (packToggle && packGrid) {
    let open = true;
    packToggle.addEventListener('click', () => {
      open = !open;
      const wrap = packGrid.parentElement?.parentElement;
      if (wrap) wrap.style.gridTemplateRows = open ? '1fr' : '0fr';
      const plus = packToggle.querySelector('span span');
      if (plus) plus.style.transform = open ? 'rotate(45deg)' : 'rotate(0deg)';
    });
  }

  // Mobile menu (basic)
  const menuBtn = qs('[aria-controls="mobile-menu"]');
  if (menuBtn) {
    let menu = qs('#mobile-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'mobile-menu';
      menu.hidden = true;
      menu.style.cssText =
        'position:fixed;inset:64px 0 0 0;background:var(--ls-paper);padding:24px 40px;z-index:40;display:flex;flex-direction:column;gap:20px;font-size:18px;border-top:1px solid var(--ls-line)';
      ['How it works|#how-it-works', 'Pricing|#pricing', 'FAQ|#faq'].forEach((pair) => {
        const [label, href] = pair.split('|');
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        a.style.color = 'var(--ls-ink)';
        a.addEventListener('click', () => {
          menu.hidden = true;
          menuBtn.setAttribute('aria-expanded', 'false');
        });
        menu.appendChild(a);
      });
      document.body.appendChild(menu);
    }
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
    });
  }

  // Scroll hint on sample report
  const sampleWrap = qs('[alt*="audit result"]')?.closest('[style*="position:relative"]');
  if (sampleWrap) {
    sampleWrap.addEventListener('mouseenter', () => {
      const hint = sampleWrap.querySelector('[style*="scroll to explore"]')?.parentElement;
      if (hint) {
        hint.style.opacity = '1';
        hint.style.transform = 'translateX(-50%) translateY(0)';
      }
    });
    sampleWrap.addEventListener('mouseleave', () => {
      const hint = sampleWrap.querySelector('[style*="pointer-events:none"]');
      if (hint) {
        hint.style.opacity = '0';
        hint.style.transform = 'translateX(-50%) translateY(6px)';
      }
    });
  }
})();
