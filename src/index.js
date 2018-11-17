import 'babel-polyfill';

import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

let app = express()
app.server = http.createServer(app)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

import router from './api/router'
app.use('/', router)

app.server.listen(process.env.PORT || 3000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app
