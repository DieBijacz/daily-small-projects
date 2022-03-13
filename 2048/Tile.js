export default class Tile {
  #tileElement
  #x
  #y
  #value

  // if there is no passed value then use at random 2 or 4
  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div')
    this.#tileElement.classList.add('tile')
    tileContainer.append(this.#tileElement)
    this.value = value
  }

  get value() {
    return this.#value
  }

  // SETTER FOR TILE VALUE
  set value(v) {
    this.#value = v
    this.#tileElement.textContent = v // <div> v </div>
    const power = Math.log2(v) // return how many times number was raised to power of 2 // 8 => 3

    // set colors property's
    const backgroundLightness = 100 - power * 9
    this.#tileElement.style.setProperty(
      '--background-lightness',
      `${backgroundLightness}%`
    )
    this.#tileElement.style.setProperty(
      '--text-lightness',
      `${backgroundLightness <= 50 ? 90 : 10}`
    )
  }

  // SETTER FOR TILE COORDINATES
  set x(value) {
    this.#x = value
    this.#tileElement.style.setProperty('--x', value) // set x value to css element
  }
  set y(value) {
    this.#y = value
    this.#tileElement.style.setProperty('--y', value) // set y value to css element
  }

  remove() {
    this.#tileElement.remove()
  }

  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? 'animationend' : 'transitionend',
        resolve,
        {
          once: true,
        }
      )
    })
  }
}
