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
