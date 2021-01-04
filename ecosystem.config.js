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
			host: '138.91.32.16',
			ssh_options: 'PasswordAuthentication=Yes',
			ref: 'origin/master',
			repo: 'https://github.com/thetkpark/sit-timetable.git',
			path: '/home/thetkpark',
			'post-deploy': 'yarn; yarn build; pm2 reload ecosystem.config.js'
		}
	}
}
