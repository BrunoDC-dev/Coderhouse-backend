const { Console } = require("console");
const fs = require("fs");
const { normalizeAndDenormalize } = require("../utils/normalizr");

class ApiChat {
  async writeChatToFile(message) {
    try {
      // Normalizamos para guardar la data de esa forma y ahorrar
      const messagesNormalized = normalizeAndDenormalize("normalize", message);

      await fs.promises.writeFile(
        "./data/chat.json",
        JSON.stringify(messagesNormalized)
      );
    } catch (err) {
      console.log("no se pudo escribir el archivo " + err);
    }
  }

  async readChatFromFile() {
    try {
      const message = await fs.promises.readFile("./data/chat.json");
      const messageList = JSON.parse(message);
      const bytes =JSON.stringify(messageList).length
      console.log(JSON.stringify(messageList).length)

      //Denormalizamos la fuente
      const messagesDenormalized = normalizeAndDenormalize("denormalize", messageList);
      const denormabytes=JSON.stringify(messagesDenormalized).length
      console.log(JSON.stringify(messagesDenormalized).length)
      const valor = Math.round(bytes/denormabytes*100)
      console.log(100-valor)
      return messagesDenormalized;
    } catch (err) {
      console.log("no se pudo leer el archivo " + err);
    }
  }

  async getPorcentage() {
    try {
    
      const message = await fs.promises.readFile("./data/chat.json");
      const messageList = JSON.parse(message);
      const bytes =JSON.stringify(messageList).length
      console.log(JSON.stringify(messageList).length)

      //Denormalizamos la fuente
      const messagesDenormalized = normalizeAndDenormalize("denormalize", messageList);
      const denormabytes=JSON.stringify(messagesDenormalized).length
      console.log(JSON.stringify(messagesDenormalized).length)
      const valor = Math.round(bytes/denormabytes*100)
      const resultado=100-valor
      return resultado;
    } catch (err) {
      console.log("no se pudo leer el archivo " + err);
    }
  }

}
module.exports = ApiChat;
