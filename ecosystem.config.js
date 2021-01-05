module.exports = {
	apps: [
		{
			name: 'cscms-cs-sit-timetable',
			script: 'build/main.js',
			autorestart: true,
			env: {
				NODE_ENV: 'production',
				PORT: 4000
			}
		}
	],

	deploy: {
		production: {
			user: 'thetkpark',
			host: process.env.HOST,
			ssh_options: 'PasswordAuthentication=Yes',
			ref: 'origin/master',
			repo: 'https://github.com/thetkpark/sit-timetable.git',
			path: '/home/thetkpark/cs-sit-timetable',
			'post-deploy': 'yarn; yarn build; pm2 reload ecosystem.config.js'
		}
	}
}
