
export function createShader(gl, src, type) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const e = new Error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    throw e;
  }
  return s;
}

export function createProgram(gl, vsrc, fsrc) {
  const vs = createShader(gl, vsrc, gl.VERTEX_SHADER);
  const fs = createShader(gl, fsrc, gl.FRAGMENT_SHADER);
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const e = new Error(gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    throw e;
  }
  return p;
}

export function loadTexture(url, cb) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = ' ';
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', err => reject(err));
    img.src = url;
  });
}
