export function getHeaders(algoliaConfig) {
    return {
        "X-Algolia-API-Key": algoliaConfig.API_KEY,
        "X-Algolia-Application-Id": algoliaConfig.APPLICATION_ID,
    };
}

export function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}