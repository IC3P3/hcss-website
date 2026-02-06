import { fileURLToPath } from 'node:url';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const isStrict = process.env.STRICT ?? false;

const baseRules = {
	'no-undef': 'off',
	'no-duplicate-imports': ['error', { includeExports: true }],
	'no-template-curly-in-string': 'warn',
	'no-unmodified-loop-condition': 'warn',
	'no-useless-assignment': 'warn',
	'require-atomic-updates': 'error',
	camelcase: 'error',
	'default-case': 'error',
	'default-case-last': 'warn',
	eqeqeq: ['error', 'smart'],
	'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
	'prefer-object-has-own': 'warn',
	'guard-for-in': 'warn',
	'init-declarations': 'warn',
	'max-classes-per-file': 'error',
	'max-depth': 'error',
	'no-empty-function': ['error', { allow: ['constructors'] }],
	'no-implicit-coercion': 'warn',
	'no-inline-comments': 'warn',
	'no-magic-numbers': [
		'error',
		{
			ignoreArrayIndexes: true,
			ignoreDefaultValues: true,
			ignoreClassFieldInitialValues: true,
			enforceConst: true
		}
	],
	'no-multi-assign': 'warn',
	'no-multi-str': 'warn',
	'no-negated-condition': 'error',
	'no-nested-ternary': 'error',
	'no-new-func': 'error',
	'no-new-wrappers': 'warn',
	'no-proto': 'error',
	'no-regex-spaces': 'warn',
	'no-return-assign': 'warn',
	'no-sequences': 'warn',
	'no-throw-literal': 'error',
	'no-unneeded-ternary': 'error',
	'no-useless-computed-key': 'error',
	'no-useless-concat': 'warn',
	'no-useless-return': 'warn',
	'no-var': 'error',
	'prefer-const': 'error',
	'prefer-numeric-literals': 'warn',
	'prefer-promise-reject-errors': 'warn',
	'prefer-template': 'warn',
	radix: 'warn',
	'require-await': 'warn',
	yoda: 'error'
};

const strictRules = {
	...baseRules,
	'prefer-template': 'error',
	'no-warning-comments': 'error',
	'no-useless-rename': 'error',
	'no-console': 'error',
	'no-alert': 'error'
};

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: isStrict ? strictRules : baseRules
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['eslint.config.js', 'svelte.config.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		files: ['**/*.{spec,test}.{ts,js}'],
		rules: {
			'no-magic-numbers': 'off'
		}
	}
);
