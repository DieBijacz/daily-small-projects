import { getCutomProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js'
const grounds = document.querySelectorAll('[data-ground')
const SPEED = .02

export function setupGround() {
  setCustomProperty(grounds[0], '--left', 0)
  setCustomProperty(grounds[1], '--left', 300)
}

export function updateGround(delta) {
  grounds.forEach(ground => {
    incrementCustomProperty(ground, '--left', delta * SPEED * -1)

    if (getCutomProperty(ground, '--left') <= -300) {
      incrementCustomProperty(ground, '--left', 600)
    }
  })
}
