let arr = ['A', 'B', 'C', 'D'];

// R
console.log(arr[1]);
console.log(arr[3]);

// U
arr[2] = 3;

console.log(arr);

console.log(arr.length);
arr.push('E');
arr.unshift('0');
console.log(arr);

// D
let x = arr.pop();
let y = arr.shift();

console.log(x, y);
console.log(arr);
