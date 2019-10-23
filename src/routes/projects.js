import { Router } from 'express'
import { ProjectController } from '../controllers'
import { AuthCheck } from '../middlewares'

const router = Router()

const { getProjects, updateProject, createProject, addUsersToProject, deleteProject } = ProjectController

router.use(AuthCheck)

router.get('/', getProjects)
router.post('/', createProject)
router.patch('/:projectId', updateProject)
router.patch('/:projectId/users', addUsersToProject)
router.delete('/:projectId', deleteProject)

export default router
