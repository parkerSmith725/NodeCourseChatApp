var socket = io();

socket.on('connect',function() {
    console.log('Connected to server');
});

socket.on('disconnect',function() {
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('New message',message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    console.log('New location message',message);
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</>');

    li.text(`${message.from}: `);
    a.attr('href',message.url);

    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:$('[name=message]').val()
    },function(){

    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        alert('Location is not supported in your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location.');
    });
});







