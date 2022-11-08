var socket = io("http://localhost:3000")
socket.on('server-send-fail',function(){
    alert('co nguoi dang ky roi')
})
socket.on('server-send-success',function(data){
   $('current-user').html(data);
   $('#login-form').hide();
   $('#chat-form').show();
   console.log(socket)
})
$(document).ready(function(){
   $('#login-form').show();
   $('#chat-form').hide();
   $('#btn-register').click(function(){
    socket.emit('client-send-user-name',$('#user-name').val())
   })
})