// Remplace le JavaScript Weebly/thème (sans jQuery)
(function () {
  var body = document.body;
  function onScroll() {
    if (window.scrollY > 50) body.classList.add('collapse');
    else if (window.scrollY === 0) body.classList.remove('collapse');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  body.classList.add('fade-in');

  // Sous-menus : classe + flèche, ouverture au clic dans le menu mobile
  document.querySelectorAll('.wsite-menu-default li, .wsite-menu li').forEach(function (li) {
    var wrap = li.querySelector(':scope > .wsite-menu-wrap');
    if (!wrap) return;
    li.classList.add('has-submenu');
    var a = li.querySelector(':scope > a');
    var caret = document.createElement('span');
    caret.className = 'icon-caret';
    a.insertAdjacentElement('afterend', caret);
    caret.addEventListener('click', function () { wrap.classList.toggle('open'); });
  });

  // Page courante : surligner et garder ouvert le sous-menu
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-nav a.wsite-menu-subitem').forEach(function (a) {
    if (a.getAttribute('href') === here) {
      a.parentElement.classList.add('wsite-nav-current');
      var w = a.closest('.wsite-menu-wrap');
      while (w) { w.classList.add('open'); w = w.parentElement.closest('.wsite-menu-wrap'); }
    }
  });

  document.querySelectorAll('.hamburger').forEach(function (h) {
    h.addEventListener('click', function (e) { e.preventDefault(); body.classList.toggle('nav-open'); });
  });

  // Formulaire de contact (envoi sans quitter la page)
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'paragraph'; status.textContent = 'Sending...';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (r.ok) { form.reset(); status.className = 'paragraph ok'; status.textContent = 'Thank you! Your message has been sent.'; }
          else throw new Error();
        })
        .catch(function () { status.className = 'paragraph err'; status.textContent = 'Sorry, the message could not be sent. Please try again later.'; });
    });
  }
})();
