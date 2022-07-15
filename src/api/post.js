const URL_BASE = "http://localhost:8080/";
export const postSomething = (dataName, data) =>
  new Promise((resolve, reject) => {
    var axios = require("axios");

    var config = {
      method: "post",
      url: `${URL_BASE}${dataName}`,
      data: data,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });