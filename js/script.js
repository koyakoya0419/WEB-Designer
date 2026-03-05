/* ============================================
   script.js — KOYA ITO Portfolio
============================================ */

'use strict';

// ========== NAV スクロール背景 ==========
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期実行
})();


// ========== ハンバーガーメニュー ==========
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  const open  = () => {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? close() : open();
  });

  // メニュー内リンクをタップで閉じる
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // ESCキーで閉じる
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
})();


// ========== スクロールフェードイン ==========
(function () {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 一度表示したら監視終了（パフォーマンス最適化）
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  targets.forEach(el => io.observe(el));
})();


// ========== スムーズスクロール（ナビリンク） ==========
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const navH = document.getElementById('nav')?.offsetHeight || 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


// ========== Contact フォーム（デモ送信） ==========
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    if (!btn) return;

    btn.textContent = 'SENT ✓';
    btn.style.background = 'var(--pop4)';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'SEND MESSAGE →';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();
