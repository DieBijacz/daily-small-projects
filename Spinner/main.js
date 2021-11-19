// Hide paragraf from main page
document.querySelector('.main p').style.display = "none"
// adds spinner 
document.querySelector('.main').classList.add('spinner-3')

// mimic server req
setTimeout(() => {
    document.querySelector('.main').classList.remove('spinner-3')
    document.querySelector('.main p').style.display = 'block'
}, 2000)

