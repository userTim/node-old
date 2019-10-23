import { User } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import JWT_KEY from '../../config/jwt'
import { RequestError } from '../errors'

const saltRanges = 10

export async function signupUser(req, res, next) {
    const { login, password } = req.body
    const createOptions = {}

    Object.keys(req.body).forEach(fieldName => (createOptions[fieldName] = req.body[fieldName]))

    try {
        if (await doesUserExist(login)) {
            return next(
                new RequestError({
                    message: 'Login is already taken',
                    status: 409,
                })
            )
        }

        createOptions.password = await bcrypt.hash(password, saltRanges)

        await User.create(createOptions)

        res.status(201).json({
            message: 'User created',
        })
    } catch (err) {
        next(new RequestError('Error while creating user'))
    }
}

export async function loginUser(req, res, next) {
    const { login, password } = req.body

    try {
        const user = await User.findOne({ where: { login } })

        if (!user)
            return next(
                new RequestError({
                    message: 'Wrong login',
                    status: 400,
                })
            )

        const storedPassword = user.password

        if (await bcrypt.compare(password, storedPassword)) {
            const token = jwt.sign(
                {
                    login: user.login,
                    id: user.id,
                },
                JWT_KEY,
                {
                    expiresIn: '1h',
                }
            )

            res.status(200).json({
                message: 'Auth successful',
                token,
            })
        } else {
            next(
                new RequestError({
                    message: 'Wrong password',
                    status: 400,
                })
            )
        }
    } catch (err) {
        next(
            new RequestError({
                message: 'Auth failed',
                status: 401,
            })
        )
    }
}

async function doesUserExist(login) {
    try {
        const result = await User.findOne({ where: { login } })
        return !!result
    } catch (err) {
        throw new Error(err)
    }
}
