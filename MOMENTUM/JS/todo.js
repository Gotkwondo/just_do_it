const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}                                 //JSON.stringify()는 인자를 문자열로 바꿔줌

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;        //input의 현제 값을 복사해 둠
    toDoInput.value = "";
    const newTodobj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodobj);
    paintToDo(newTodobj);
    //여기서 해맸음. paintToDo함수에 newTodobj를 넣어서 입력된 값을 제대로 전달해야하는데 newTodo로 입력함
    saveToDos();
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    //여기서 toDo는 toDos 배열에 있는 아이템의 이름을 대채한 것임
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.id = newTodo.id;
    span.innerText = newTodo.text;  //object를 받아 출려하지만 .text를 통해 문자 방식으로 출력
    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    console.log(newTodo.id, newTodo.text);
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);
//savedToDos가 존재한다면 이라는 조건
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    //JSON.parse()은 문자열의 인자를 배열의 형태로 바꿔줌
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); //localStorage에 저장된 것들을 화면에 표시
    //forEach은 각 배열의 요소들마다 인자를 실행해줌
}


//function sexyFilter(todo) { return todo.id !==  }

//기존의 배열의 아이템을 포함 하고싶다면 이 함수는 무조건 true를 return해야한다
//비교식(!==, ===, >, >= 등)을 이용하여 참, 거짓을 리턴하도록 유도해야한다
//배열의 item을 없애고 싶으면 filter를 사용하는데, 실직적으로 삭제가 아닌 
//그 item을 제외시킨 배열을 다시 만드는 것. 배열.filter()형식으로 사용