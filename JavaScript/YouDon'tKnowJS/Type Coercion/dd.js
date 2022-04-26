const a = [
  1,
  function () { },
  2,
  function () { },
];

console.log(JSON.stringify(a));

const b = JSON.stringify(a, function (key, val) {
  if (typeof val == "function") {
    return !!val;
  }
  else
    return val;
}
);
console.log(b);