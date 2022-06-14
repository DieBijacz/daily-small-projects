import { setupDino, updateDino } from "./dino.js"
import { setupGround, updateGround } from "./ground.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001
const world = document.querySelector('[data-world]')
const scoreElement = document.querySelector('[data-score]')
const startText = document.querySelector('[data-start-screen]')
window.addEventListener('resize', setPixelToWorldScale)
document.addEventListener('keydown', handleStart, { once: true })

setPixelToWorldScale()

let lastTime
let speedScale
let score

function update(time) {
  // first frame
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  lastTime = time

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  window.requestAnimationFrame(update)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  window.requestAnimationFrame(update)
  startText.classList.add('hide')
  setupGround()
  setupDino()
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * .01
  scoreElement.textContent = Math.floor(score)
}

// scale based on window size
function setPixelToWorldScale() {
  let worldToPixelScale
  if ((window.innerWidth / window.innerHeight) < (WORLD_WIDTH / WORLD_HEIGHT)) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  world.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  world.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
