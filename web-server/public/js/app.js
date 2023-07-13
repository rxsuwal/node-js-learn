console.log("CLIENT SIDE JS!")

fetch('https://puzzle.mead.io/puzzle').then((rspnse) => {
    rspnse.json().then((data) => {
        console.log(data)
    })
})


// GET WEATHER FETCH API

// const getWeather = async (address) => {
//     if (!address) {
//         return 'No Address Provided!'
//     } else {
//         let rspnseW
//         await fetch(`/weather?address=${address}`).then((rspnse) => {
//             rspnse.json().then((data) => {
//                 console.log(data)
//                 rspnseW = data
//             })
//         })

//         return rspnseW
//     }
// }

const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const result = document.querySelector('#result')

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const address = weatherInput.value

    result.innerText = "Loading..."
    fetch(`/weather?address=${address}`).then((rspnse) => {
        rspnse.json().then((data) => {
            if (data.error) {
                console.log(data)
                result.innerText = data.error
            } else {
                console.log(data)
                result.innerText = data.forecast
            }

        })
    })

})