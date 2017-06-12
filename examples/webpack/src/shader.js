export const vertShader = `#version 300 es

in vec2 a_position;
in vec2 a_texCoord;
uniform vec2 u_resolution;
out vec2 v_texCoord;
out vec2 v_pos;
out vec2 v_resolution;


void main() {

  vec2 pos = ((a_position / u_resolution) * 2.0) - 1.0;

  v_texCoord = a_texCoord;
  v_pos = pos;
  v_resolution = u_resolution;

  gl_Position = vec4(pos * vec2(1.0, -1.0), 0.0, 1.0);
}`;

export const fragShader = `#version 300 es

precision mediump float;

uniform sampler2D u_image;
uniform float u_time;
in vec2 v_texCoord;
in vec2 v_pos;
in vec2 v_resolution;
out vec4 outColor;

void main() {

  vec2 st = v_texCoord;
  vec2 direction = st - 0.5;
  direction.x *= v_resolution.x / v_resolution.y;
  st *= sin(length(direction));
  st *= mix(st.y, cos(float(length(direction * 0.3))), 0.9);
  direction *= cos(u_time * 0.3);

  st.xy += cos(u_time * 0.01) * sin(u_time * 0.023);

  outColor = texture(u_image, st);
}`;
