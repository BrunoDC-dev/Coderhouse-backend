const { Router } = require("express");
const router = Router();

const productsRouter = require('./productsRouter')
const chatRouter = require('./chatRouter') 
const fakerRouter = require('./fakerRouter')
router.use('/productos', productsRouter)
router.use('/chat', chatRouter)
router.use('/', fakerRouter)

module.exports = router;