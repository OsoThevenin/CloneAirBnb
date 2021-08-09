import { sendJSON } from '../helpers'

export default (apis) => {
    return async function getUserRoute(req, res, next) {
        const identity = req.identity
        const userData = await apis.user.getById(identity.id)

        if (userData.status == 200) {
            sendJSON(userData.json, res)
            return
        }

        const payload = makeUserPayload(identity)
        apis.user.create(identity.id, payload);
        sendJSON(payload, res)
    }

    function makeUserPayload(identity) {
        return {
            name: identity.name,
            email: identity.email,
            image: identity.image,
            homeId: [],
            reviewCount: 0,
            description: "",
            joined: new Date().toISOString(),
        };
    }
}