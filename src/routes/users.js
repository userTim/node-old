import { Router } from 'express'
import { UserController, Authentication } from '../controllers'
import { AuthCheck, UserIdCheck } from '../middlewares'

const router = Router()

const { signupUser, loginUser } = Authentication
const { getUsers, updateUser } = UserController

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/', AuthCheck, getUsers)
router.patch('/:userId', AuthCheck, UserIdCheck, updateUser)

export default router
