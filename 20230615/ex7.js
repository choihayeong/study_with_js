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