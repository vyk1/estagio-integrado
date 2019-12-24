const tinify = require("tinify"); 
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + "/public"));
tinify.key = "47RQM7kllxlDTlMB0rWD6CBtJV6xg4Xd";
const newName = new Date().getTime() + ".png";

const source = tinify.fromFile(__dirname + "/public/image.jpg");

const resized = source.resize({
method: "scale",
width: 250
});

resized.toFile(__dirname + "/public/" + newName);

app.get('/', (req, res) => res.send("Olá"))

app.listen(21048, ()=> console.log("ouvindo"))
