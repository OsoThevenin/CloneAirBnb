export default {
	components: true,
	head: {
		titleTemplate: 'Mastering Nuxt: %s',
		htmlAttrs: {
			lang: 'en',
		},
		bodyAttrs: {
			class: ['my_style'],
		},
		meta: [
			{
				charset: 'utf-8',
			},
		],
	},
	router: {
		prefetchLinks: false,
	},
	plugins: [
		'~/plugins/maps.client',
		'~/plugins/dataApi',
		'~/plugins/auth.client',
		'~/plugins/vCalendar.client',
	],
	modules: [
		'~/modules/auth',
		'~/modules/algolia',
		'~/modules/cloudinary',
		'@nuxtjs/cloudinary',
	],
	buildModules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
	cloudinary: {
		cloudName: 'dlvju6d8g',
	},
	image: {
		cloudinary: {
			baseURL: 'https://res.cloudinary.com/dlvju6d8g/image/upload/',
		},
	},
	css: ['~/assets/sass/app.scss'],
	build: {
		extractCSS: true,
		loaders: {
			limit: 0,
		},
	},
	publicRuntimeConfig: {
		auth: {
			cookieName: 'idToken',
			clientId: process.env.AUTH_CLIENT_ID,
		},
		algolia: {
			APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
			API_KEY: process.env.ALGOLIA_READ_API_KEY,
		},
		cloudinary: {
			API_KEY: process.env.CLOUDINARY_API_KEY,
		},
		googleMaps: {
			API_KEY: process.env.GOOGLE_MAPS_KEY,
		},
	},
	privateRuntimeConfig: {
		algolia: {
			APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
			API_KEY: process.env.ALGOLIA_WRITE_API_KEY,
		},
		cloudinary: {
			API_SECRET: process.env.CLOUDINARY_API_SECRET,
		},
	},
}
