// import module
var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
  console.log(request.url);
  let _url = request.url;
  // _url 객체를 담을 변수
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;
  // _url 객체의 id

  if(pathname === '/'){
    // undefined === 없는값
    if (queryData.id === undefined){
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        let title = 'Welcome';
        description = "Hello, Node,js"
        let template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        let title = 'queryData.id';
        let template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        //console.log(__dirname + _url);
        // 사용자에게 데이터 전송
        //response.end(fs.readFileSync(__dirname + _url));
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }



});
app.listen(3000);
