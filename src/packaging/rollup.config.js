import { rollup } from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

export default {
  entry: './testPing.js',
  format: 'cjs',
  plugins: [
    commonjs(),
    babel(),
    uglify({}, minify),
  ],
  dest: 'bundle.js'
};