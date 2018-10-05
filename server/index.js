import express from 'express';

import serverRenderer from './middleware/renderer';

const PORT = 3000;
const path = require('path');

const app = express();

// send static files like *.js, *.css from build folder
app.use('/static', express.static(path.resolve(path.join(__dirname, '../build/static'))));

// render React on server on every request
app.get('/*', serverRenderer);

// start the app
app.listen(PORT, (error) => {
  if (error) {
    return console.log('something bad happened', error);
  }

console.log("listening on " + PORT + "...");

});
