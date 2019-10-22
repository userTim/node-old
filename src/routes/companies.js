import { Router } from 'express'
import { CompanyController, DepartmentController } from '../controllers'
import { AuthCheck } from '../middlewares'
import departmentRouter from './departments'

const router = Router()

const { getCompanies, createCompany, updateCompany, deleteCompany } = CompanyController
const { addDepartmentToCompany, getDepartmentsByCompany } = DepartmentController

router.use(AuthCheck)
router.use('/:companyId/departments', departmentRouter)

router.get('/', getCompanies)
router.post('/', createCompany)
router.patch('/:companyId', updateCompany)
router.get('/:companyId/departments', getDepartmentsByCompany)
router.post('/:companyId/departments', addDepartmentToCompany)
router.delete('/:companyId', deleteCompany)

export default router
