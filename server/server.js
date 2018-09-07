const path = require('path');
const publicPath = path.join(__dirname, './../public');
const serverPath = path.join(__dirname, './../server');

const express = require('express');

const port = process.env.PORT || 3000;
const app = express();



// Let node know the static folder
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
