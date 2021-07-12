// module.exports = {
// 	env: {
// 		es2021: true,
// 		node: true
// 	},
// 	extends: ['airbnb-base', 'prettier'],
// 	parser: '@typescript-eslint/parser',
// 	parserOptions: {
// 		ecmaVersion: 12,
// 		sourceType: 'module'
// 	},
// 	plugins: ['@typescript-eslint', 'prettier'],
// 	rules: {
// 		'prettier/prettier': ['off'],
// 		eqeqeq: 'off'
// 	}
// }
module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
}
