import { Router } from 'express'
import { CompanyController } from '../controllers'
import { AuthCheck } from '../middlewares'

const router = Router()

const { getCompanies, createCompany, updateCompany, addDepartmentToCompany } = CompanyController

router.get('/', getCompanies)
router.post('/', AuthCheck, createCompany)
router.patch('/:id', AuthCheck, updateCompany)
router.post('/:id/department', AuthCheck, addDepartmentToCompany)

export default router
