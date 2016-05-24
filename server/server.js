var express = require('express');

var app = express();

var db = require('./config/db.js');
// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 8000

app.listen(process.env.PORT || 8000);

// export our app for testing and flexibility, required by index.js
module.exports = app;