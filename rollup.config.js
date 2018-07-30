export default {
  input: 'src/main.js',
  output: [{
    file: 'dist/socketizer.cjs.js',
    format: 'cjs',
  }, {
    file: 'dist/socketizer.es.js',
    format: 'es',
  }],
  external: [
    'net',
  ],
};

// vim: set ts=2 sw=2 tw=80:

