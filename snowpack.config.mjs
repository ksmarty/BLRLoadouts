/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: { url: "/", static: true },
		src: { url: "/dist" },
	},
	plugins: ["@snowpack/plugin-svelte", "@snowpack/plugin-dotenv"],
	routes: [
		/* Example: Enable an SPA Fallback in development: */
		// {"match": "routes", "src": ".*", "dest": "/index.html"},
	],
	optimize: {
		minify: true,
		treeshake: true,
		target: "es2020",
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
};
