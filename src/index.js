import 'babel-polyfill';

import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'

const configurationPath = path.join(__dirname, 'config', 'config.yaml')
const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default
const configurationUtil = require('@kumuluz/kumuluzee-config').ConfigurationUtil

const pjson = require('../package.json')

const winston = require('winston')
require('winston-logstash')

winston.add(winston.transports.Logstash, {
    port: 13005,
    node_name: 'Auth microservice',
    meta: {
        version: pjson.version || process.env.VERSION || '0.7.4',
        environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
    },
    host: 'ea6e1fcd-4e85-48c9-8a3e-db8a351fe3b4-ls.logit.io'
})

let util = null

const register = async () => {

    await configurationUtil.initialize({
        extension: 'etcd',
        configPath: configurationPath
    })

    util = configurationUtil
    await KumuluzeeDiscovery.initialize({extension: 'etcd'})
    KumuluzeeDiscovery.registerService()
}

register()

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
