var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
var arrUser =[];
io.on('connection',function(socket){
    console.log('Co nguoi ket noi: '+socket.id)
  socket.on('client-send-user-name',function(data){
    if(data.indexOf(data)!=0){
        socket.emit('server-send-fail');
    }else{
        arrUser.push(data);
        socket.emit('server-send-success',data);
        console.log(socket)
    }
    
  })  
})

app.get("/",function(req,res){
    res.render("trangchu");
})