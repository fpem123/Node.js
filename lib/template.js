
// 동작방법은 똑같이하면서 내부 동작은 더 효율적으로 바꿈
// 코드를 훨씬 유지보수하기 쉬운 코드로 개선
module.exports = {
  HTML: function(title, list, body, control) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>WEB2 - ${title}</title>
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
  },
  list: function(filelist){
    let list = '<ul>';

    filelist.forEach(file => {
      list += `<li><a href = "/?id=${file}">${file}</a></li>`
    });

    list = list + '</ul>';

    return list;
  }
}
