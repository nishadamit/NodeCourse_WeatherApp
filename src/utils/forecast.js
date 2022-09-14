const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d038ea6c20402b332aeaaede90a37cd2&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect Weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      let result = `${weather_descriptions} it is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`;
      //   console.log(undefined, result);
      callback(undefined, result);
    }
  });
};

module.exports = forecast;
