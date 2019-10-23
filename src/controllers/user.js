import { User, Department, Project } from '../models'
import { RequestError } from '../errors'

export async function getUsers(req, res, next) {
    const { page = 1, limit = 20 } = req.params
    const offset = page * limit - limit

    try {
        const users = await User.findAll({
            offset,
            limit,
            attributes: ['name'],
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name'],
                },
                {
                    model: Project,
                    as: 'projects',
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
            ],
        })

        res.json(users)
    } catch (err) {
        next(new RequestError("Error while retrieving users' data"))
    }
}

export async function updateUser(req, res, next) {
    const { id } = req.params
    const updateOptions = {}

    Object.keys(req.body).forEach(fieldName => (updateOptions[fieldName] = req.body[fieldName]))

    try {
        const user = await getUserById(id)

        if (user === null) return next(new RequestError("User with such id doesn't exist"))

        await user.update(updateOptions)

        res.status(200).json({ message: 'User updated!' })
    } catch (error) {
        next(new RequestError('Error while updating user'))
    }
}

async function getUserById(id) {
    try {
        const result = await User.findOne({ where: { id } })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
