// import module
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

function templateHTML(title, list, body, control) {
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
    ${control}
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


let app = http.createServer(function(request,response){

  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  if(pathname === '/'){
    // undefined === 없는값
    if (queryData.id === undefined){
      fs.readdir('./data', function(error, filelist){
        let title = 'Welcome';
        let description = "Hello, Node.js"
        let list = templateList(filelist);
        let template = templateHTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create<a>`
        );

        response.writeHead(200);
        response.end(template);
      })
    } else {
      // read dir
      fs.readdir('./data', function(error, filelist){
        // read file
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          let title = queryData.id;
          let list = templateList(filelist);
          let template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create<a>
             <a href="/update?id=${title}">update</a>
             <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
             </form>`
          );

          //console.log(__dirname + _url);
          // 사용자에게 데이터 전송
          //response.end(fs.readFileSync(__dirname + _url));

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if(pathname === '/create'){

    fs.readdir('./data', function(error, filelist){
      let title = 'WEB - create';
      let list = templateList(filelist);
      let template = templateHTML(title, list,
        `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `, '');

      response.writeHead(200);
      response.end(template);
    })
  } else if(pathname === '/create_process'){

    let body = '';
    // post로 전송되는 데이터 처리
    request.on('data', (data)=>{
      body = body + data;
    });
    // 정보수신 끝
    request.on('end', ()=>{
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;

      // file create
      fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
        // redirection === 302
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });

  } else if(pathname === '/update') {

    fs.readdir('./data', function(error, filelist){
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        let title = queryData.id;
        let list = templateList(filelist);
        let template = templateHTML(title, list,
          `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `,
          `<a href="/create">create<a> <a href="/update?id=${title}">update</a>`
        );

        response.writeHead(200);
        response.end(template);
      });
    });

  } else if(pathname === '/update_process') {

      let body = '';

      request.on('data', (data)=>{
        body = body + data;
      });
      request.on('end', ()=>{
        let post = qs.parse(body);
        let id = post.id;
        let title = post.title;
        let description = post.description;

        // file rename
        fs.rename(`data/${id}`, `data/${title}`, (error)=>{

          // 내용 변경
          fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
      });

  } else if(pathname === '/delete_process') {

      let body = '';

      request.on('data', (data)=>{
        body = body + data;
      });
      request.on('end', ()=>{
        let post = qs.parse(body);
        let id = post.id;

        fs.unlink(`data/${id}`, (error)=>{
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });

  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});

app.listen(3000);
