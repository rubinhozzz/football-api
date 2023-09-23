module.exports = {
	env: {
		//apiRootURI: 'http://192.168.178.44:8000',
		apiRootURI: 'http://20.4.97.191/'
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
	output: 'standalone'
}