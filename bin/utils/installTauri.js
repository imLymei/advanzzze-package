import * as fs from 'fs';
import { exec } from 'child_process';
import { endLog, startLog, chalk } from './log.js';

const nextConfig =
	"/** @type {import('next').NextConfig} */\nconst nextConfig = {\n    output: 'export',\n    images: { unoptimized: true },\n};\n\nmodule.exports = nextConfig";

export default function installTauri() {
	startLog(`Installing ${chalk.cyan('Tauri')}`);

	fs.writeFileSync(`./next.config.js`, nextConfig);
	fs.appendFileSync('./.gitignore', '\n/src-tauri/');
	exec('npm install --save-dev @tauri-apps/cli', (error) => {
		if (error) {
			endLog(1);
			console.error(error);
		} else {
			endLog(0);

			try {
				const packageFile = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

				packageFile.scripts['tauri'] = 'tauri';

				fs.writeFileSync('./package.json', JSON.stringify(packageFile, null, 4));

				console.log(
					`Execute: \n    ${chalk.green('npm run tauri init')}\n    ${chalk.green('npm run tauri dev')}\n`
				);
				console.log('For more information visit: https://tauri.app/v1/guides/getting-started/setup/next-js/');
			} catch (err) {
				console.error(err);
			}
		}
	});
}
