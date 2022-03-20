export default class Toast {
  #toastElement
  #autoCloseTimeout
  #progressInterval
  #removeBinded
  #timeTotal
  #paused = false
  #timeLeft

  constructor(options) {
    this.#toastElement = document.createElement('div')
    this.#toastElement.classList.add('toast')
    requestAnimationFrame(() => {
      this.#toastElement.classList.add('show')
    })
    this.#removeBinded = this.remove.bind(this)
    this.update({ ...options })
  }

  // SETTERS
  set position(value) {
    const currentContainer = this.#toastElement.parentElement
    const selector = `.toast-container[data-position="${value}"`
    const container = document.querySelector(selector) || createContainer(value) // use existing container || create new one
    container.append(this.#toastElement)

    // if there is no toasts in container => remove it
    if (currentContainer == null || currentContainer.hasChildNodes()) return
    currentContainer.remove()
  }

  set text(value) {
    this.#toastElement.textContent = value
  }

  set autoClose(value) {
    if (value === false) return
    this.#timeTotal = value
    this.#timeLeft = this.#timeTotal
    this.#progressInterval = setInterval(() => {
      if (this.#paused === false) {
        this.#timeLeft -= 10
      }
      if (this.#timeLeft <= 0) {
        this.remove()
        clearInterval(this.#progressInterval)
      }
    }, 10)
  }

  set showProgress(value) {
    this.#toastElement.classList.toggle('progress', value)
    this.#toastElement.style.setProperty('--progress', 1)
    if (value) {
      setInterval(() => {
        this.#toastElement.style.setProperty(
          '--progress',
          this.#timeLeft / this.#timeTotal
        )
      }, 10)
    }
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastElement.addEventListener(
        'mouseover',
        () => (this.#paused = true)
      )
      this.#toastElement.addEventListener(
        'mouseleave',
        () => (this.#paused = false)
      )
    }
  }

  set canClose(value) {
    this.#toastElement.classList.toggle('can-close', value)
    if (value) {
      this.#toastElement.addEventListener('click', this.#removeBinded)
    } else {
      this.#toastElement.removeEventListener('click', this.#removeBinded)
    }
  }

  set type(value) {
    switch (value) {
      case 'normal':
        this.#toastElement.style.setProperty('color', 'black')
        this.#toastElement.style.setProperty('--progress-bar-color', 'black')
        return
      case 'error':
        this.#toastElement.style.setProperty('color', 'red')
        this.#toastElement.style.setProperty('--progress-bar-color', 'red')
        return
      case 'information':
        this.#toastElement.style.setProperty('color', '#2872F0')
        this.#toastElement.style.setProperty('--progress-bar-color', '#2872F0')
        return
      case 'success':
        this.#toastElement.style.setProperty('color', '#2D9F2D')
        this.#toastElement.style.setProperty('--progress-bar-color', '#2D9F2D')
        return
      default:
        this.#toastElement.style.setProperty('color', 'black')
        this.#toastElement.style.setProperty('--progress-bar-color', 'black')
        return
    }
  }

  // FUNCTIONS
  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  remove() {
    clearInterval(this.#progressInterval)
    clearTimeout(this.#autoCloseTimeout)
    const container = this.#toastElement.parentElement
    this.#toastElement.classList.remove('show') // remove animation
    this.#toastElement.addEventListener('transitionend', () => {
      //waits for animation to finish
      this.#toastElement.remove()
      if (container.hasChildNodes()) return
      container.remove()
    })
  }
}

function createContainer(position) {
  const container = document.createElement('div')
  container.classList.add('toast-container')
  container.dataset.position = position //<div [data-position=<position passed in>] class='toast-container'></div>
  document.body.append(container)
  return container
}
