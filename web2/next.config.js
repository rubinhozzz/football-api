module.exports = {
	env: {
		apiRootURI: 'http://192.168.178.44:8000',
	},
	async redirects() {
		return [
		  {
			source: '/',
			destination: '/matches',
			permanent: true,
		  },
		];
	  },
}