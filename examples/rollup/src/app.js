import EventEmitter from "./events.js";
import { loadImage } from "./api.js";

window.addEventListener("load", () => {
  const emitter = new EventEmitter();

  const imgEl = document.querySelector("img");
  const errorEl = document.querySelector(".error");

  const btn = document.querySelector("button");
  btn.addEventListener("click", e => {
    emitter.emit("loadImage");
  });

  emitter.on("loadImage", onLoad);
  emitter.on("loadError", e => {
    btn.disabled = "";
    errorEl.classList.remove("error-hidden");

    let timeout = setTimeout(() => {
      clearTimeout(timeout);

      if (!errorEl.classList.contains("error-hidden"))
        errorEl.classList.add("error-hidden");
    }, 3000);
  });

  emitter.emit("loadImage");

  function onLoad() {
    btn.disabled = "disabled";
    hideImage();
    return loadImage()
      .then(src => {
        renderImage(src);
        btn.disabled = "";
      })
      .catch(e => {
        emitter.emit("loadError", e);
      });
  }

  function renderImage(src) {
    showImage();
    imgEl.src = URL.createObjectURL(src);
  }

  function hideImage() {
    if (!imgEl.classList.contains("hidden")) imgEl.classList.add("hidden");
  }

  function showImage() {
    if (imgEl.classList.contains("hidden")) imgEl.classList.remove("hidden");
  }
});
