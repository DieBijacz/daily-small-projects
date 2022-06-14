import { getCutomProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js'
const grounds = document.querySelectorAll('[data-ground')
const SPEED = .02

export function setupGround() {
  // have two tiles of ground one after another inline
  setCustomProperty(grounds[0], '--left', 0)
  setCustomProperty(grounds[1], '--left', 300)
}

export function updateGround(delta, speedScale) {
  grounds.forEach(ground => {
    // move ground to left
    incrementCustomProperty(ground, '--left', delta * SPEED * -1 * speedScale)

    // if ground in no longer visible, move it to the right
    if (getCutomProperty(ground, '--left') <= -300) {
      incrementCustomProperty(ground, '--left', 600)
    }
  })
}
