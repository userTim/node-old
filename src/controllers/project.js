import { Project, User } from '../models'
import { RequestError } from '../errors'
import { Op } from 'sequelize'

export async function getProjects(req, res, next) {
    const { page = 1, limit = 20 } = req.query
    const offset = page * limit - limit

    try {
        const projects = await Project.findAll({
            offset,
            limit: +limit,
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
            ],
            order: [['id', 'ASC']],
        })

        res.json(projects)
    } catch (err) {
        next(new RequestError("Error while retrieving projects' data"))
    }
}

export async function createProject(req, res, next) {
    const createOptions = {}

    Object.keys(req.body).forEach(fieldName => (createOptions[fieldName] = req.body[fieldName]))

    try {
        await Project.create(createOptions)

        res.status(201).json({ message: 'Project created' })
    } catch (err) {
        next(new RequestError('Error while creating project'))
    }
}

export async function updateProject(req, res, next) {
    const { projectId } = req.params
    const updateOptions = {}

    Object.keys(req.body).forEach(fieldName => (updateOptions[fieldName] = req.body[fieldName]))

    try {
        const project = await getProjectById(projectId)

        if (project === null) return next(new RequestError("Project with such id doesn't exist"))

        await project.update(updateOptions)

        res.status(200).json({ message: 'Project updated!' })
    } catch (error) {
        next(new RequestError('Error while updating project'))
    }
}

export async function addUsersToProject(req, res, next) {
    const { projectId } = req.params
    const { usersIds } = req.body

    try {
        const project = await getProjectById(projectId)
        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: usersIds,
                },
            },
        })

        await project.addUsers(users)
        res.json({ message: 'Users added to project successfully' })
    } catch (err) {
        next(new RequestError('Error while adding users to project'))
    }
}

export async function deleteProject(req, res, next) {
    const { projectId: id } = req.params

    try {
        await Project.destroy({ where: { id } })

        res.json({ message: 'Project deleted succesfully' })
    } catch (err) {
        next(new RequestError("Couldn't delete Project"))
    }
}

export async function getProjectById(id) {
    try {
        const result = await Project.findOne({ where: { id } })
        return result
    } catch (err) {
        throw new Error(err)
    }
}
