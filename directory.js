import rl from './input';
const async = require('async');
const child_process = require('child_process');

var fs = require('fs');

export const getDirectory = ()=>{

	return new Promise((resolve, reject)=>{
		rl.question('Path to directory ?', (path)=>{
			if(path.length <=0 ){
				console.error('Please enter a valid path');
				reject(new Error('Invalid file path'));
			} else {
				resolve(path);
			}
		});
	});
};

//checks the directory path for spaces and coverts them to backslash values
//also checks if the directory file path is accessible or not
export const checkAndModify = (path) => {
	return new Promise((resolve,reject) => {
		let array = path.split(' ');
		let newPath=array[0];
		let count=1;
		while(count<=array.length-1){
			newPath += '\\ '+array[count];
			count += 1;
		}
		console.log('New Path:', newPath );
		let workProcess = child_process.exec(`ls ${newPath}`, (err,stdout,stderr) => {
			if(err){
				console.log(err);
				console.log('Path is invalid');
				reject(err);
			} 
			resolve(newPath);
		});
	});
};

//organizes the files by extension 
export const extOrganized = (path, ext) => {
	console.log('Path: ',path, 'Ext: ',ext);
	return new Promise((resolve,reject)=> {
		let workProcess = child_process.exec(`find ${path} -name \"*${ext}\"`,(err,stdout,stderr) => {
			if(err){
				console.log('Could not find files with extension', ext);
				console.log(err);
				reject(err.code);
			}
			
			let files = stdout.split('\n');
			files.filter( file => file.length > 0);
			resolve(files);
		});
	});
};

//finds all files less than the specified size
export const sizeOrganized = (path,size) => {
	console.log('Path: ',path, 'Size: ',size);
	return new Promise((resolve,reject) => {
		let workProcess = child_process.exec(`find ${path} -type f -size -${size*1000}c`,(err,stdout,stderr) => {
			if(err){
				console.log('Could not find files with size ', size);
				console.log(err);
				reject(err.code);
			}
			let files = stdout.split('\n');
			files.filter( file => file.length > 0);
			resolve(files);
		});
	});
};

export const createDump = (path) => {
	return new Promise((resolve,reject) => {
		let workProcess = child_process.exec(`mkdir ${path}/dump`, (err,stdout,stderr) => {
			if(err){
				console.log('Could not create dump directory');
				console.log(err);
				reject(err);
			}
			console.log(stdout);
			console.log(stderr);
			resolve({
				path:path,
				dump:`${path}/dump`
			});
		})
	});
};

export const dirtyMove = (path) => {
	return new Promise((resolve,reject) => {
		console.log(`find ${path} -name \"*.nfo\" -exec mv {} ${path}/dump \\;`);
		
		let workProcess = child_process.exec(`find ${path} -name \"*.nfo\" -exec mv {} ${path}\dump \\;`, (err,stdout,stderr) => {
			if(err){
				console.log('Dirty move failed');
				console.log(err);
				reject(err);
			}
			console.log(stdout);
			console.log(stderr);
			resolve(stdout);
		});
	});
};