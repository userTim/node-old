import { RequestError } from '../errors'

export default function(req, res, next) {
    const id = req.params.userId
    const authId = req.userData.id
    
    if (id == authId) return next()

    next(
        new RequestError({
            message: "You can't change other user data",
            status: 403,
        })
    )
}
