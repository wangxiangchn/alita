"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var utils_1 = require("@umijs/utils");
var utils_2 = require("./utils");
var http_1 = __importDefault(require("http"));
var port = normalizePort(process.env.PORT || '3000');
var app = express_1.default();
app.set('port', port);
// view engine setup

app.use(compression_1.default());
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));

app.use('/api', http_proxy_middleware_1.createProxyMiddleware({
    target: 'https://proapi.azurewebsites.net/',
    changeOrigin: true,
    pathRewrite: { '^': '' },
}));
var ignore = [
    // ignore mock files under node_modules
    'node_modules/**',
];
var mockData = utils_2.getMockData({
    cwd: utils_1.winPath(process.cwd()) + "/dist",
    ignore: ignore,
}).mockData;
app.use(function (req, res, next) {
    var match = mockData && utils_2.matchMock(req, mockData);
    if (match) {
        return match.handler(req, res, next);
    }
    else {
        return next();
    }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(500);
    res.render('error');
});
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
module.exports = app;
