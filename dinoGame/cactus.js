import { getCutomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElement = document.querySelector('[data-world]')

let nextCactusTime

export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll('[data-cactus]').forEach(c => c.remove())
}

export function updateCactus(delta, speedScale) {
  const cactuses = document.querySelectorAll('[data-cactus]')
  cactuses.forEach(cactus => {
    incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * - 1)
    if (getCutomProperty(cactus, '--left') <= -100) {
      cactus.remove()
    }
  })

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

function createCactus() {
  const cactus = document.createElement('img')
  cactus.dataset.cactus = true
  cactus.src = './assets/images/cactus.png '
  cactus.classList.add('cactus')
  setCustomProperty(cactus, '--left', 100)
  worldElement.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}