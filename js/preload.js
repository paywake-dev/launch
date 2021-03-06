const cleanPhone = (string) => {
  return string.toString().trim().toLowerCase().replace(/[^0-9]+/g, "")
}

const cleanName = (string) => {
  return string.toString().trim().replace(/[^a-zA-Z\.\- ]+/g, "")
}

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
  const value = formatPhone(obj.value)
  obj.value = value
}

const slider = (obj) => {
  const deposit = Math.round(obj.value)
  const returns = (Math.floor(deposit * ((ESTIMATED_RETURN / 100) + 1) * 100) / 100)
  document.getElementById("deposit-amount").innerHTML = deposit.toString()
  document.getElementById("return-amount").innerHTML = Math.floor(returns).toString()
  document.getElementById("return-amount-cents").innerHTML = ("." + Math.round((returns - Math.floor(returns)) * 100).toString().padEnd(2, "0"))
}

const sliderInit = (obj) => {
  const steps = 60
  const finalPosition = (Math.floor(Math.random() * (SLIDER_INIT_MAX - SLIDER_INIT_MIN)) + SLIDER_INIT_MIN)
  const duration = ((SLIDER_DURATION_MS / SLIDER_INIT_MAX) * finalPosition)
  let counter = 0
  obj.value = 5
  slider(obj)
  const interval = setInterval(() => {
    if (counter < steps) {
      obj.value = (5 + ((finalPosition - 5) * Math.pow((counter / steps), (1 / 3))))
      slider(obj)
      counter++
    }
    else {
      obj.value = finalPosition
      slider(obj)
      clearInterval(interval)
    }
  }, (duration / steps))
}

const updateCountdown = (obj) => {
  const distance = LAUNCH_DATE - (new Date().getTime())
  const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padEnd(COUNTDOWN_PAD, "0")
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padEnd(COUNTDOWN_PAD, "0")
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padEnd(COUNTDOWN_PAD, "0")
  const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padEnd(COUNTDOWN_PAD, "0")
  obj.innerHTML = (days + "d " + hours + "h " + minutes + "m " + seconds + "s")
}

const verifyName = (obj) => {
  const name = cleanName(obj.value)
  if (name.length > 0) {
    obj.removeAttribute("invalid")
    return name
  }
  obj.setAttribute("invalid", "true")
  return false
}

const verifyPhone = (obj) => {
  const phone = cleanPhone(obj.value)
  if (phone.length === 10 && phone !== "6969696969" && phone !== "9696969696") {
    obj.removeAttribute("invalid")
    return phone
  }
  else {
    if (phone === "6969696969" || phone === "9696969696") {
      alert("Fuck off.")
    }
  }
  obj.setAttribute("invalid", "true")
  return false
}

const submit = () => {
  const name = verifyName(document.getElementById("name"))
  const phone = verifyPhone(document.getElementById("phone"))
  const button = document.getElementById("submit")
  const last = button.innerHTML
  if (name && phone) {
    button.innerHTML = ("Loading...")
    $.ajax({
      url: COLLECT_API,
      data: { name, phone },
      success: (data) => {
        button.innerHTML = last
        if (data.success) {
          success()
        }
      },
      error: () => {
        button.innerHTML = last
      }
    })
  }
}

const success = () => {
  document.getElementById("name").setAttribute("readonly", "true")
  document.getElementById("phone").setAttribute("readonly", "true")
  $(".before-success").css("display", "none")
  $(".after-success").removeClass("after-success")
}

const estimateAlert = () => {
  const deposit = Math.round(document.getElementsByClassName("slider")[0].value)
  const returns =  (Math.floor(deposit * ((ESTIMATED_RETURN / 100) + 1) * 100) / 100)
  const dollarString = (Math.floor(returns).toString() + ("." + Math.round((returns - Math.floor(returns)) * 100).toString().padEnd(2, "0")))
  const text = ("This $" + dollarString + " return figure is based on our beta tests and subject to change.")
  alert(text)
}

const getStartedClick = () => {
  document.getElementById("name").focus()
}
