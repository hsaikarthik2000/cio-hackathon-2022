const crypto = require('crypto');
const express = require("express");
var bodyParser = require('body-parser')
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');// or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = 16;


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    console.log("Get request called")
    res.send("Hello");
});

app.post("/encryption", function (req, res) {
    console.log("Post request called")
    var result="{";
    for (let x in req.body) {
        if(result.length!=1) result+=", ";
        result+='"'+x + '" : "'+ encrypt(req.body[x])+'"'
     }
     result+="}"
     console.log(result)
    res.json(JSON.parse(result));
});

app.post("/decryption", function (req, res) {
    console.log("Post request called")
    var result="{";
    for (let x in req.body) {
        if(result.length!=1) result+=", ";
        result+='"'+x + '" : "'+ decrypt(req.body[x])+'"'
     }
     result+="}"
     console.log(result)
    res.json(JSON.parse(result));
});

app.listen(3000, function () {
  console.log("Server is running on localhost 3000");
});

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}



