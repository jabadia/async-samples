const axios = require('axios');

axios.get('http://api.icndb.com/categories').then(response => {
	const categories = response.data.value;
	console.log(`# available categories: ${categories.join(', ')}`);
	const randomCategory = categories[Math.floor(Math.random() * categories.length)];
	console.log(`# requesting a ${randomCategory} joke`);
	const params = { limitTo: `[${randomCategory}]` };
	axios.get('https://api.icndb.com/jokes/random', { params }).then(response => {
		const joke = response.data.value;
		console.log(joke.joke);
	});
});

