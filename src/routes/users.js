import { Router } from 'express'
import { UserController } from '../controllers'

const router = Router()

const { signupUser, loginUser } = UserController

router.post('/signup', signupUser)
router.post('/login', loginUser)

export default router
