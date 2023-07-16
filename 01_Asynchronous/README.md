# 비동기 처리에 대한 설명

## 동기(Synchronous) vs 비동기(Asynchronous)
### 동기(Synchronous)
- 요청과 동시에 결과가 일어남.
- 순서에 맞춰 진행되며 여러 요청을 동시에 처리할 수 없고 대기를 해야함.
### 비동기(Asynchronous)
- 요청과 결과가 동시에 일어나지 않음.
- 요청에 따른 응답을 즉시 처리하지 않아도 대기 시간 동안 다른 요청에 대한 처리가 가능.
- 동기 방식보다 속도가 느리고 복잡함.

<hr />

## 비동기 콜백(Callback)
- javascript의 엔진 구성 (Memory Heap / Call Stack)
### Call Stack
- javascript는 Single Thread 언어 단일 호출 스택이 있음. (한 번에 하나의 일만 처리할 수 있다)
- 스택 사이즈를 초과할 경우 Stack Overflow에러가 남.
- 함수를 실행하면, 맨위에 있던 해당 함수가 추가(push)
- 함수를 반환하면, 쌓여있던 함수는 제거(pop)
- Call Stack에 저장되는 각 항목을 Execution Context라 함.
### Call Back
- 하나의 작업이 완료될 때까지 기다려야하는 문제를 해결하기 위해 비동기 콜백을 사용.
- 작업이 끝나면 실행시킬 콜백 함수들은 Call Stack에 push될 필요가 없음.
- javascript 실행환경(runtime)은 Task Queue를 가지고 있음.
* Task Queue: 처리할 메시지 목록과 실행할 콜백 함수들의 목록 
### 비동기 콜백 과정
DOM이벤트, http 요청, setTimeOut() 등 비동기 함수는 web API를 호출 <br>
-> web API는 콜백 함수를 Event Queue에 넣음 <br>
-> Task Queue는 대기하다가 Call Stack이 비는 시점에 Event Loop을 돌려 Call Stack에 콜백함수를 넣는다.

<hr />

## javascript의 비동기 처리
### Ajax(Asynchronous Javascript And XML)
- javascript는 기본적으로 비동기적으로 작업을 처리하는 비동기 처리 특성을 가짐.
- Ajax는 서버와 통신하기 위해 XMLhttpRequest 객체를 사용하는 것을 말함.
- 비동기성 특징을 가지므로 페이지 전체를 새로고침하지 않아도 수행.

```javascript
function getData() {
    let tableData;

    $.get('https://example.com/subpage/1', function(response) {
        tableData = response;
    })

    return tableData;
}

console.log(getData()); // undefined
```
- undefined가 출력된 이유는 데이터를 요청하고 응답받을 때까지 기다려주지 않고 원래 undefined인 tableData가 실행되었기 때문. (비동기 처리)

```javascript
// 1
console.log('Hello Stranger');
// 2
setTimeout(() => {
    console.log('After 3 seconds.............');
}, 3000)
// 3
console.log('Hello Again :P');
```
- setTimeout()은 web API의 한 종류. 이 역시 비동기 처리가 되므로 Hello Stranger > Hello Again :P 이 실행된 다음 3초가 지나 실행.

### 콜백 함수
- 다른 함수의 parameter로 넘기는 함수를 말함.
- 콜백함수가 끝나고 콜백함수를 받은 함수가 실행되므로 동기식으로 동작

```javascript
function findUserAndCallBack(id, cb) {
    const user = {
        id: id,
        name: `User${id}`,
        email: `user_${id}@test.com`
    };
    cb(user);
}

function printConsole(param) {
    console.log(param);
}

findUserAndCallBack(1, printConsole); // {id: 1, namme: 'User1', email: 'user_1@test.com'}
```
- findUserAndCallBack 함수는 cb로 콜백함수를 할당받음. cb(user)가 실행될때 동기적으로 실행됨.
- 콜백함수로 동기적 처리를 위해 함수의 결과값을 return 받으려 하지말고, 결과값을 통해 처리할 로직을 콜백함수로 넘기는 방식

### 콜백 지옥(Callback Hell)
```javascript
$.get('url', function(response) {
    parseValue(response, function(id) {
        auth(id, function(result) {
            display(result, function(text) {
                console.log(text);
            })
        })
    })
})
```
- 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵다.
- Promise와 async/await를 이용해 이런 문제를 해결할 수 있다.

### Promise
- 비동기 작업의 최종 완료와 그 결과값을 나타내는 객체.
- 다음중 하나의 상태를 가진다.
* 대기(Pending) : 이행되지 않거나 거부되지 않은 초기 상태
* 이행(Fullfilled) : 연산이 성공적으로 종료
* 거부(Rejected) : 연산 실패

#### Promise 사용
- new Promise()를 사용해 Promise 객체를 생성하고 콜백함수 선언. parameter는 resolve, reject를 사용
- resolve는 결과가 성공인 Promise 객체 반환, reject는 결과가 실패인 Promise 객체를 반환
- 결과가 성공일 경우 then을 사용해 처리, 실패일 경우 catch를 사용해 처리
```javascript
let firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 3000);
});

firstPromise.then((success) => {
    console.log(`your promise ${success}`)
}).catch((reason) => {
    console.log(`Here is reason of the rejection : ${reason}`);
})
```

#### async/await
- Promise 역시 콜백함수를 사용하기 때문에 가독성이 좋지 않은 문제점이 있다.
- 함수 앞에 async를 붙이면 이 함수는 비동기 함수가 되고 반환되는 값은 Promise 객체가된다.
- await는 then과 유사한 기능을 한다.
- await가 붙은 메서드가 종료될 때까지 비동기 함수는 실행을 중지한다. 
- 동기식 코드를 짜듯이 비동기 코드를 짤 수 있음
```javascript
async function hello() {
    return 'Hello Stranger';
}

async function callHello() {
    try {
        const result = await hello();
        console.log('Success: ', result);
    } catch (e) {
        console.log('Fail : ', e);
    }
}

callHello();
```

- 출처 : https://velog.io/@wngkdroqkf441/Frontend-기술-면접-대비-동기와-비동기