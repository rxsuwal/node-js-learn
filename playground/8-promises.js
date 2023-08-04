const doworkPromise = new Promise((resolve, reject) => {
    resolve('')
    reject('')


})

const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b)
        }, 2000);
    })
}

add('1', '3').then((res) => {
    console.log(res)
}).catch(err => {
    console.log(err)
})