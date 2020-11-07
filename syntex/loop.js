console.log('A')
console.log('B');

let count = 0;

while (count < 10) {
  console.log('C1');
  console.log('C2');
  count += 1;
}

for (let i = 0; i < 10; i++){
  console.log(i);
}

const arr = [0, 1, 1, 2, 3, 4, 1, 3, 10];

arr.forEach((item, i) => {
  console.log(`item: ${item}, i: ${i}`);
});

const arr2 = {a: '가', b: 'sk', c: '다'};

for (let key in arr2){
  console.log(key, arr2[key]);
}

console.log('D');
