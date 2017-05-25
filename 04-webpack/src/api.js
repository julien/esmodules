
export function loadAvatar(name = 'foo') {
  const headers = new Headers();
  return fetch(`https://api.adorable.io/avatars/285/${name}.png`, {
    method: 'GET',
    mode: 'cors'
  })
    .then(resp => resp.blob());
}
