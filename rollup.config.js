import autoPreprocess from 'svelte-preprocess'
import bundleSize from 'rollup-plugin-bundle-size'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import autoprefixer from 'autoprefixer'

const production = !process.env.ROLLUP_WATCH

const name = "svelma";

export default {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: name,
		file: 'public/build/bundle.js'
	},
  plugins: [
    css({ output: 'bundle.css' }),
    svelte({
      // enable run-time checks when not in production
			compilerOptions: {
				hydratable: true,
				dev: !production,
      },
      preprocess: autoPreprocess({
        postcss: {
          plugins: [autoprefixer()],
        },
      })
    }),

    resolve(),
    commonjs(),

    production && terser(),

    // production && analyze(),
    production && bundleSize(),
  ],
  watch: {
    clearScreen: false,
  },
}
