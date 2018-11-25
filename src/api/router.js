import express from 'express'
import userController from './controllers/user'
import healthController from './controllers/health'

const router = express.Router()

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/users', userController.index)
router.get('/health', healthController.health)

export default router
