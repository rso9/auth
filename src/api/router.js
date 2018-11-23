import express from 'express'
import userController from './controllers/user'

const router = express.Router()

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/users', userController.index)

export default router
