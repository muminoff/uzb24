var filters='';
var socket = io.connect();
socket.on('message', function(json) {
  var data = JSON.parse(json);
  if(data.text) {
  var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  var replacedText = (data.text).replace(replacePattern, '<a href="$1" target="_blank">$1</a>');
  replacedText = replacedText.replace('#uzb24', '<span class="label label-success"><strong>#uzb24</strong></span>');
  $("<li></li>").html(replacedText)
  .prependTo("ul.uzb24-tweets");
}
});
socket.on("connect", function() {
  socket.emit('getfilter', function() {
  });
  console.log("connected");
});
socket.on("disconnect", function() {
  console.log("disconnected");
});
socket.on('pushfilter', function(f) {
  filters=f;
  $('#tracker').empty();    
  filters.forEach(function(str) {
    $('<div class="alert alert-info" id="'+str+'"><a class="close" data-dismiss="alert" id="'+str+'" href="#">&times;</a><p>'+str+'</p></div></div>').prependTo("#tracker");
  });
});
