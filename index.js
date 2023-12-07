const express = require('express')
const app = express()
const http = require('http')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const globalErrorMiddleWare = require('./middleware/appErrorHandler')
const routeLoggerMiddleware = require('./middleware/routeLogger')
const helmet = require('helmet')
// const logger = require('./libs/loggerLib')
const WebSocket = require('ws');
const cors = require('cors');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(globalErrorMiddleWare.globalErrorHandler)
// app.use(routeLoggerMiddleware.logIp)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors());

let modelpath = './models';

fs.readdirSync(modelpath).forEach(function (file) {

    if (file.indexOf('.js'))
        require(modelpath + '/' + file)
})


let routePath = './routes'

fs.readdirSync(routePath).forEach(function (file) {
    if (file.indexOf('.js')) {
        console.log('including the following files');
        console.log(routePath + '/' + file)
        let route = require(routePath + "/" + file);
        route.setRouter(app)
    }

})


app.use(globalErrorMiddleWare.globalNotFoundHandler)

//creating HTTP server

const server = http.createServer(app)
//start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)
//end server listening code

//error listener for http server 'error' event.
function onError(error) {
    if (error.syscall !== 'listen') {

        throw error;
    }
    switch (error.code) {
        case 'EACCES':

            process.exit(1)
            break;
        case 'EADDRINUSE':

            process.exit(1)
            break;
        default:

    }
}

//event listener for Http server 'listening' event;
function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port;
    ('Listening on' + bind)
    console.log(bind)

}

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`You sent: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });


mongoose.connection.on('error', function (err) {
    console.log('database connection is error')
    console.log(err)
})

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log('database error')
        console.log(err)
    } else {
        console.log('database connection is open success ')
    }
})