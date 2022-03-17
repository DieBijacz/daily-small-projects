import Toast from './Toast.js'

const toast = new Toast({ position: 'top right', text: 'siema' })

setTimeout(() => {
  toast.remove()
}, 3000)
