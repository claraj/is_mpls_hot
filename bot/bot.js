var weather = require('./weather');
var twitter = require('./twitter');

// Fetch weather


// Fetch historical average high, record highest high, record lowest high

// Formulate string and post to Twitter

weather.getForecastHigh('Minneapolis', 'MN', function(err, forecast_data){
  if (err) {
    console.log(err);
    return;
  }

  weather.getAlmanacHigh('Minneapolis', 'MN', function(err, record, average) {
    if (err) {
      console.log(err);
      return;
    }

    var status = createStatus(forecast_data, record, average);
    console.log(status)

    twitter(status, function(err){
      if (err) {
        console.log(err);
      }
       else {
         console.log('Tweet posted, check twitter.')
       }
    })

  })

})




function createStatus(forecast, record, average) {

  var deviaton = 'the same as average';

  if (forecast > average) {
    deviation = (forecast - average) + 'C higher than average';
  }

  if (forecast < average) {
    deviation = (record - average) + 'C lower than average';
  }

  var newRecord = '';

  if (forecast > record) {
    newRecord = 'A new record(?)'
  }

  var status = 'The forecast high is ' + forecast + 'C, ' +  deviation + '. The average high for today is ' + average +  'C and highest high was ' + record + 'C. ' + newRecord;

  console.log(status);
  console.log('chars: ' + status.length)

  return status

}
