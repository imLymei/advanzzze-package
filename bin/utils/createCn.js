import * as fs from 'fs';
import { exec } from 'child_process';
import { endLog, setText, startLog, chalk } from './log.js';

const cn = {
	ts: "import clsx, { ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport default function cn(...inputs: ClassValue[]){\n    return twMerge(clsx(inputs));\n}",
	js: "import clsx from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport default function cn(...inputs) {\n    return twMerge(clsx(inputs));\n}",
};

export default async function createCn(isTypescript) {
	let hasError = '';

	await installClsx().catch((error) => (hasError = error));

	if (!hasError) await installTwMerge().catch((error) => (hasError = error));

	if (!hasError) await createCnFile(isTypescript).catch((error) => (hasError = error));

	new Promise((resolve, reject) => {
		if (hasError) {
			endLog(1);
			reject();
		} else {
			endLog(0);
			resolve();
		}
	});
}

async function installClsx() {
	startLog(`Creating ${chalk.cyan('cn')} - ${chalk.yellow('0/2')}`);

	const code = exec('npm install --save clsx');

	await new Promise((resolve, reject) => {
		code.on('error', () => {
			endLog(1);
			reject();
		});
		code.on('close', () => {
			setText(`Creating ${chalk.cyan('cn')} - ${chalk.yellow('1/2')}`);
			resolve();
		});
	});
}

async function installTwMerge() {
	const code = exec('npm i tailwind-merge');

	await new Promise((resolve, reject) => {
		code.on('error', () => {
			endLog(1);
			reject();
		});
		code.on('close', () => {
			setText(`Creating ${chalk.cyan('cn')} - ${chalk.green('2/2')}`);
			resolve();
		});
	});
}

function createCnFile(isTypescript) {
	let hasError = '';

	try {
		const utilsPath = `./src/utils`;

		fs.mkdirSync(utilsPath);

		if (isTypescript) {
			fs.writeFileSync(`${utilsPath}/cn.ts`, cn['ts']);
		} else {
			fs.writeFileSync(`${utilsPath}/cn.ts`, cn['js']);
		}
	} catch (error) {
		hasError = error;
		console.error(error);
	}

	return new Promise((resolve, reject) => {
		if (hasError) reject(error);
		else resolve();
	});
}
