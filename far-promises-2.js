function initTableau(resolve, reject) {
	console.log('initTableu() started');
	setTimeout(() => {
		console.log('initTableu() completed');
		resolve('init complete');
	}, 2000);
}

// ---

let tableauReady = new Promise(initTableau);

// --

tableauReady.then(() => {
	// something that needs tableau to be fully initialized
	console.log('tableau is finally ready');
});

// -- later in the app

setTimeout(() => {
	tableauReady.then(() => {
		// something that needs tableau to be fully initialized
		console.log('tableau is ready');
	});
}, 4000);
