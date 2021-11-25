const startTime = 10
let time = startTime * 60

const countdown = document.querySelector("#countdown")

setInterval(updateCountdown, 1000)

function updateCountdown() {
    const min = Math.floor(time/60)
    let sec = time % 60

    sec = sec < 10 ? '0' + sec : sec

    countdown.innerHTML = `${min}:${sec}`
    time--
}