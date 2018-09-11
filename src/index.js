import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import config from './conf';
import http from 'http';
import cors from 'cors';
var Raven = require('raven');
import api from './api';


let port = config.app['port'];
let app = express();
let whitelist = Object.keys(config.whitelist).map(k => config.whitelist[k]);

/* Raven.config('https://ef7e4dfed8a0410da6886ed00b1aaaf4:296725e28813410184bd8d2b78f126d8@sentry.io/194688').install();
app.use(Raven.requestHandler()); */

app.set("port", port);
app.use(bodyParser.json({ limit: config.app['bodyLimit'] }));
app.use(cookieParser(config.app['cookie_secret']));


app.use(cors({
    origin: (origin, callback) => {
        console.log(origin);
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1 || typeof origin === "undefined";
        console.log('Is IP allowed: ' + originIsWhitelisted);
        let failureResp = 'You are not authorized to perform this action';
        callback(originIsWhitelisted ? null : failureResp, originIsWhitelisted);
    }
}));
app.use('/api', api);

http.createServer(app).on('error', function () {
    console.log('Can\'t connect to server.');
})
.listen(port, () => console.log(`Server Started :: ${port}`));

