// import module
const http = require('http');
const fs = require('fs');
const url = require('url');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}


function templateList(filelist){
  let list = '<ul>';

  filelist.forEach(file => {
    list += `<li><a href = "/?id=${file}">${file}</a></li>`
  });

  list = list + '</ul>';

  return list;
}


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
      fs.readdir('./data', function(error, filelist){
        console.log(filelist);

        let title = 'Welcome';
        let description = "Hello, Node,js"
        let list = templateList(filelist);
        let template = templateHTML(title, list,`<h2>${title}</h2>${description}`);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      // read dir
      fs.readdir('./data', function(error, filelist){
        // read file
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          let title = queryData.id;
          let list = templateList(filelist);
          let template = templateHTML(title, list,`<h2>${title}</h2>${description}`);

          //console.log(__dirname + _url);
          // 사용자에게 데이터 전송
          //response.end(fs.readFileSync(__dirname + _url));

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }



});

app.listen(3000);
