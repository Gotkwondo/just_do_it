//JavaScript는 동기적이다. 작성한 순서에 마추어서 동기적으로 실행됨
//hoistiong : var(변수), function declartion(함수선언)들이 자동적으로 제일 위로 올라가는 것
//setTimeout은 지정한 시간이 지나면 전달한 콜백함수를 호출하는 API
console.log('1');
setTimeout(function () {
    console.log('2');
}, 1000);
console.log('3');


//Synchronous callback 동기적 콜백
function printImmediately(print) {
    print();
}
printImmediately(() => console.log('hello'));


//Asynchronous callback 비동기적 콜백
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);

//callback hell  가독성이 안좋음, 디버깅 유지보수 어려움
class UserStorage {
    //사용자가 로그인하는 api 아이디, 패스워드, 로그인성공, 로그인실패
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }
    //사용자의 데이터를 받아 역활을 서버에게 요청하여 정보 받는 api
    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            (userWithRole) => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            (error) => { console.log(error) }
        );
    },
    error => {
        console.log(error);
    }
);
