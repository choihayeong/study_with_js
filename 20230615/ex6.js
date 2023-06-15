let firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 3000);
});


function appleFunction() {
    return new Promise((resolve, reject) => {
        resolve('apple Function');
    });
}

function bananaFunction() {
    return new Promise((resolve, reject) => {
        resolve('banana Function');
    });
}
function carrotFunction() {
    return new Promise((resolve, reject) => {
        resolve('carrot Function');
    });
}

firstPromise.then(appleFunction).then(bananaFunction).then(carrotFunction);
