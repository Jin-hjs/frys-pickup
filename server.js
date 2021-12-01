const express = require('express'),
    path = require("path");

const app = express(),
    port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use("/", (req, res) => {
    // res.send(`port is ${port}`);
    res.sendFile(path.join(__dirname + '/public/landing.html'));
});

app.listen(port);