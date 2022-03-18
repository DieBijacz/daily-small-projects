import Toast from './Toast.js'

document.querySelector('button').addEventListener('click', () => {
  const toast = new Toast({
    text: 'siema',
    autoClose: 1000,
  })
})
