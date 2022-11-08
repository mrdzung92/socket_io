var express = require('express');

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

// lắng nghe sự kiện client kết nối sever
io.on("connection", function (socket) {
    console.log('co nguoi ket noi :' + socket.id);
   socket.on('client-send-color',function(data){
    console.log(data)
    io.sockets.emit('server-send-color',data)
   })

});



app.get("/", function (req, res) {
    res.render('trangchu')
})