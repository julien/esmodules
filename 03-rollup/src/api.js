
export function loadImage() {
  return fetch('http://thecatapi.com/api/images/get')
    .then(resp => {
      return resp.blob();
    })
}
