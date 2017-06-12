import { vertShader, fragShader } from "./shader.js";
import { createProgram, createShader, loadTexture } from "./gl.js";

export default class Renderer {
  constructor(canvasId) {
    this.initialize(canvasId);
  }

  initialize(canvasId) {
    const canvas = document.getElementById(canvasId);
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
      throw new Error("unable to get WebGL context");
    }
    this.gl = gl;

    this.program = createProgram(this.gl, vertShader, fragShader);
    this.gl.useProgram(this.program);

    this.data = {
      a_position: this.gl.getAttribLocation(this.program, "a_position"),
      a_texCoord: this.gl.getAttribLocation(this.program, "a_texCoord"),
      u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      u_image: this.gl.getUniformLocation(this.program, "u_image"),
      u_time: this.gl.getUniformLocation(this.program, "u_time")
    };

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    this.positionBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(this.data.a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(this.data.a_position, 2, this.gl.FLOAT, false, 0, 0);

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        1.0,
        1.0,
        0.0,
        1.0,
        1.0
      ]),
      this.gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(this.data.a_texCoord);
    gl.vertexAttribPointer(this.data.a_texCoord, 2, this.gl.FLOAT, false, 0, 0);

    this.texture = this.createTexture();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.uniform2f(
      this.data.u_resolution,
      this.gl.canvas.width,
      this.gl.canvas.height
    );
  }

  createTexture() {
    const tex = this.gl.createTexture();
    this.gl.activeTexture(this.gl.TEXTURE0 + 0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );

    return tex;
  }

  drawImage(x, y, w, h) {
    const x1 = x;
    const x2 = x + w;
    const y1 = y;
    const y2 = y + h;

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      this.gl.STATIC_DRAW
    );
  }

  setTexture() {
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.image
    );
  }

  loadImage(url) {
    return loadTexture(`${url}&cachebust=${Date.now()}`).then(img => {
      this.image = img;
      this.setTexture(img);
    });
  }

  render(time) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    if (time !== undefined) {
      this.gl.uniform1f(this.data.u_time, time);
    }

    if (this.shouldDrawImage()) {
      this.gl.uniform1i(this.data.u_image, 0);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

      const x = (this.gl.canvas.width - this.image.width) * 0.5;
      const y = (this.gl.canvas.height - this.image.height) * 0.5;
      this.drawImage(x, y, this.image.width, this.image.height);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
  }

  shouldDrawImage() {
    return this.image && this.image.width > 0 && this.image.height > 0;
  }
}
