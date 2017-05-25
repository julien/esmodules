import {vertShader, fragShader} from './shader.js';

export default class Renderer {
  constructor(canvasId) {
    this.initialize(canvasId)
  }

  initialize(canvasId) {
    const canvas = document.getElementById(canvasId);
    const gl = canvas.getContext('webgl');
    if (gl === null) {
      throw new Error('unable to get WebGL context');
    }
    this.gl = gl;
  }
}
