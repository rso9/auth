import express from 'express'
import userController from './controllers/user'
import healthController from './controllers/health'
import samplesController from './controllers/samples'
import os from 'os'

const router = express.Router()

router.post('/login', userController.login)
router.get('/dummy', (req, res) => {
  res.status(200).end()
})
router.post('/register', userController.register)
router.get('/users', userController.index)
router.get('/health', healthController.health)
router.get('/lookup', healthController.lookup)
router.get('/request_catalog', samplesController.requestCatalog)
router.get('/v1/info', samplesController.projectInfo)

router.get('/metrics', (req, res) => {
  res.status(200).json({
    cpuInfo: os.cpus(),
    cpuUsage: os.loadavg(),
    memoryUsage: os.freemem() / os.totalmem(),
    uptime: os.uptime()
  })
})

export default router
