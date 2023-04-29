import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const project_name = process.env.GITHUB_REPOSITORY?.split('/')[0];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: project_name ? `/${project_name}` : ''
		}
	}
};

export default config;
