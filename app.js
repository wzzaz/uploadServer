// var net = require('net');
// var DanmuServer = net.createServer();
// DanmuServer.on('connection',function(client){
// 	client.on('data',function(data){
// 		console.log('Socket textData:' + data.toString());
// 	});
// 	client.on('end',function(){
// 		console.log("断开连接");
// 	});
// 	client.write('Hello,client!This is Server!');
// });
// DanmuServer.listen(3000);
// console.log("Socket server running at http://127.0.0.1:3000");

// 引入WebSocket模块
var ws = require('nodejs-websocket')
var fs = require('fs');
var PORT = 3000

function saveFile(file,buf) {
    fs.open(`E:/EScode/socketTest/public/${file}`,'a',function(err,fd){
        if(err){
            return false;
            throw err;
        }
        // var base64Data = atob(buf)
        var writebuffer= new Buffer(buf, 'base64'),//设置缓冲区
            bufferPosition=0,//写入起始位置
            filePosition=null,//从文件什么位置开始写 
            bufferLength=writebuffer.length;//长度
            fs.write(fd,writebuffer,bufferPosition,bufferLength,filePosition,
                function (err, write){
                    if(err){
                        console.log('write err:', err)
                        return false;
                        throw err;
                    }
                    console.log('write bytes:',write);//获取读入缓冲区的字节数
                });

                

        fs.close(fd,function(){
            //...
        })
    });

    return true
}
 
// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
var server = ws.createServer(function(conn){
    console.log('New connection')
    conn.on("text",function(str){
        // console.log("Received"+str)
        // conn.sendText(str.toUpperCase()+"!!!") //大写收到的数据
        // conn.sendText(str)  //收到直接发回去
        var dataJson = JSON.parse(str.trim());
        console.log("Received",dataJson.file, typeof(dataJson.bin), dataJson.bin.substr(0,10))
        if( saveFile(dataJson.file, dataJson.bin) ) {
            conn.sendText('upload success')
        }
    })
    conn.on("close",function(code,reason){
        console.log("connection closed")
    })
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT)
 
console.log('websocket server listening on port ' + PORT)

