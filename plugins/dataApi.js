export default function (context, inject) {
    const APPLICATION_ID = 'T2OKKX09II'
    const API_KEY = '1958c90625c59344dc055a3dddf1a550'

    const headers = {
        'X-Algolia-API-Key': API_KEY,
        'X-Algolia-Application-Id': APPLICATION_ID
    }

    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
    })

    async function getHome(homeId) {
        try {
            return unWrap(await fetch(`https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_homes/${homeId}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}