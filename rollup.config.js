import minify from 'rollup-plugin-babel-minify';

import pkg from './package.json';

export default {
  input: 'src/main.js',
  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }],
  external: [
    'net',
  ],
  plugins: [
    minify(),
  ],
};

// vim: set ts=2 sw=2 tw=80:

