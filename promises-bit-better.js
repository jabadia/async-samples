const axios = require('axios');

axios
	.get('http://api.icndb.com/categories')
	.then(response => {
		const categories = response.data.value;
		return categories;
	})
	.then(categories => {
		console.log(`# available categories: ${categories.join(', ')}`);
		const randomCategory = categories[Math.floor(Math.random() * categories.length)];
		return randomCategory;
	})
	.then(randomCategory => {
		console.log(`# requesting a ${randomCategory} joke`);
		const params = { limitTo: `[${randomCategory}]` };
		return axios.get('https://api.icndb.com/jokes/random', { params }).then(response => {
			const joke = response.data.value;
			return joke;
		});
	})
	.then(joke => {
		console.log(joke.joke);
	});
