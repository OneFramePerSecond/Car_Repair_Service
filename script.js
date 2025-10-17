// Управление экранами
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })
  document.getElementById(screenId).classList.add("active")

  // Показываем навигацию в сайдбаре только на главном экране
  const sidebarNav = document.getElementById("sidebar-nav")
  if (screenId === "main-screen") {
    sidebarNav.innerHTML = `
      <button class="nav-item active">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Профиль
      </button>
      <button class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
        Автомобили
      </button>
      <button class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        Заявки
      </button>
    `
  } else {
    sidebarNav.innerHTML = ""
  }
}

// Показ уведомлений
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar")
  snackbar.textContent = message
  snackbar.classList.add("show")

  setTimeout(() => {
    snackbar.classList.remove("show")
  }, 3000)
}

// Переключение видимости пароля
document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", function () {
    const input = this.parentElement.querySelector("input")
    const svg = this.querySelector("svg")

    if (input.type === "password") {
      input.type = "text"
      svg.innerHTML =
        '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
    } else {
      input.type = "password"
      svg.innerHTML =
        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>'
    }
  })
})

// Навигация между экранами авторизации
document.getElementById("go-to-register").addEventListener("click", () => {
  showScreen("register-screen")
})

document.getElementById("register-back").addEventListener("click", () => {
  showScreen("login-screen")
})

document.getElementById("forgot-password-btn").addEventListener("click", () => {
  showScreen("recovery-screen")
})

document.getElementById("recovery-back").addEventListener("click", () => {
  showScreen("login-screen")
})

// Форма входа
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("login-email").value.trim()
  const password = document.getElementById("login-password").value

  // Проверка существующего пользователя
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find((u) => (u.email === email || u.phone === email) && u.password === password)

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
    loadMainScreen()
    showScreen("main-screen")
    showSnackbar("Вход выполнен успешно!")
  } else {
    showSnackbar("Неверный логин или пароль")
  }
})

// Форма регистрации
const registerNameInput = document.getElementById("register-name")
const registerCityInput = document.getElementById("register-city")
const registerPhoneInput = document.getElementById("register-phone")
const registerEmailInput = document.getElementById("register-email")
const registerPasswordInput = document.getElementById("register-password")
const registerPasswordConfirmInput = document.getElementById("register-password-confirm")

// Validation for name - only letters
if (registerNameInput) {
  registerNameInput.addEventListener("input", (e) => {
    const value = e.target.value
    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "")
    e.target.value = lettersOnly

    const errorElement = document.getElementById("name-error")
    if (value !== lettersOnly) {
      errorElement.textContent = "Только буквы"
      e.target.classList.add("error")
    } else if (lettersOnly.length < 2) {
      errorElement.textContent = "Минимум 2 символа"
      e.target.classList.add("error")
    } else {
      errorElement.textContent = ""
      e.target.classList.remove("error")
    }
  })
}

// Validation for city - only letters
if (registerCityInput) {
  registerCityInput.addEventListener("input", (e) => {
    const value = e.target.value
    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "")
    e.target.value = lettersOnly

    const errorElement = document.getElementById("city-error")
    if (value !== lettersOnly) {
      errorElement.textContent = "Только буквы"
      e.target.classList.add("error")
    } else if (lettersOnly.length < 2) {
      errorElement.textContent = "Минимум 2 символа"
      e.target.classList.add("error")
    } else {
      errorElement.textContent = ""
      e.target.classList.remove("error")
    }
  })
}

// Phone mask +7 XXX XXX XX XX
if (registerPhoneInput) {
  registerPhoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")

    // Start with +7
    if (!value.startsWith("7") && value.length > 0) {
      value = "7" + value
    }

    // Format: +7 XXX XXX XX XX
    let formatted = "+7"
    if (value.length > 1) {
      formatted += " " + value.substring(1, 4)
    }
    if (value.length > 4) {
      formatted += " " + value.substring(4, 7)
    }
    if (value.length > 7) {
      formatted += " " + value.substring(7, 9)
    }
    if (value.length > 9) {
      formatted += " " + value.substring(9, 11)
    }

    e.target.value = formatted

    const errorElement = document.getElementById("phone-error")
    if (value.length < 11) {
      errorElement.textContent = "Введите полный номер"
      e.target.classList.add("error")
    } else {
      errorElement.textContent = ""
      e.target.classList.remove("error")
    }
  })

  // Set initial value
  registerPhoneInput.value = "+7 "
}

