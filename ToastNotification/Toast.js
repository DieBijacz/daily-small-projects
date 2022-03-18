const DEFAULT_OPTIONS = {
  autoClose: '3000',
  position: 'top right',
  onClose: () => {},
  canClose: true,
}

export default class Toast {
  #toastElement
  #autoCloseTimeout
  #removeBinded

  constructor(options) {
    this.#toastElement = document.createElement('div')
    this.#toastElement.classList.add('toast')
    requestAnimationFrame(() => {
      this.#toastElement.classList.add('show')
    })
    this.#removeBinded = this.remove.bind(this)
    this.update({ ...DEFAULT_OPTIONS, ...options })
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
    if (this.#autoCloseTimeout != null) clearTimeout(this.#autoCloseTimeout)
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value)
  }

  set canClose(value) {
    this.#toastElement.classList.toggle('can-close', value)
    if (value) {
      this.#toastElement.addEventListener('click', this.#removeBinded)
    } else {
      this.#toastElement.removeEventListener('click', this.#removeBinded)
    }
  }

  // FUNCTIONS
  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  remove() {
    const container = this.#toastElement.parentElement
    this.#toastElement.classList.remove('show') // remove animation
    this.#toastElement.addEventListener('transitionend', () => {
      //waits for animation to finish
      this.#toastElement.remove()
      if (container.hasChildNodes()) return
      container.remove()
    })
    this.onClose()
  }
}

function createContainer(position) {
  const container = document.createElement('div')
  container.classList.add('toast-container')
  container.dataset.position = position //<div [data-position=<position passed in>] class='toast-container'></div>
  document.body.append(container)
  return container
}
