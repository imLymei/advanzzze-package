#! /usr/bin/env node
import inquirer from 'inquirer';
import createNextProject from './utils/createNextProject.js';
import createCn from './utils/createCn.js';
import { installTwPrettier } from './utils/instalUtils.js';
import installTauri from './utils/installTauri.js';

const questions = [
	{
		type: 'list',
		name: 'projectLanguage',
		message: 'Chose the project language',
		choices: ['javascript', 'typescript'],
	},
	{
		type: 'list',
		name: 'projectType',
		message: 'Chose the project type',
		choices: ['web', 'desktop'],
	},
];

console.log('');

inquirer.prompt(questions).then(async (answers) => {
	const { projectLanguage, projectType } = answers;

	let hasError = '';

	console.log('');

	const isTypescript = projectLanguage == 'typescript';
	const isDesktop = projectType == 'desktop';

	await createNextProject(isTypescript).catch((error) => (hasError = error));
	if (!hasError) await createCn(isTypescript).catch((error) => (hasError = error));
	if (!hasError) await installTwPrettier().catch((error) => (hasError = error));
	if (!hasError && isDesktop) installTauri();
});
