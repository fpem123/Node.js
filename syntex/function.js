f123();
console.log('A');
console.log('Z');
console.log('B');
f123();
console.log('F');
console.log('C');
console.log('P');
console.log('J');
f123();
console.log('U');
console.log('A');
console.log('Z');
console.log('J');
console.log('I');
f123();

// 일련의 로직에 이름을 붙힌다.
// 같은 코드라 확신가능, 유지보수의 편의성 향상
// 중복 제거, 가독성 향상
function f123() {
  console.log(1);
  console.log(2);
  console.log(3);
}
