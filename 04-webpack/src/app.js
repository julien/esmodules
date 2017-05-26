import Renderer from './renderer.js';

window.addEventListener('load', () => {

  const renderer = new Renderer('canvas');

  const btn = document.querySelector('button');
  btn.addEventListener('click', onClick);
  function onClick() {
    btn.disabled = 'disabled';
    renderer.loadImage('https://unsplash.it/512?random')
      .then(() => {
        btn.disabled = '';
      });
  }

  let then = 0;
  function loop(time) {
    requestAnimationFrame(loop);

    const now = time * 0.001;
    const deltaTime = Math.min(0.1, now - then);
    then = now;

    renderer.render(now);
  }
  loop();
});
