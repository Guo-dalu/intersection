export const manifest = {
	appDir: "_app",
	appPath: "intersection/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.bbc46d2b.js","app":"_app/immutable/entry/app.4efee6f0.js","imports":["_app/immutable/entry/start.bbc46d2b.js","_app/immutable/chunks/scheduler.03c2db9d.js","_app/immutable/chunks/singletons.69afdfa4.js","_app/immutable/chunks/index.84c8d6f1.js","_app/immutable/chunks/paths.b37c24a1.js","_app/immutable/entry/app.4efee6f0.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.03c2db9d.js","_app/immutable/chunks/index.5e9a3d9d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/statistic",
				pattern: /^\/statistic\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
