const express = require('express');
const app = express();


app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html')
// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
// Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.listen(3000, function() {
console.log('listening on 3000')
})