import { exec } from 'child_process';
import { endLog, startLog, chalk } from './log.js';

export default async function createNextProject(isTypescript) {
	startLog(`Creating ${chalk.cyan('Next.js')} application`);

	const code = exec(
		`npx create-next-app@latest . ${
			isTypescript ? '--ts' : '--js'
		} --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*"`
	);

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
