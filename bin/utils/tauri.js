import * as fs from 'fs';
import { exec } from 'child_process';
import { endLog, startLog } from './log.js';

const nextConfig =
	"/** @type {import('next').NextConfig} */\nconst nextConfig = {\n    output: 'export',\n    images: { unoptimized: true },\n};\n\nmodule.exports = nextConfig";

export default function installTauri() {
	startLog('Installing Tauri');
	fs.writeFileSync(`./next.config.js`, nextConfig);
	fs.appendFileSync('./.gitignore', '\n/src-tauri/');
	exec('npm install --save-dev @tauri-apps/cli', (error) => {
		if (error) {
			endLog(1);
			console.error(error);
		} else {
			endLog(0);

			console.log('\nAdicione:\n"scripts": {\n    "tauri": "tauri"\n}\nem package.json\n');
			console.log('Execute: \n    npm run tauri init\n    npm run tauri dev\n');
			console.log('For more information visit: https://tauri.app/v1/guides/getting-started/setup/next-js/');
		}
	});
}
