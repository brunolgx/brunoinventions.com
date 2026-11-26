(function () {
  var btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.sub-toggle').forEach(function (t) {
    t.addEventListener('click', function () { t.parentElement.classList.toggle('open'); });
  });
  document.querySelectorAll('.main-nav li.active.has-sub').forEach(function (li) { li.classList.add('open'); });

  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = ''; status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); status.className = 'ok'; status.textContent = 'Thank you! Your message has been sent.'; })
        .catch(function () { status.className = 'err'; status.textContent = 'Sorry, the message could not be sent. Please try again later.'; });
    });
  }
})();
