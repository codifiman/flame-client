var drakov = require('drakov');

var argv = {
  autoOptions: true,
  sourceFiles: './api.md',
  serverPort: 8080,
  method: ['GET', 'POST', 'OPTIONS']
};

drakov.run(argv, function(){ })
