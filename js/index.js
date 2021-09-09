document.getElementById("phone").addEventListener("keypress", (evt) => {
  if (evt.which < 48 || evt.which > 57) {
    evt.preventDefault()
  }
})

const formatPhone = (value) => {
  if (!value) {
    return value
  }
  const number = value.replace(/[^\d]/g, "")
  const n = number.length
  if (n < 4) {
    return number
  }
  if (n < 7) {
    return `(${number.slice(0, 3)}) ${number.slice(3)}`
  }
  return `(${number.slice(0, 3)}) ${number.slice(3,6)}-${number.slice(6, 10)}`
}

const phoneFormatter = (obj) => {
  const value = formatPhone(obj.value);
  obj.value = value;
}

const slider = (obj) => {
  const deposit = Math.round(obj.value)
  const returns = (Math.floor(deposit * ((ESTIMATED_RETURN / 100) + 1) * 100) / 100)
  document.getElementById("deposit-amount").innerHTML = deposit.toString()
  document.getElementById("return-amount").innerHTML = Math.floor(returns).toString()
  document.getElementById("return-amount-cents").innerHTML = ("." + Math.round((returns - Math.floor(returns)) * 100).toString().padEnd(2, "0"))
}

const sliderInit = (obj) => {
  obj.value = (Math.floor(Math.random() * (SLIDER_INIT_MAX - SLIDER_INIT_MIN)) + SLIDER_INIT_MIN)
  slider(obj)
}

const updateCountdown = (obj) => {
  const distance = LAUNCH_DATE - (new Date().getTime())
  const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padEnd(COUNTDOWN_PAD, "0")
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padEnd(COUNTDOWN_PAD, "0")
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padEnd(COUNTDOWN_PAD, "0")
  const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padEnd(COUNTDOWN_PAD, "0")
  obj.innerHTML = (days + "d " + hours + "h " + minutes + "m " + seconds + "s")
}

const countdown = setInterval(() => {
  updateCountdown(document.getElementById("countdown"))
}, 1000);

sliderInit(document.getElementsByClassName("slider")[0])
updateCountdown(document.getElementById("countdown"))
