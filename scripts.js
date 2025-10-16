// Screen Navigation
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Snackbar Notification
function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.add('show');
    
    setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3000);
}

// Password Toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wrapper = this.closest('.password-wrapper');
            const input = wrapper.querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                    </svg>
                `;
            } else {
                input.type = 'password';
                this.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                    </svg>
                `;
            }
        });
    });
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login
    if (email && password) {
        // Store user data (in real app, this would come from server)
        const userData = {
            name: 'Иван Иванов',
            city: 'Москва',
            email: email,
            phone: '+7 (999) 123-45-67'
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showSnackbar('Вход выполнен успешно!');
        setTimeout(() => {
            loadDashboard();
            showScreen('dashboardScreen');
        }, 500);
    }
});

// Registration Form Handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const city = document.getElementById('registerCity').value;
    const phone = document.getElementById('registerPhone').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (password.length < 8) {
        showSnackbar('Пароль должен содержать минимум 8 символов');
        return;
    }
    
    // Store user data
    const userData = {
        name: name,
        city: city,
        email: email,
        phone: phone
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    showSnackbar('Регистрация успешна! Выполняем вход...');
    setTimeout(() => {
        loadDashboard();
        showScreen('dashboardScreen');
    }, 1000);
});

// Password Recovery Form Handler
document.getElementById('recoveryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const contact = document.getElementById('recoveryContact').value;
    
    if (contact) {
        showSnackbar('Новый пароль отправлен на ' + contact);
        setTimeout(() => {
            showScreen('loginScreen');
        }, 2000);
    }
});

// Load Dashboard Data
function loadDashboard() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'Иван Иванов',
        city: 'Москва',
        email: 'ivan@mail.ru',
        phone: '+7 (999) 123-45-67'
    };
    
    // Update user profile
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userCity').textContent = userData.city;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone;
    
    // Load cars
    loadCars();
    
    // Load service requests
    loadServiceRequests();
}

// Load Cars
function loadCars() {
    const cars = [
        {
            model: 'Toyota Camry',
            year: '2020',
            plate: 'А123ВС 777',
            vin: 'JTDKN3DU5A0123456'
        },
        {
            model: 'BMW X5',
            year: '2019',
            plate: 'В456ЕК 199',
            vin: 'WBAKN8C50CE123456'
        }
    ];
    
    const carsList = document.getElementById('carsList');
    carsList.innerHTML = '';
    
    cars.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-header">
                <div class="car-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="car-info">
                    <div class="car-model">${car.model}</div>
                    <div class="car-details">${car.year} • ${car.plate}</div>
                </div>
            </div>
            <div class="car-details" style="margin-top: 8px; font-size: 12px;">
                VIN: ${car.vin}
            </div>
            <div class="car-actions">
                <button class="btn btn-text" onclick="showSnackbar('Просмотр деталей автомобиля...')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                    </svg>
                    Подробнее
                </button>
                <button class="btn btn-text delete-button" onclick="deleteCar(${index})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                    </svg>
                    Удалить
                </button>
            </div>
        `;
        carsList.appendChild(carCard);
    });
}

// Delete Car
function deleteCar(index) {
    if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
        showSnackbar('Автомобиль удален');
        // In real app, would remove from database
        setTimeout(loadCars, 500);
    }
}

// Load Service Requests
function loadServiceRequests() {
    const requests = [
        {
            title: 'Техническое обслуживание',
            car: 'Toyota Camry',
            date: '15 октября 2024',
            status: 'in-progress',
            statusText: 'В работе'
        },
        {
            title: 'Диагностика двигателя',
            car: 'BMW X5',
            date: '10 октября 2024',
            status: 'completed',
            statusText: 'Завершено'
        },
        {
            title: 'Малярные работы',
            car: 'Toyota Camry',
            date: '20 октября 2024',
            status: 'pending',
            statusText: 'Ожидает'
        }
    ];
    
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '';
    
    requests.forEach(request => {
        const requestCard = document.createElement('div');
        requestCard.className = 'request-card';
        requestCard.innerHTML = `
            <div class="request-header">
                <div class="request-title">${request.title}</div>
                <span class="status-badge status-${request.status}">${request.statusText}</span>
            </div>
            <div class="request-details">
                <div class="request-detail-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                    </svg>
                    <span>${request.car}</span>
                </div>
                <div class="request-detail-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
                    </svg>
                    <span>${request.date}</span>
                </div>
            </div>
        `;
        requestsList.appendChild(requestCard);
    });
}

// Logout
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('userData');
        showSnackbar('Выход выполнен');
        setTimeout(() => {
            showScreen('loginScreen');
        }, 500);
    }
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', function() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        loadDashboard();
        showScreen('dashboardScreen');
    } else {
        showScreen('loginScreen');
    }
});