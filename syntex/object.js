let members = ['hoseop', 'lee', 'js'];
console.log(members[1]);

let i = 0;

while(i < members.length){
  console.log('array loop', members[i]);
  i = i + 1;;
}

let roles = {
  'programmer': 'hoseop',
  'designer': 'lee',
  'manager': 'js'
}
console.log(roles.designer);

for(let name in roles){
  console.log('object => ', name, 'value => ', roles[name]);
}
