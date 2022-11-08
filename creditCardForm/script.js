const experationSelect = document.querySelector("[data-experation-year]")

const currentYear = new Date().getFullYear()
for (let i = currentYear; i < currentYear + 10; i++) {
  const option = document.createElement('option')
  option.value = i
  option.innerText = i
  experationSelect.append(option)
}

document.addEventListener('keydown', e => {
  const input = e.target
  const key = e.key

  if (!isConntectedInput(input)) return

  switch (key) {
    case "ArrowLeft": {
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        e.preventDefault()
        const prev = input.previousElementSibling
        prev.focus()
        prev.selectionStart = prev.value.length - 1
        prev.selectionEnd = prev.value.length - 1
      }
      break
    }
    case "ArrowRight": {
      if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length && input.nextElementSibling != null) {
        e.preventDefault()
        const next = input.nextElementSibling
        next.focus()
        next.selectionStart = 0
        next.selectionEnd = 0
      }
      break
    }
    default: {
      if (key.match(/^[^0-9]$/)) return e.preventDefault()

      oninputChange(input, key)
    }
  }
})

function oninputChange(input, newValue) {
  const start = input.selectionStart
  const end = input.selectionEnd

  unpdateInputValue(input, newValue, start, end)
  focusInputValue()
}

function focusInputValue() {

}

function unpdateInputValue(input, value, start = 0, end = 0) {
  // takes every prev values in input up to start and adds value up to the end of input value
  const newValue = `${input.value.substring(0, start)}${value}${input.value.substring(end, 4)}`
  console.log(newValue)
  input.value = newValue.substring(0, 4)
  // if value cant fit in input call updateInputValue for next sibling
  if (newValue > 4) {
    const next = input.nextElementSibling
    if (next === null) return
    unpdateInputValue(next, newValue.substring(4))
  }
}

function isConntectedInput(input) {
  const parent = input.closest('[data-conntected-inputs]')
  return input.matches('input') && parent != null
}