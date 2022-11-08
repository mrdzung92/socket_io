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
    
    // lắng nghe sự kiện client ngắt kết nối
    socket.on("disconnect", function () {
        console.log(socket.id + ' ngat ket noi');
    });
    
    // lắng nghe sự kiện client gửi dữ liệu lên sever
    socket.on("Client-send-data",function(data){
       console.log(data)

      /* // server phát lại cho tất cả mọi người
        io.sockets.emit("Server-send-data", data);*/
        
      /*  // server chỉ phát lại cho client gửi dữ liệu
        socket.emit("Server-send-data",data);*/

        // sever phát thông tin cho tất cả client trừ cleint gửi dữ liệu lên server
        socket.broadcast.emit("Server-send-data",data);

    });
});



app.get("/", function (req, res) {
    res.render('trangchu')
})