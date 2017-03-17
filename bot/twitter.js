var Twitter = require('twitter');

/* Deal with posting to Twitter. */


function post(status, callback) {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var statusText = {
    status: status
  }

  client.post('statuses/update', statusText, function(error, tweet, response) {

    if (error) {
      console.log('error tweeting ' + error)
      return callback(error)
    }

    else {
      console.log('Tweeted ' + tweet.text)
      return callback(null, tweet)
    }
  });
}



module.exports = post;
