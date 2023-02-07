const Router=require('express')
const path =require('path')
const {fork} = require('child_process') 
const random = new Router();

random.get("/", (req, res) => {

  const child = fork(
      path.resolve(process.cwd(), "./src/controller/randomC.js")
    );
    child.send(1);
    child.on("message", (msg) => {
      res.json({ numeros: msg });
    });
  });

module.exports= random;

