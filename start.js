import {
	getDirectory,
	extOrganized,
	sizeOrganized,
	checkAndModify,
	createDump,
} from './directory'


getDirectory()
	.then( data => checkAndModify("/media/abhinav/New Volume/TV/Flash"))
	.then( data => createDump(data))
	.then( data => {
		console.log(data);
		process.exit(0);
	})
	.catch( err => {
		console.log(err);
		process.exit(1);
});