import Toast from './Toast.js'

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault()
  const timeRange = document.querySelector('#time-range').value
  const textValue = document.querySelector('#text-value').value
  const clickToClose = document.querySelector('#clickToClose').checked
  const showProgress = document.querySelector('#showProgress').checked
  const pauseOnHover = document.querySelector('#pauseOnHover').checked
  const position = document.querySelector(
    'input[name="position"]:checked'
  ).value
  const type = document.querySelector('#select-type').value

  console.log(type)
  const toast = new Toast({
    text: `${textValue}`,
    autoClose: timeRange * 1000,
    canClose: clickToClose,
    showProgress: showProgress,
    pauseOnHover: pauseOnHover,
    position: position,
    type: type,
  })
})
