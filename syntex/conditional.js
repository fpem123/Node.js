let args = process.argv;
// argv   0: nodejs의 위치
//        1: js파일의 위치
//        2~: 입력

console.log(args[2]);
console.log('A');
console.log('B');

if (args[2] === '1') {
  console.log('C1');
} else {
  console.log('C2');
}

console.log('D');
