var socket = io("http://localhost:3000")
socket.on('server-send-fail',function(){
    alert('co nguoi dang ky roi')
})
socket.on('server-send-success',function(data){
   $('#current-user').html(data);
   $('#login-form').hide(2000);
   $('#chat-form').show(1000);
   
})



socket.on('server-send-list-online',function(data){
   $('#box-content').html('');
   data.forEach(element => {
      $('#box-content').append('<div class="user-online">'+element+'</div>')
   });
})

socket.on('server-send-message',function(data){
  $('#list-message').append('<div class="ms-content">'+data.Username+' : '+ data.content+'</div>');
})


$(document).ready(function(){
   $('#login-form').show();
   $('#chat-form').hide();
   $('#btn-register').click(function(){
    socket.emit('client-send-user-name',$('#user-name').val())
   })
   $('#btn-logout').click(function(){
      socket.emit('logout')
      $('#login-form').show(1000);
      $('#chat-form').hide(2000);
     })

     $('#btn-send-message').click(function(){
     
      var text = '';   
      if($('#txt-message').val()!=''){
         text =$('#txt-message').val();
         socket.emit('client-send-message',text);
         $('#txt-message').val('');
      }
     })
})