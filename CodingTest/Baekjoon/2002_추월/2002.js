const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n');
// let map = new Map()
const num = +input.shift();
const enters = input.slice(0, num).map((e) => e.trim());
const passed = input.slice(num).map(e => e.trim());
let cnt = 0

passed.forEach(car => {
  if (enters[0] === car) {
    enters.shift();
  }
  else {
    enters.splice(enters.indexOf(car), 1);
    cnt += 1;
  }
})
console.log(cnt);

// let result = Array.from({length: num}, () => false);
// enters.forEach((e, i) => map.set(e, i));

// let head = 0;
// let cnt = 0;

// passed.forEach((e) => {
//   if (map.get(e) > head) {
//     for (let i = 0; i < map.get(e); i++){
//       if (!result[i]) {
//         flag = true;
//         cnt += 1;
//         break;
//       }
//     }
//   }
//   result[map.get(e)] = true;
// })

// console.log(cnt);



// 5
// ZG508OK
// PU305A
// RI604B
// ZG206A
// ZG232ZF
// PU305A
// ZG232ZF
// ZG206A
// ZG508OK
// RI604B