import jwt from 'jsonwebtoken'
import JWT_KEY from '../../config/jwt'
import { RequestError } from '../errors'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, JWT_KEY, null)
        req.userData = decoded
        next()
    } catch (err) {
        next(
            new RequestError({
                message: 'Authorization denied',
                status: 401,
            })
        )
    }
}
