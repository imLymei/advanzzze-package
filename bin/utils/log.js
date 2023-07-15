import { Chalk } from 'chalk';
import logUpdate from 'log-update';

const loadingFrames = ['', '.', '..', '...'];
let index = 0;
let globalText = '';

var interval = null;

export const chalk = new Chalk();

export function startLog(text) {
	if (interval != null) endLog();
	interval = setInterval(() => {
		const frame = loadingFrames[(index = ++index % loadingFrames.length)];

		logUpdate(`${chalk.cyan('-')} ${text}${frame}`);
	}, 250);
	globalText = text;
}

export function endLog(value) {
	clearInterval(interval);
	logUpdate(`${chalk.cyan('-')} ${globalText} ${value == 0 ? chalk.green('✓') : chalk.red('x')}\n`);
	interval = null;
	logUpdate.done();
}

export function setText(text) {
	globalText = text;
}
