import Renderer from './renderer.js';
import {debounce} from './util.js';

window.addEventListener('load', () => {

  const imgEl = document.querySelector('img');
  const inputEl = document.querySelector('input[type="text"]');

  const renderer = new Renderer('canvas');


  inputEl.addEventListener('input', debounce(onInput, 1000));

  function onInput() {
    const name = inputEl.value;
    if (name.length > 0) {
      imgEl.src = `https://api.adorable.io/avatars/285/${name}.png`;
    }
  }

});
