const cluster = require('cluster');
const app = require('express')();
const numCPUs = require('os').cpus().length;

app.use('/', (req, res) => {
	res.send('yess');
});

if (cluster.isMaster) {
	console.log(`Master Process ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker Process ${worker.process.pid} died`);
	});
} else {
	app.listen(3030);
	console.log(`Worker Process ${process.pid} started`);
}
