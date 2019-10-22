import { Company, Department } from '../models'
import { RequestError } from '../errors'

export async function getCompanies(req, res, next) {
    const { page = 1, limit = 20 } = req.query
    const offset = page * limit - limit

    try {
        const companies = await Company.findAll({
            offset,
            limit: +limit,
            attributes: ['id', 'name'],
            include: [
                {
                    model: Department,
                    attributes: ['name'],
                    as: 'departments',
                },
            ],
        })

        res.json({ data: companies })
    } catch (err) {
        next(new RequestError("Error while retrieving companies' data"))
    }
}

export async function createCompany(req, res, next) {
    const { name } = req.body

    try {
        await Company.create({ name })

        res.status(201).json({ message: 'Company created' })
    } catch (err) {
        next(new RequestError('Error while creating company'))
    }
}

export async function updateCompany(req, res, next) {
    const { companyId } = req.params
    const { name } = req.body

    try {
        const company = await getCompanyById(companyId)

        if (company === null) return next(new RequestError("Company with such id doesn't exist"))

        await company.update({ name })

        res.status(200).json({ message: 'Company updated!' })
    } catch (error) {
        next(new RequestError('Error while updating company'))
    }
}

export async function deleteCompany(req, res, next) {
    const { companyId: id } = req.params

    try {
        await Company.destroy({ where: { id } })
        res.json({ message: 'Company deleted succesfully' })
    } catch (err) {
        next(new RequestError("Couldn't delete company"))
    }
}

async function getCompanyById(id) {
    try {
        const result = await Company.findOne({ where: { id } })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
