const fs = require('fs');

// readFileSync
// ABC가 순차적으로 실행
/*
console.log('A');
let result = fs.readFileSync('syntex/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

// async, nodejs는 비동기를 선호
console.log('A');
// 비동기는 변수로 하면 안된다. 리턴을 안주기 떄문
// 따라서 3번째 인자로 함수를 줌,
// 파일을 읽으면 3번째 인자의 함수를 실행시킴 -> callback
// err는 에러가 있다면 에러를 인자로 제공
// 2번째 파라미터를 파일의 내용을 인자로 공급
// ACB -> race condition
fs.readFile('syntex/sample.txt', 'utf8', function(err, result){
  console.log(result);
});
console.log('C');
