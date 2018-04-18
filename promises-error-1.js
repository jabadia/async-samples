const axios = require('axios');

function getRandomJoke() {
	return axios
		.get('http://api.icndb.xxcom/categories')
		.then(response => {
			const categories = response.data.value;
			return categories;
		})
		.catch(err => {
			console.error('an error happened in the first part:', err.message);
			return ['no categories'];
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
			return joke.joke;
		})
		.catch(err => {
			console.error('an error happened:', err.message);
			return 'fallo!';
		});
}

getRandomJoke().then(joke => {
	console.log('JOKE: ', joke);
});
