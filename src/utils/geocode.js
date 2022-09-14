const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW1pdG41OTEiLCJhIjoiY2w2dnNkcGpvMXh4czNmbW1kdGhyaW9jMCJ9.N86X242R5MpgmjJS82o8PQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find locations. try another search.", undefined);
    } else {
      //   console.log(response.body);
      const [longitude, latitude] = body.features[0].center;
      const { place_name: location } = body.features[0];
      //   console.log(longitude, latitude);
      const data = { latitude, longitude, location };
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
