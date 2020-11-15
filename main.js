// import module
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js')
const path = require('path');
const sanitizeHtml = require('sanitize-html');

// 동작방법은 똑같이하면서 내부 동작은 더 효율적으로 바꿈
// 코드를 훨씬 유지보수하기 쉬운 코드로 개선

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
        let list = template.list(filelist);
        let html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create<a>`
        );

        response.writeHead(200);
        response.end(html);
      });
    } else {
      // read dir
      fs.readdir('./data', function(error, filelist){
        // 오염된 정보가 들어오지 못하게
        let filteredId = path.parse(queryData.id).base;
        // read file
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          let title = queryData.id;
          // 제목과 내용을 살균
          let sanitizedTitle = sanitizeHtml(title);
          let sanitizeDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          let list = template.list(filelist);
          let html = template.HTML(title, list,
            `<h2>${sanitizedTitle}</h2>${sanitizeDescription}`,
            `<a href="/create">create<a>
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
             </form>`
          );

          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if(pathname === '/create'){

    fs.readdir('./data', function(error, filelist){
      let title = 'WEB - create';
      let list = template.list(filelist);
      let html = template.HTML(title, list,
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
      response.end(html);
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
      let filteredTitle = path.parse(title).base;
      let description = post.description;

      // file create
      fs.writeFile(`data/${filteredTitle}`, description, 'utf8', (err)=>{
        // redirection === 302
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });

  } else if(pathname === '/update') {

    fs.readdir('./data', function(error, filelist){
      let filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        let title = queryData.id;
        let list = template.list(filelist);
        let html = template.HTML(title, list,
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
        response.end(html);
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
        let filteredId = path.parse(id).base;
        let title = post.title;
        let filteredTitle = path.parse(title).base;
        let description = post.description;

        // file rename
        fs.rename(`data/${filteredId}`, `data/${title}`, (error)=>{
          // 내용 변경
          fs.writeFile(`data/${filteredTitle}`, description, 'utf8', (err)=>{
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
        let filteredId = path.parse(id).base;

        fs.unlink(`data/${filteredId}`, (error)=>{
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
