import { RequestError } from '../errors'

export default function(req, res, next) {
    const id = req.params.id
    const authId = req.userData.id

    console.log(id, authId)

    if (id == authId) return next()

    next(
        new RequestError({
            message: "You can't change other user data",
            status: 403,
        })
    )
}
