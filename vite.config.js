import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import postcssSortMediaQueries from 'postcss-sort-media-queries'
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
	],
	css: {
		postcss: {
			plugins: [
				postcssSortMediaQueries(),
				autoprefixer(),
			],
		},
		preprocessorOptions: {
			scss: {
				additionalData: `
				@use "sass:math";
				@use "@/styles/_variables.scss" as *;`
			}
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
