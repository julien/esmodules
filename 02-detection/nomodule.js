const exists = document.querySelector('#title');

if (exists === null) {
  const el = document.createElement('h3');
  el.innerHTML = 'Sorry, no modules for you';
  document.body.appendChild(el);
}
