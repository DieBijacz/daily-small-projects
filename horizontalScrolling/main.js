const images = [...document.querySelectorAll('.img')]
const slider = document.querySelector('.slider')
let sliderWidth
let imageWidth
let current = 0
let target = 0
let ease = .05

window.addEventListener('resize', init)

images.map((img, index) => {
  img.style.backgroundImage = `url(./assets/${index + 1}.jpg)`
})

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}
function setTransorm(el, transform) {
  el.style.transform = transform
}
function init() {
  sliderWidth = slider.getBoundingClientRect().width;
  imageWidth = sliderWidth / images.length
  document.body.style.height = `${sliderWidth - window.innerWidth - window.innerHeight}px`
}

function animate() {
  current = parseFloat(lerp(current, target, ease)).toFixed(2)
  target = window.scrollY
  setTransorm(slider, `translateX(-${current}px)`)
  animateImages()
  requestAnimationFrame(animate)
}
function animateImages() {
  let ratio = current / imageWidth
  let intersectionRatioValue

  images.map((img, index) => {
    intersectionRatioValue = ratio - (index * 0.7)
    setTransorm(img, `translateX(${intersectionRatioValue * 70}px)`)
  })
}

init()
animate()