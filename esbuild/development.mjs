import * as esbuild from 'esbuild';
// import * as sass from 'sass';
// import { sassPlugin } from 'esbuild-sass-plugin';

let ctx;

try {
	ctx = await esbuild.context({
		entryPoints: ['src/index.js'],
		bundle: true,
		outfile: 'public/static/bundle.js',
		// plugins: [sassPlugin({ type: 'style', logger: sass.Logger.silent, quietDeps: true })],
		define: {
			'process.env.NODE_ENV': "'development'"
		},
		loader: {
			'.js': 'jsx'
		},
	});

	await ctx.watch();
	console.log('Watching app...');

	const { host, port } = await ctx.serve({
		servedir: 'public',
		fallback: 'public/index.html',
		port: 3000,
		host: 'localhost'
	});

	console.info(`Hot refresh at http://${host}:${port}`);
} catch (error) {
	console.error('An error occurred:', error);
	process.exit(1);
}
