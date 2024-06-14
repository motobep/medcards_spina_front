import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'



const srcDir = resolve(__dirname, 'src')
const targetDir = resolve(__dirname, 'public')


export default defineConfig({
	root: srcDir,
	plugins: [
		vue(),
		viteStaticCopy({
			targets: [
				{
					src: srcDir + '/assets/*',
					dest: targetDir + '/assets',
				},
			],
		}),
	],
	build: {
		outDir: targetDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				// Pages
				index: srcDir + '/index.html',
			},
			output: {
				// Put assets in admin/assets folder
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = 'img';
					} else if (/woff|woff2|ttf|eot/i.test(extType)) {
						extType = 'fonts';
					}
					return `assets/${extType}/[name]-[hash][extname]`;
				},
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
			}
		}
	},

	resolve: {
		alias: {
			'@': srcDir,
			'@assets': srcDir + '/assets',
			'@template': srcDir + '/assets/template',
			'@components': srcDir + '/components',
			'@views': srcDir + '/views',
		}
	},
	server: {
		proxy: {
			'/api': {
				target: process.env.NODE_ENV === 'development' ? 'http://localhost:8888' :'https://90.156.224.39',
				changeOrigin: true,
				secure: false,
				rewrite: process.env.NODE_ENV === 'development' ? (path) => path.replace(/^\/api/, '') : null,
			},
		},
	},
})
