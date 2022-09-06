document.querySelector('.mode-switch').onclick = () => {
  document.querySelector('body').classList.toggle('dark')
  document.querySelector('body').classList.toggle('light')
}

isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28
}

const currentDate = new Date()
const currentMonth = { value: currentDate.getMonth() }
const currentYear = { value: currentDate.getFullYear() }

const calendar = document.querySelector('.calendar')
const monthList = document.querySelector('.month-list')
const monthPicker = document.querySelector('#month-picker')
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

monthPicker.onclick = () => {
  monthList.classList.add('show')
}

// CHANGE YEAR
document.querySelector('#prev-year').onclick = () => {
  currentYear.value -= 1
  generateCalendar(currentMonth, currentYear, currentDate)
}
document.querySelector('#next-year').onclick = () => {
  currentYear.value += 1
  generateCalendar(currentMonth, currentYear, currentDate)
}

// CREATE CALENDAR
generateCalendar = (month, year) => {
  let calendarDays = calendar.querySelector('.calendar-days')
  let calendarHeaderYear = calendar.querySelector('#year')

  let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  calendarDays.innerHTML = ''

  // GET CURRENT DATE, MONTH, YEAR
  let currDate = new Date()
  if (!month) month = currDate.getMonth()
  if (!year) year = currDate.getFullYear()

  let currentMonth = `${monthNames[month.value]}`
  monthPicker.innerHTML = currentMonth
  calendarHeaderYear.innerHTML = year.value

  // GET FIRST DAT OF MONTH

  let firstDay = new Date(year.value, month.value, 1)

  for (let i = 0; i <= daysOfMonth[month.value] + firstDay.getDay() - 1; i++) {
    let day = document.createElement('div')
    if (i >= firstDay.getDay()) {
      day.classList.add('calendar-day-hover')
      day.innerHTML = i - firstDay.getDay() + 1
      if (i - firstDay.getDay() + 1 === currDate.getDate() && year.value === currDate.getFullYear() && month.value === currDate.getMonth()) {
        day.classList.add('curr-date')
      }
    }
    calendarDays.appendChild(day)
  }
}


function displayMonthPicker() {
  monthNames.forEach((value, index) => {
    const monthElement = document.createElement('div')
    monthElement.innerHTML = `${value}`
    monthList.appendChild(monthElement)
    monthElement.onclick = () => {
      monthList.classList.remove('show')
      currentMonth.value = index
      generateCalendar(currentMonth, currentYear, currentDate)
    }
  })
}

generateCalendar(currentMonth, currentYear, currentDate)
displayMonthPicker()