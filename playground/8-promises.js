const add = (a, b) => {
    console.log('adding up')
    return new Promise((res, rej) => {

        setTimeout(() => {
            res(a + b)
        }, 2000);
    })
}

add('1', '3').then((res) => {
    console.log(res)
    return add(res, 22)
}).then((sum2) => {
    console.log("sum2 is -> " + sum2)
})

    .catch(err => {
        console.log(err)
    })