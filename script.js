document.addEventListener('DOMContentLoaded', function () {

  var navLinks = document.querySelectorAll('.nav-link');
  var pages = document.querySelectorAll('.page');

  function showPage(pageName) {
    pages.forEach(function (p) {
      p.classList.toggle('active', p.id === 'page-' + pageName);
    });
    navLinks.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('data-page') === pageName);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var pageName = link.getAttribute('data-page');
      var href = link.getAttribute('href');

      if (pageName) {
        e.preventDefault();
        showPage(pageName);

        if (href && href.length > 1) {
          setTimeout(function () {
            var el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');

      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });

      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }

  document.querySelectorAll('.product-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
  });

  var mailForm = document.getElementById('mail-form');
  var formSuccess = document.getElementById('form-success');

  if (mailForm) {
    mailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.classList.add('show');
      mailForm.reset();
      setTimeout(function () {
        formSuccess.classList.remove('show');
      }, 4000);
    });
  }

});
