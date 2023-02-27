const ApiChat = require("../api/apiChat");
const apiChat= new ApiChat
const server = require("express").Router();
server.get("/",async (req, res) => {
  let data = await apiChat.getPorcentage()
  return res.render("chat.hbs",{
    data:data
  });
});

module.exports = server;
