import { unWrap, getErrorResponse } from '~/utils/fetchUtils'

export default function({$config}, inject) {
  const headers = {
    "X-Algolia-API-Key": $config.algolia.API_KEY,
    "X-Algolia-Application-Id": $config.algolia.APPLICATION_ID,
  };

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation,
  });

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_homes/${homeId}`,
          { headers }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_reviews/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_users/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_homes/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              aroundLatLng: `${lat},${lng}`,
              aroundRadius: radiusInMeters,
              hitsPerPage: 10,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
