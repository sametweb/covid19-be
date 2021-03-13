const { default: axios } = require("axios");

module.exports = () =>
  axios.create({
    baseURL: "https://api.covid19api.com",
    headers: {
      "X-Access-Token": process.env.ACCESS_TOKEN,
    },
  });
