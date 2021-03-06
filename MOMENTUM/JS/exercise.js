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


//Return
const age = 24;
function calculateKrAge(ageOfForeinger) {
    return ageOfForeinger + 2;
}   //return을 이용하여 함수가 호출될때 그 함수의 결과를 가져올 수 있다
//return입력시 그 함수는 끝남
const krAge = calculateKrAge(age);

console.log(krAge);

//Conditional
const agee = parseInt(prompt("How old are you?")); //promt는 오래됬고 css,html로 꾸밀 수 없는 오래된 기술
//문자를 숫자로 바꾸는 함수 parseInt
if (isNaN(agee) || agee < 0) {
    console.log("Please write a real positive number");
} else if (agee < 18) {
    console.log(`You are too young`);
} else if (agee >= 18 && agee <= 50) {
    console.log(`You can drink`);   //&&은 AND, ||은 OR로 조건 판별가능
} else if (agee > 50 && agee <= 80) {
    console.log(`You should exercise`);
} else if (agee === 100) {  //==은 값만 비교하여 boolean을 출력, ===은 유형과 값도 비교하여 boolean출력, !=202=같지 않음을 확인
    console.log(`wow you are wise!`)
} else if (agee > 80) {
    console.log(`You can do whatever you want`);
}
console.log(isNaN(agee));   //isNan은 인자의 값이  Nan이면 true, 아니면 false를 출력
//변수의 형태를 볼때 typeof를 사용하면 그 값이 문자열인지 숫자인지 알 수 있다.


// const title = document.getElementById("title");

// title.innerText = "Got You!";

// console.log(title.id);
// console.log(title.className);
//getElementsByTagName는 태그명에 따라 element를 가져올 수 있다.
//querySelector는 element를 CSS방식으로 첫번째 것만 리턴
//css방식으로 검색 시 '.' '#'와 같은 형식을 표시해 줘야지 검색 가능
// const title = document.getElementsByTagName("h1");

// console.log(title);

const h1 = document.querySelector(".hello:first-child h1");

console.log(h1);

function handleh1Click() {
    h1.classList.toggle("active");    //toggle은 classList에 active가 있으면 active를 제거하고 없으면 추가한다.
    // const clickedClass = "active";              //classList는 class들의 목록으로 작업하게 도와줌
    // if (h1.classList.contains(clickedClass)) {  //cotains 명시한 요소가 있는지 확인
    //     h1.classList.remove(clickedClass);
    // } else {
    //     h1.classList.add(clickedClass);
    // }



    // const currentColor = h1.style.color;
    // let newColor;
    // if (currentColor === "blue") {
    //     newColor = "tomato";
    // } else {
    //     newColor = "blue";
    // }
    // h1.style.color = newColor;
}


// function handleMouseEnter() {
//     h1.innerText = "Mouse is here"
// }
// function handleMouseLeave() {
//     h1.innerText = "Mouse is gone"
// }
// function handleWindowResize() {
//     document.body.style.backgroundColor = "tomato";
// }
// function handleWindowCopy() {
//     alert("Copier!");
// }
// function handleWindowOffline() {
//     alert("SOS no WIFI");
// }
// function handleWindowOnline() {
//     alert("Internet is Online!")
// }

h1.onclick = handleh1Click;
// h1.addEventListener("mouseenter", handleMouseEnter);
// h1.addEventListener("mouseleave", handleMouseLeave);

// window.addEventListener("resize", handleWindowResize);
// window.addEventListener("copy", handleWindowCopy);
// window.addEventListener("offline", handleWindowOffline);
// window.addEventListener("online", handleWindowOnline);