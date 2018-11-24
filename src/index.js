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
