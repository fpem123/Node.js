let f = function(){
  console.log(1+1);
  console.log(1+2);
}

// 배열의 원소로서 호출
let a = [f];
a[0]();

// 객체의 온소로서 호출
let o = {
  //프로퍼티
  func: f,
  func2: () => {
    console.log(1);
    console.log(2);
  }
}
o.func();
o.func2();
