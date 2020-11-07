// 반올림
console.log(Math.round(1.6)); // 2
console.log(Math.round(1.4)); // 1

/**
 *  2개의 값을 합하는 함수
 */
function sum(first, second){    // parameter
  console.log(`function: ${first + second}`);

  return first + second;
}

console.log(`log: ${sum(2, 4)}`); // argument
