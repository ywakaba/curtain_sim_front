const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/functions/*', 
        { target: 'http://localhost:3001/',
        "secure": false }
    ));
    app.use(proxy('/prices/*', 
        { target: 'http://localhost:3001/',
        "secure": false }
    ));
}
