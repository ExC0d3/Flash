import {
	getDirectory,
	extOrganized,
	sizeOrganized,
	checkAndModify,
	createDump,
	dirtyMove,
	getConfig,
} from './directory'

let path = '';
getDirectory()
	.then( data => checkAndModify(data))
	.then( data => {
		path = data;
		return getConfig();
	})
	.then( data => {
		createDump(path);
		return data;
	})
	.then( data => {
		let include = data.include;
		let exclude = data.exclude;
		
		return Promise.all(include.map( datum => {
			dirtyMove(path,datum);
		}));
	})
	.then(data => {
		console.log(data);
		process.exit(0);
	})
	.catch( err => {
		console.log(err);
		process.exit(1);
});