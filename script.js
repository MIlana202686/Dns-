document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Анимация карточек (Intersection Observer) ---
    const cards = document.querySelectorAll('.card, .product-card, .gallery-item');
    
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }); // <--- ЗАКРЫЛИ observer правильно

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // --- 2. Навбар при скролле ---
    const navbar = document.querySelector('.navbar');
    if (navbar) { // Проверка, существует ли навбар
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.background = '#ffffff';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // --- 3. Плавный скролл по якорям ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Игнорируем пустые ссылки
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Кнопки покупки ---
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Товар добавлен в корзину! (Это учебный пример)');
        });
    });

    // --- 5. Валидация формы ---
    // Получаем элементы внутри DOMContentLoaded, чтобы они точно существовали
    const form = document.getElementById('regForm');
    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const birthYearInput = document.getElementById('birthYear');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            clearErrors();

            let isValid = true; // <-- ОБЪЯВИЛИ переменную

            // Проверка Email
            // Сначала проверяем на пустоту, потом на формат
            if (!emailInput.value.trim()) {
                showError(emailInput, 'error-email', 'Поле не может быть пустым');
                isValid = false;
            } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                showError(emailInput, 'error-email', 'Введите корректный email (нужен @ и домен)');
                isValid = false;
            }

            // Проверка Кода
            const codeRegex = /^\d{6}$/;
            if (!codeRegex.test(codeInput.value)) {
                showError(codeInput, 'error-code', 'Код должен содержать ровно 6 цифр');
                isValid = false;
            }


            const currentYear = new Date().getFullYear();
            const yearValue = parseInt(birthYearInput.value);

            if (!birthYearInput.value) {
                showError(birthYearInput, 'error-birthYear', 'Укажите год рождения');
                isValid = false;
            } else if (isNaN(yearValue)) {
                 showError(birthYearInput, 'error-birthYear', 'Год должен быть числом');
                 isValid = false;
            } else if (yearValue > currentYear) {
                showError(birthYearInput, 'error-birthYear', 'Вы не можете родиться в будущем!');
                isValid = false;
            } else {
                const age = currentYear - yearValue;
                if (age < 18) {
                    showError(birthYearInput, 'error-birthYear', `Вам должно быть 18 лет. Сейчас вам примерно ${age}`);
                    isValid = false;
                } else if (age > 2010) {
                    showError(birthYearInput, 'error-birthYear', 'Неверный год рождения');
                    isValid = false;
                }
            }

            if (isValid) {
                alert('Успешная регистрация! Данные валидны.');
            }
        });
    }


    function showError(inputElement, errorId, message) {
        if (!inputElement) return;
        inputElement.classList.add('error');
        const errorDiv = document.getElementById(errorId);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    function clearErrors() {
        const inputs = document.querySelectorAll('#regForm input');
        const errors = document.querySelectorAll('#regForm .error-message');
        
        inputs.forEach(input => input.classList.remove('error'));
        errors.forEach(error => error.style.display = 'none');
    }
    

    document.querySelectorAll('#regForm input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if(errorMsg) errorMsg.style.display = 'none';
        });
    });
});