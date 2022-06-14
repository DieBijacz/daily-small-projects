import { getCutomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const dinoElement = document.querySelector('[data-dino]')
const JUMP_SPEED = .45
const GRAVITY = .0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let velY

export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  velY = 0
  setCustomProperty(dinoElement, '--bottom', 0)
  document.removeEventListener('keydown', onJump)
  document.addEventListener('keydown', onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

// animate for running
function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElement.src = `assets/images/dino-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElement.src = `assets/images/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

// animate for jumping
function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElement, '--bottom', velY * delta)
  if (getCutomProperty(dinoElement, '--bottom') <= 0) {
    setCustomProperty(dinoElement, '--bottom', 0)
    isJumping = false
  }

  velY -= GRAVITY * delta
}

function onJump(e) {
  console.log(e)
  if (e.code !== 'Space' || isJumping) return

  velY = JUMP_SPEED
  isJumping = true
}