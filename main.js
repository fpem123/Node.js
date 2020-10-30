var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);

    console.log(__dirname + url);
    // 사용자에게 데이터 전송
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);
