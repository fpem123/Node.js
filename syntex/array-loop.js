let number = [1, 400, 12, 34, 5];
let i = 0;
let total = 0;

while (i < number.length) {
total += number[i];
  i += 1;
}

console.log(`total : ${total}`);

total = 0

number.forEach((item, i) => {
  total += item;
});

console.log(`total : ${total}`);
