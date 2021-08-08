import fetch from "node-fetch";
import { getHeaders } from "../helpers"
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils";

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)

    return {
        create: async (identity, payload) => {
            try {
                return unWrap(
                    await fetch(
                        `https://${algoliaConfig.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_users/${identity.id}`,
                        {
                            headers,
                            method: "PUT",
                            body: JSON.stringify(payload),
                        }
                    )
                );
            } catch (error) {
                return getErrorResponse(error);
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
                );
            } catch (error) {
                return getErrorResponse(error);
            }
        }
    }
}