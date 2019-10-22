import { Router } from 'express'
import { DepartmentController } from '../controllers'
import { AuthCheck } from '../middlewares'

const router = Router({ mergeParams: true })

const { updateDepartment, addUsersToDepartment, deleteDepartment } = DepartmentController

router.use(AuthCheck)
router.patch('/:departmentId/users', addUsersToDepartment)
router.patch('/:departmentId', updateDepartment)
router.delete('/:departmentId', deleteDepartment)

export default router
