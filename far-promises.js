let tableauReady;

function initTableau() {
	tableauReady = new Promise((resolve, reject) => {
		console.log('initTableu() started');
		setTimeout(() => {
			console.log('initTableu() completed');
			resolve('init complete');
		}, 1000);
	});
}

// ---

initTableau();

// --

tableauReady.then(() => {
	// something that needs tableau to be fully initialized
	console.log('tableau is finally ready');
});
