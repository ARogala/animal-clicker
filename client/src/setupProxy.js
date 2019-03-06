const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/getdata', { target: 'http://localhost:5000' }));
    app.use(proxy('/vote', { target: 'http://localhost:5000' }));
};