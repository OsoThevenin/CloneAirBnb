import fetch from 'node-fetch'
import { getHeaders } from '../../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
	const headers = getHeaders(algoliaConfig)

	return {
		assignHome: async function (userId, homeId) {
			const payload = (await this.getById(userId)).json

			payload.homeId.push(homeId)
			this.create(userId, payload)
		},
		create: async (userId, payload) => {
			try {
				return unWrap(
					await fetch(
						`https://${algoliaConfig.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_users/${userId}`,
						{
							headers,
							method: 'PUT',
							body: JSON.stringify(payload),
						}
					)
				)
			} catch (error) {
				return getErrorResponse(error)
			}
		},
		getById: async (userId) => {
			try {
				return unWrap(
					await fetch(
						`https://${algoliaConfig.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_users/${userId}`,
						{
							headers,
						}
					)
				)
			} catch (error) {
				return getErrorResponse(error)
			}
		},
		removeHome: async function (userId, homeId) {
			const payload = (await this.getById(userId)).json
			const homes = payload.homeId.filter((id) => id != homeId)
			payload.homeId = homes
			this.create(userId, payload)
		},
	}
}
