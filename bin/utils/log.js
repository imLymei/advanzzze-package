import logUpdate from 'log-update';

const loadingFrames = ['', '.', '..', '...'];
let index = 0;
let globalText = '';

var interval = null;

export function startLog(text) {
	if (interval != null) endLog();
	interval = setInterval(() => {
		const frame = loadingFrames[(index = ++index % loadingFrames.length)];

		logUpdate(`${text}${frame}`);
	}, 250);
	globalText = text;
}

export function endLog(value) {
	clearInterval(interval);
	logUpdate(`${globalText} ${value == 0 ? '✓' : 'x'}\n`);
	interval = null;
	logUpdate.done();
}

export function setText(text) {
	globalText = text;
}
