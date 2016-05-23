import { rollup } from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: './testPing.js',
  format: 'cjs',
  plugins: [
    nodeResolve({
      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // if there's something your bundle requires that you DON'T
      // want to include, add it to 'skip'
      skip: [ 'some-big-dependency' ],  // Default: []

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: true  // Default: true
    }),
    commonjs(),
  ],
  dest: 'bundle.js'
};