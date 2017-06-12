import { createElement } from "./dom.js";

const el = createElement("h3", "Modules!");
el.firstChild.setAttribute("id", "title");

document.body.appendChild(el);
