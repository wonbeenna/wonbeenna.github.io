import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors

	extensions: ['.svelte', '.md'],

	preprocess: [
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer]
			},
			preserve: ['ld+json']
		}),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	],

	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'*',
				'/api/posts.json',
				'/api/posts/count',
				'/api/posts/page/[page]',
				'/api/posts/category',
				'/page/[page]',
				'/blog/category/[category]',
				'/blog/[category]'
			]
		}
	}
};

export default config;
