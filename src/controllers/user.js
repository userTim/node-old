import { User } from '../models'
import { RequestError } from '../errors'

export async function getUsers(req, res, next) {
    const { page = 1, limit = 20 } = req.params
    const offset = page * limit - limit

    try {
        const users = await User.findAll({
            offset,
            limit,
            attributes: ['name'],
        })

        res.json({ data: users })
    } catch (err) {
        next(new RequestError("Error while retrieving users' data"))
    }
}

export async function updateUser(req, res, next) {
    const { id } = req.params
    const { name } = req.body

    try {
        const user = await getOneUser(id)

        if (typeof user === 'undefined') return next(new RequestError("User with such id doens't exist"))

        await user.update({ name })

        res.status(200).json({ message: 'User updated!' })
    } catch (error) {
        next(new RequestError('Error while updating user'))
    }
}

async function getOneUser(id) {
    try {
        const result = await User.findOne({ where: { id } })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
