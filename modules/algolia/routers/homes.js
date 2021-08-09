import { rejectHitBadRequest, hasBadBody, sendJSON } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

export default (apis) => {
    return async (req, res) => {
        if (req.method === "POST") {
            if (hasBadBody(req)) {
                return rejectHitBadRequest(res)
            }
            await createHome(req.identity.id, req.body, res)
            return
        }
        rejectHitBadRequest(res)
    }

    async function createHome(userId, body, res) {
        const homeId = uuidv4()
        const payload = { ...body, reviewCount: 0, reviewValue: 0, userId }

        const resp = await apis.homes.create(homeId, payload)

        if (!resp.ok){
            res.statusCode = 500
            res.send()
            return
        }
        await apis.user.assignHome(userId, homeId)
        sendJSON({}, res)
    }
}