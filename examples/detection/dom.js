export function createElement(tagName, txt) {
  const f = document.createDocumentFragment();
  const d = document.createElement(tagName);
  const t = document.createTextNode(txt);
  d.appendChild(t);
  f.appendChild(d);
  return f;
}
