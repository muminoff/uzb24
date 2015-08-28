sys     = require('util');
express = require('express');
http = require('http');
twitter = require('ntwitter');

app = express();
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res, next){
  res.render('/public/index.html');
});
server = http.createServer(app)
server.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});

var io  = require('socket.io').listen(server);
io.set('log level', 0);

CreateTwitter();
io.sockets.on('connection', function(socket) {

  twit.stream('user',{track:'#uzb24'}, function(stream) {
    stream.on('data', function(tweet) {
      socket.emit('message', JSON.stringify(tweet));
    });
  });

});

function CreateTwitter() {
  twit = new twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
}
