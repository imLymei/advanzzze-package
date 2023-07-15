import { exec } from 'child_process';
import { endLog, startLog, chalk } from './log.js';

export async function installTwPrettier() {
	startLog(`Installing ${chalk.cyan('tailwind prettier plugin')}`);

	const code = exec('npm install -D prettier prettier-plugin-tailwindcss');

	await new Promise((resolve, reject) => {
		code.on('error', () => {
			endLog(1);
			reject();
		});
		code.on('close', () => {
			endLog(0);
			resolve();
		});
	});
}