// Email validation - English letters only and specific domains
if (registerEmailInput) {
  registerEmailInput.addEventListener("input", (e) => {
    const value = e.target.value
    const errorElement = document.getElementById("email-error")

    // Check for Cyrillic characters
    if (/[а-яА-ЯёЁ]/.test(value)) {
      errorElement.textContent = "Только английские буквы"
      e.target.classList.add("error")
      return
    }

    // Check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value) && value.length > 0) {
      errorElement.textContent = "Неверный формат email"
      e.target.classList.add("error")
      return
    }

    // Check for specific domains
    const validDomains = ["@mail.ru", "@gmail.com", "@gmail.ru", "@yandex.ru", "@ya.ru"]
    const hasValidDomain = validDomains.some((domain) => value.endsWith(domain)) || value.match(/@[a-zA-Z0-9.-]+\.com$/)

    if (value.includes("@") && !hasValidDomain) {
      errorElement.textContent = "Используйте @mail.ru, @gmail.com или другой .com домен"
      e.target.classList.add("error")
    } else if (value.length > 0 && !value.includes("@")) {
      errorElement.textContent = "Email должен содержать @"
      e.target.classList.add("error")
    } else {
      errorElement.textContent = ""
      e.target.classList.remove("error")
    }
  })
}

// Password validation - minimum 6 characters
if (registerPasswordInput) {
  registerPasswordInput.addEventListener("input", (e) => {
    const value = e.target.value
    const errorElement = document.getElementById("password-error")

    if (value.length < 6 && value.length > 0) {
      errorElement.textContent = "Минимум 6 символов"
      e.target.classList.add("error")
    } else {
      errorElement.textContent = ""
      e.target.classList.remove("error")
    }

    // Check password confirmation match
    if (registerPasswordConfirmInput && registerPasswordConfirmInput.value) {
      const confirmErrorElement = document.getElementById("password-confirm-error")
      if (registerPasswordConfirmInput.value !== value) {
        confirmErrorElement.textContent = "Пароли не совпадают"
        registerPasswordConfirmInput.classList.add("error")
      } else {
        confirmErrorElement.textContent = ""
        registerPasswordConfirmInput.classList.remove("error")
      }
    }
  })
}

// Password confirmation validation
if (registerPasswordConfirmInput) {
  registerPasswordConfirmInput.addEventListener("input", (e) => {
    const value = e.target.value
    const password = registerPasswordInput.value
    const errorElement = document.getElementById("password-confirm-error")

    if (value !== password && value.length > 0) {
      errorElement.textContent = "Пароли не совпадают"
      e.target.classList.add("error")
    } else {
      errorElement.textContent = ""
      e.target.classList.remove("error")
    }
  })
}

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("register-name").value.trim()
  const city = document.getElementById("register-city").value.trim()
  const phone = document.getElementById("register-phone").value.trim()
  const email = document.getElementById("register-email").value.trim()
  const password = document.getElementById("register-password").value
  const passwordConfirm = document.getElementById("register-password-confirm").value

  // Validate name - only letters
  if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name) || name.length < 2) {
    showSnackbar("Имя должно содержать только буквы (минимум 2 символа)")
    return
  }

  // Validate city - only letters
  if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(city) || city.length < 2) {
    showSnackbar("Город должен содержать только буквы (минимум 2 символа)")
    return
  }

  // Validate phone - must be complete
  const phoneDigits = phone.replace(/\D/g, "")
  if (phoneDigits.length !== 11) {
    showSnackbar("Введите полный номер телефона")
    return
  }

  // Validate email - English letters only and specific domains
  if (/[а-яА-ЯёЁ]/.test(email)) {
    showSnackbar("Email должен содержать только английские буквы")
    return
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    showSnackbar("Неверный формат email")
    return
  }

  const validDomains = ["@mail.ru", "@gmail.com", "@gmail.ru", "@yandex.ru", "@ya.ru"]
  const hasValidDomain = validDomains.some((domain) => email.endsWith(domain)) || email.match(/@[a-zA-Z0-9.-]+\.com$/)

  if (!hasValidDomain) {
    showSnackbar("Используйте @mail.ru, @gmail.com или другой .com домен")
    return
  }

  // Validate password - minimum 6 characters
  if (password.length < 6) {
    showSnackbar("Пароль должен содержать минимум 6 символов")
    return
  }

  // Validate password confirmation
  if (password !== passwordConfirm) {
    showSnackbar("Пароли не совпадают")
    return
  }

  // Проверка существующего email
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  if (users.find((u) => u.email === email)) {
    showSnackbar("Пользователь с таким email уже существует")
    return
  }

  // Создание нового пользователя
  const newUser = {
    id: Date.now(),
    name,
    city,
    phone,
    email,
    password,
    cars: [],
    requests: [],
  }

  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.setItem("currentUser", JSON.stringify(newUser))

  // Добавление демо-данных для нового пользователя
  addDemoData(newUser.id)

  loadMainScreen()
  showScreen("main-screen")
  showSnackbar("Регистрация успешна!")

  // Очистка формы
  document.getElementById("register-form").reset()
  if (registerPhoneInput) {
    registerPhoneInput.value = "+7 "
  }
})

