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

var messageTextBox = $('[name=message]');
$('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        alert('Location is not supported in your browser.');
    }

    locationButton.attr('disabled','disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');

        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});







