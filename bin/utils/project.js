import * as fs from 'fs';
import { exec } from 'child_process';
import { endLog, setText, startLog } from './log.js';
import installTauri from './tauri.js';

const cn = {
	ts: "import clsx, { ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport default function cn(...inputs: ClassValue[]){\n    return twMerge(clsx(inputs));\n}",
	js: "import clsx from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport default function cn(...inputs) {\n    return twMerge(clsx(inputs));\n}",
};

export function createNextProject(isTypescript, isDesktop) {
	startLog('Creating Next.js application');

	exec(
		`npx create-next-app@latest . ${
			isTypescript ? '--ts' : '--js'
		} --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*"`,
		(error) => {
			if (error) {
				endLog(1);
				console.error(error.message);
			} else {
				endLog(0);
				createUtils(isTypescript, isDesktop);
			}
		}
	);
}

function createUtils(isTypescript, isDesktop) {
	startLog('Creating cn');
	exec('npm install --save clsx', (error) => {
		if (error) {
			console.error(error.message);
			endLog(1);
		} else {
			setText('Creating cn - 1/2');
			exec('npm i tailwind-merge', (error) => {
				if (error) {
					console.error(error.message);
					endLog(1);
				} else {
					setText('Creating cn - 2/2');

					try {
						const utilsPath = `./src/utils`;

						fs.mkdirSync(utilsPath);

						if (isTypescript) {
							fs.writeFileSync(`${utilsPath}/cn.ts`, cn['ts']);
						} else {
							fs.writeFileSync(`${utilsPath}/cn.ts`, cn['js']);
						}

						endLog(0);

						startLog('Installing tailwind prettier plugin');
						exec('npm install -D prettier prettier-plugin-tailwindcss', (error) => {
							if (error) {
								endLog(1);
								console.error(error);
							} else {
								endLog(0);
								if (isDesktop) {
									installTauri();
								}
							}
						});
					} catch (error) {
						console.error(error);
					}
				}
			});
		}
	});
}