// Форма восстановления пароля
document.getElementById("recovery-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const contact = document.getElementById("recovery-contact").value.trim()

  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find((u) => u.email === contact || u.phone === contact)

  if (user) {
    showSnackbar("Новый пароль отправлен на " + contact)
    setTimeout(() => {
      showScreen("login-screen")
    }, 2000)
  } else {
    showSnackbar("Пользователь не найден")
  }

  document.getElementById("recovery-form").reset()
})

// Загрузка главного экрана
function loadMainScreen() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!currentUser) return

  // Загрузка профиля
  document.getElementById("user-name").textContent = currentUser.name
  document.getElementById("user-email").textContent = currentUser.email
  document.getElementById("user-phone").textContent = currentUser.phone
  document.getElementById("user-city").textContent = currentUser.city

  // Загрузка автомобилей
  loadCars()

  // Загрузка заявок
  loadRequests()
}

// Загрузка списка автомобилей
function loadCars() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const carsList = document.getElementById("cars-list")

  if (!currentUser.cars || currentUser.cars.length === 0) {
    carsList.innerHTML = '<p style="color: #888; font-size: 14px;">Автомобили не добавлены</p>'
    return
  }

  carsList.innerHTML = currentUser.cars
    .map(
      (car) => `
        <div class="list-item">
            <div class="list-content">
                <div class="list-title">${car.brand} ${car.model}</div>
                <div class="list-subtitle">${car.year} • ${car.plate}</div>
            </div>
            <div class="list-actions">
                <button type="button" class="icon-btn" onclick="deleteCar(${car.id})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Загрузка списка заявок
function loadRequests() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const requestsList = document.getElementById("requests-list")

  if (!currentUser.requests || currentUser.requests.length === 0) {
    requestsList.innerHTML = '<p style="color: #888; font-size: 14px;">Заявки отсутствуют</p>'
    return
  }

  requestsList.innerHTML = currentUser.requests
    .map(
      (request) => `
        <div class="list-item">
            <div class="list-content">
                <div class="list-title">${request.service}</div>
                <div class="list-subtitle">${request.car} • ${request.date}</div>
                <span class="status ${request.status}">${getStatusText(request.status)}</span>
            </div>
        </div>
    `,
    )
    .join("")
}

// Получение текста статуса
function getStatusText(status) {
  const statuses = {
    pending: "Ожидает",
    "in-progress": "В работе",
    completed: "Завершено",
  }
  return statuses[status] || status
}

// Удаление автомобиля
function deleteCar(carId) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  currentUser.cars = currentUser.cars.filter((car) => car.id !== carId)

  updateCurrentUser(currentUser)
  loadCars()
  showSnackbar("Автомобиль удален")
}

// Обновление текущего пользователя
function updateCurrentUser(updatedUser) {
  localStorage.setItem("currentUser", JSON.stringify(updatedUser))

  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const userIndex = users.findIndex((u) => u.id === updatedUser.id)
  if (userIndex !== -1) {
    users[userIndex] = updatedUser
    localStorage.setItem("users", JSON.stringify(users))
  }
}

// Добавление демо-данных
function addDemoData(userId) {
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex !== -1) {
    users[userIndex].cars = [
      {
        id: Date.now(),
        brand: "Toyota",
        model: "Camry",
        year: "2020",
        plate: "А123БВ",
      },
      {
        id: Date.now() + 1,
        brand: "BMW",
        model: "X5",
        year: "2019",
        plate: "В456ГД",
      },
    ]

    users[userIndex].requests = [
      {
        id: Date.now(),
        service: "Техническое обслуживание",
        car: "Toyota Camry",
        date: "15.01.2025",
        status: "in-progress",
      },
      {
        id: Date.now() + 1,
        service: "Диагностика двигателя",
        car: "BMW X5",
        date: "10.01.2025",
        status: "completed",
      },
    ]

    localStorage.setItem("users", JSON.stringify(users))
  }
}

// Кнопки главного экрана
document.getElementById("add-car-btn").addEventListener("click", () => {
  openCarModal()
})

document.getElementById("create-request-btn").addEventListener("click", () => {
  openRequestModal()
})

document.getElementById("close-modal").addEventListener("click", () => {
  closeRequestModal()
})

// Открытие модального окна создания заявки
function openRequestModal() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const modal = document.getElementById("request-modal")
  const carSelect = document.getElementById("request-car")

  // Заполнение списка автомобилей
  carSelect.innerHTML = '<option value="">Выберите автомобиль</option>'

  if (currentUser.cars && currentUser.cars.length > 0) {
    currentUser.cars.forEach((car) => {
      const option = document.createElement("option")
      option.value = `${car.brand} ${car.model}`
      option.textContent = `${car.brand} ${car.model} (${car.plate})`
      carSelect.appendChild(option)
    })
    modal.classList.add("active")
  } else {
    showSnackbar("Сначала добавьте автомобиль")
  }
}

// Закрытие модального окна
function closeRequestModal() {
  const modal = document.getElementById("request-modal")
  modal.classList.remove("active")
  document.getElementById("request-form").reset()
}

// Обработка формы создания заявки
document.getElementById("request-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const car = document.getElementById("request-car").value
  const service = document.getElementById("request-service").value
  const date = document.getElementById("request-date").value
  const comment = document.getElementById("request-comment").value

  // Форматирование даты
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString("ru-RU")

  // Создание новой заявки
  const newRequest = {
    id: Date.now(),
    service: service,
    car: car,
    date: formattedDate,
    comment: comment,
    status: "pending",
  }

  if (!currentUser.requests) {
    currentUser.requests = []
  }

  currentUser.requests.unshift(newRequest)
  updateCurrentUser(currentUser)
  loadRequests()
  closeRequestModal()
  showSnackbar("Заявка успешно создана")
})

// Закрытие модального окна при клике вне его
document.getElementById("request-modal").addEventListener("click", (e) => {
  if (e.target.id === "request-modal") {
    closeRequestModal()
  }
})

document.getElementById("request-call-btn").addEventListener("click", () => {
  showSnackbar("Запрос на звонок отправлен")
})

document.getElementById("support-btn").addEventListener("click", () => {
  showSnackbar("Открытие чата поддержки")
})

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("currentUser")
  showScreen("login-screen")
  showSnackbar("Вы вышли из аккаунта")
})

document.getElementById("logo-header").addEventListener("click", () => {
  const currentUser = localStorage.getItem("currentUser")
  if (currentUser) {
    showScreen("main-screen")
  }
})

function openCarModal() {
  const modal = document.getElementById("car-modal")
  modal.classList.add("active")
}

function closeCarModal() {
  const modal = document.getElementById("car-modal")
  modal.classList.remove("active")
  document.getElementById("car-form").reset()
}

document.getElementById("close-car-modal").addEventListener("click", () => {
  closeCarModal()
})

document.getElementById("car-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const brand = document.getElementById("car-brand").value.trim()
  const model = document.getElementById("car-model").value.trim()
  const year = document.getElementById("car-year").value.trim()
  const plate = document.getElementById("car-plate").value.trim()

  // Создание нового автомобиля
  const newCar = {
    id: Date.now(),
    brand: brand,
    model: model,
    year: year,
    plate: plate,
  }

  if (!currentUser.cars) {
    currentUser.cars = []
  }

  currentUser.cars.push(newCar)
  updateCurrentUser(currentUser)
  loadCars()
  closeCarModal()
  showSnackbar("Автомобиль успешно добавлен")
})

document.getElementById("car-modal").addEventListener("click", (e) => {
  if (e.target.id === "car-modal") {
    closeCarModal()
  }
})

// Проверка авторизации при загрузке
window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser")
  if (currentUser) {
    loadMainScreen()
    showScreen("main-screen")
  } else {
    showScreen("login-screen")
  }
})

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone) {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

function validateYear(year) {
  const yearRegex = /^\d{4}$/
  const yearNum = Number.parseInt(year)
  const currentYear = new Date().getFullYear()
  return yearRegex.test(year) && yearNum >= 1900 && yearNum <= currentYear + 1
}

function validateLicensePlate(plate) {
  // Проверка на наличие хотя бы одной буквы и одной цифры
  return plate.length >= 4 && /[A-Za-zА-Яа-я]/.test(plate) && /\d/.test(plate)
}
