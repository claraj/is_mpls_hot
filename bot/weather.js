var request = require('request');


/* Two very specific functions which fetch very specific data from Weather Underground. */
var key = process.env.WU_KEY;

var baseURL = 'http://api.wunderground.com/api/' + key

function getForecastHigh(city, state, callback) {

  //todo

  // example
  //http://api.wunderground.com/api/KEY/forecast/q/CA/San_Francisco.json

  // todo - Encode city, state to remove any URL characters.
  // todo - does Request take care of this??

  var url = baseURL + '/forecast/q/' + state + '/' + city + '.json'
  console.log(url)

  request( url, function(err, response, data){

    if (err)  { return callback(err); }

    try {
      var forecast = JSON.parse(data);
    } catch (e) {
      console.log('Error parsing ' + data);
      return callback(err);
    }

    // Todo check for city not found, other errors reported by WU
    var forecast_list = forecast.forecast.simpleforecast.forecastday;
    var today = forecast_list[0];
    var todayHigh = today.high.celsius;

    console.log('Today high forecast is ' + todayHigh + 'C')

    callback(null, Number(todayHigh));

  })


}


function getAlmanacHigh(city, state, callback) {

  //http://api.wunderground.com/api/KEY/almanac/q/CA/San_Francisco.json

  var url = baseURL + '/almanac/q/' + state + '/' + city + '.json'
  console.log(url)

  request(url, function(err, response, data){

    if (err)  { return callback(err); }

    try {
      var almanac = JSON.parse(data);
    } catch (e) {
      console.log('Error parsing ' + data);
      return callback(err);
    }

    var recordHigh = almanac.almanac.temp_high.record.C;
    var averageHigh = almanac.almanac.temp_high.normal.C;

    console.log('Record high = ' + recordHigh + ' avg high = ' + averageHigh);

    return callback(null, Number(recordHigh), Number(averageHigh));
  })

}

module.exports = {
  getForecastHigh,
  getAlmanacHigh
}
