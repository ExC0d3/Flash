import {
	getDirectory,
	extOrganized,
	sizeOrganized,
	checkAndModify,
	createDump,
	dirtyMove,
	getConfig,
} from './directory'


getDirectory()
	.then( data => getConfig())
	.then( data => {
		console.log(Object.keys(data));
		process.exit(0);
	})
	.catch( err => {
		console.log(err);
		process.exit(1);
});