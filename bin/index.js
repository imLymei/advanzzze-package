#! /usr/bin/env node
import inquirer from 'inquirer';
import { createNextProject } from './utils/project.js';

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

inquirer.prompt(questions).then((answers) => {
	const { projectLanguage, projectType } = answers;

	console.log('');

	const isTypescript = projectLanguage == 'typescript';
	const isDesktop = projectType == 'desktop';

	createNextProject(isTypescript, isDesktop);
});
