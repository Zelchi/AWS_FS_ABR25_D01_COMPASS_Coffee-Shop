import { readJSON } from './global.js';

readJSON('/src/data/all-items.json')
	.then((data) => {
		console.log('JSON Data:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
