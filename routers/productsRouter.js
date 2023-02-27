const server = require("express").Router();
const path = require('path')
const Contenedor = require("../class/contenedor");

const productos = new Contenedor(path.join(__dirname, '../data/productos.json'));

server.get("/", (req, res) => {
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("index.hbs", {
      list: content,
      showList: boolean,
    });
});

server.post("/", (req, res) => {
    productos.save(req.body);
    let content = productos.content;
    let boolean = content.length !== 0;
    return res.render("index.hbs", {
      list: content,
      showList: boolean,
    });
});

module.exports = server;
