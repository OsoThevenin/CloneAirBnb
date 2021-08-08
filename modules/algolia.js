import fetch from "node-fetch";
import { unWrap, getErrorResponse } from "../utils/fetchUtils";

export default function() {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;
  const headers = {
    "X-Algolia-API-Key": algoliaConfig.API_KEY,
    "X-Algolia-Application-Id": algoliaConfig.APPLICATION_ID,
  };

  this.nuxt.hook("render:setupMiddleware", (app) => {
    app.use("/api/user", getUserRoute);
  });

  async function getUserRoute(req, res, next) {
    const identity = req.identity
    const userData = await getUserById(identity.id)

    if (userData.status == 200){
      sendJSON(userData.json, res)
      return
    }

    createUser(identity);
    sendJSON(makeUserPayload(identity), res)
    next();
  }
  async function createUser(identity) {
    try {
      return unWrap(
        await fetch(
          `https://${algoliaConfig.APPLICATION_ID}-dsn.algolia.net/1/indexes/nuxtbnb_users/${identity.id}`,
          {
            headers,
            method: "PUT",
            body: JSON.stringify(makeUserPayload(identity)),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserById(userId) {
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

  function sendJSON(data, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
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
