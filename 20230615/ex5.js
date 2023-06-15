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