export function loadImage() {
  return fetch(`https://unsplash.it/512?random&cache_bust=${Date.now()}`)
    .then(resp => {
      return resp.blob();
    })
}
