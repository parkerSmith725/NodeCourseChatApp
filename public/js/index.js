var socket = io();

socket.on('connect',function() {
    console.log('Connected to server');
});

socket.on('disconnect',function() {
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    var time = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:time
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage',function(message){
    var time = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt:time
    });

    $('#messages').append(html);
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







