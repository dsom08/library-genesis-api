'use strict';

require('dotenv').config()
const axios = require("axios");
const queryString = require("query-string");

const bookDataParser = require("./bookDataParser");
const getDownloadLink = require("./getDownloadLink");

const SEARCH_BASE_URL = process.env.SEARCH_BASE_URL
const RESOURCE_BASE_URL = process.env.RESOURCE_BASE_URL

module.exports.getlink = async (event, context, callback) => {
  try {
    const { data } = await axios.get(`${RESOURCE_BASE_URL}/main/${event.queryStringParameters.md5}`)
    return {
      statusCode: 200,
      body: JSON.stringify({
        link: getDownloadLink(data)
      })
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.search = async (event, context, callback) => {
  try {
    const params = event.queryStringParameters
    const req = params.req
    delete params.req
    const { data } = await axios.get(`${SEARCH_BASE_URL}/search.php?req=${encodeURI(req)}&phrase=1&view=detailed&column=def&${queryString.stringify(event.queryStringParameters)}`)
    return {
      statusCode: 200,
      body: JSON.stringify(bookDataParser(data))
    }
  } catch (error) {
    console.error(error);
  }
};
