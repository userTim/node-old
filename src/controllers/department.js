import { User, Department } from '../models'
import { RequestError } from '../errors'
import { Op } from 'sequelize'
import { getCompanyById } from './company'

export async function addDepartmentToCompany(req, res, next) {
    const { companyId } = req.params
    const createOptions = {}

    Object.keys(req.body).forEach(fieldName => (createOptions[fieldName] = req.body[fieldName]))

    try {
        const company = await getCompanyById(companyId)

        if (company === null) return next(new RequestError("Company with such id doesn't exist"))

        createOptions.company_id = companyId

        await Department.create(createOptions)

        res.json({ message: 'Department successfully added to company' })
    } catch (err) {
        next(new RequestError('Error while creating department'))
    }
}

export async function addUsersToDepartment(req, res, next) {
    const { departmentId } = req.params
    const { usersIds } = req.body

    try {
        const dept = await getDepartmentById(departmentId)
        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: usersIds,
                },
            },
        })

        await dept.addUsers(users)
        res.json({ message: 'Users added to department successfully' })
    } catch (err) {
        next(new RequestError('Error while adding users to department'))
    }
}

export async function getDepartmentsByCompany(req, res, next) {
    const { companyId: company_id } = req.params

    try {
        const departments = await Department.findAll({
            where: {
                company_id,
            },
            attributes: ['id', 'name'],
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['id', 'name', 'login'],
                },
            ],
        })

        res.json(departments)
    } catch (err) {
        next(new RequestError('Error while retrieving departments data'))
    }
}

export async function updateDepartment(req, res, next) {
    const { departmentId } = req.params
    const updateOptions = {}

    Object.keys(req.body).forEach(fieldName => (updateOptions[fieldName] = req.body[fieldName]))

    try {
        const department = await getDepartmentById(departmentId)

        if (department === null) return next(new RequestError("Department with such id doesn't exist"))

        await department.update(updateOptions)

        res.status(200).json({ message: 'Department updated!' })
    } catch (error) {
        next(new RequestError('Error while updating department'))
    }
}

export async function deleteDepartment(req, res, next) {
    const { departmentId: id } = req.params

    try {
        await Department.destroy({ where: { id } })
        res.json({ message: 'Department deleted succesfully' })
    } catch (err) {
        next(new RequestError("Couldn't delete department"))
    }
}

async function getDepartmentById(id) {
    try {
        const result = await Department.findOne({ where: { id } })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
