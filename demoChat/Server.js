var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
var arrUser =[];
// lang nghe su kien co nguoi ket noi
io.on('connection',function(socket){
    console.log('Co nguoi ket noi: '+socket.id)
    // lang nghe va xu li su kien co nguoi dang ky
  socket.on('client-send-user-name',function(data){
    if(arrUser.indexOf(data)>=0){
        socket.emit('server-send-fail');
    }else{
        arrUser.push(data);
        socket.Username = data;
        socket.emit('server-send-success',data);
        io.sockets.emit('server-send-list-online',arrUser);
      
    }
    //lang nghe va xu ly co nguoi thoat
    socket.on('logout',function(){
      arrUser.splice(arrUser.indexOf(socket.Username),1);   
      socket.broadcast.emit('server-send-list-online',arrUser);
    });
    //lang nghe client gui message
    socket.on('client-send-message',function(data){
      io.sockets.emit('server-send-message',{Username:socket.Username,content:data});
    });
  })  
})

app.get("/",function(req,res){
    res.render("trangchu");
})