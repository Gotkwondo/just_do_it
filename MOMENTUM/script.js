const daysOfWeek = ["mon", "tue", "wen", "thu", "fri", "sat"]
// Get Item From Array
console.log(daysOfWeek[5]);
console.log(daysOfWeek);

//Add one more day to the Array
daysOfWeek.push("sun");

console.log(daysOfWeek);


//객체(Object)
// 중괄호 안에 특성(프로퍼티)를 작성
const player = {
    name: "nico",
    points: 10,
    fat: true,
};
console.log(player);
console.log(player.name);
console.log(player["points"]);
player.points = player.points + 5;
player.fat = false;
console.log(player.fat);
//const를 수정 할 수 없지만 object안의 값은 병경 가능하다
player.lastname = "potato";
console.log(player);


//Function
function sayHello(lastName, age) {
    console.log(`Hello my name is ${lastName}, age is ${age}`);
}
sayHello("주현", 23);

const person = {
    name: "JuHyeon",
    sayBye: function (otherPersonsName) {
        console.log(`Bye ${otherPersonsName}, see you later`);
    },
};
console.log(person.name);
person.sayBye("HeaSu");


//Recap
const me = "strong";
const day = [1, 2, true, false, null, undefined, "text"];
console.log(day[2]);
day[2] = "changed";
console.log(day[2]);
day.push("oneMore");
console.log(day);

//Recap 2
const play = {
    name: "JuHyeon",
    age: 24,
};
console.log(play);
play.name = "JH";
console.log(play.name);
play.fat = true;
console.log(play);

function minusFive(a) {
    console.log(a - 5);
}
minusFive(10);
