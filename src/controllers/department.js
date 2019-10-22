import { Company, Department } from '../models'
import { RequestError } from '../errors'


export async function addDepartmentToCompany(req, res, next) {
    const { id } = req.params
    const {
        department: { name },
    } = req.body

    try {
        const company = await getOneCompany(id)

        const department = await Department.create({ name, company_id: id })

        res.json({ data: { company, department } })
    } catch (err) {
        next(new RequestError('Error while creating department'))
    }
}
