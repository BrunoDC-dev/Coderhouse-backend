const express=require('express')
const minimist=require('minimist')
const os=require('os')
const cluster=require('cluster')
const random=require('./routes/random')


const args = process.argv.slice(2);
if(args.length == 0) {
  process.exit; 
}

let options = {alias :{p: "puerto", m: "modo"} };
const param = minimist(args,options);
const PORT = param.puerto || 8080
const MODE = param.modo   || "FORK"

const numCPUs = os.cpus().length;
const numCPUsJson = {Numero_Procesadores: os.cpus().length,
	                 Puerto_escucha: PORT };


if (MODE === "CLUSTER" && cluster.isPrimary) {
 
	console.log(`PID MASTER ${process.pid}`)
 
	for (let i = 0; i < numCPUs-1; i++) {
		cluster.fork()
	}
 

	cluster.on('exit', worker => {
		console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
		cluster.fork()
	})

} else {
	const app = express()
	app.use(express.json())
	
	
	
	app.use("/api/randoms", random);	  
	
	app.get("/info//", (req, res) => {
		res.json(numCPUsJson);
	});

	app.listen(PORT, () => {
		console.log(`Servidor express escuchando en el puerto ${PORT}`);
		console.log(`PID WORKER ${process.pid}`)
	})
 }

 
