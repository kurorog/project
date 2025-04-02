document.addEventListener('DOMContentLoaded', () => {
    // Элементы интерфейса
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const errorMessage = document.getElementById('error-message');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const registerBtn = document.getElementById('register-btn');
    const registrationSection = document.getElementById('registration-section');
    const registerErrorMessage = document.getElementById('register-error-message');
    const registerSubmitBtn = document.getElementById('register-submit-btn');
    const dataContainer = document.getElementById('data-container');

    // Инициализация темы
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeButtonText(savedTheme);
        updateThemeStyles();
    }

    // Обновление текста кнопки темы
    function updateThemeButtonText(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема';
        }
    }

    // Обновление дополнительных стилей для темы
    function updateThemeStyles() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        // Здесь можно добавить дополнительные стилевые обновления
    }

    // Обработчик переключения темы
    function handleThemeToggle() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButtonText(newTheme);
        updateThemeStyles();
        
        fetch('/theme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme: newTheme }),
            credentials: 'include'
        }).catch(error => {
            console.error('Ошибка сохранения темы:', error);
            showError('Не удалось сохранить тему');
        });
    }

    // Показать ошибку
    function showError(message, isRegister = false) {
        const element = isRegister ? registerErrorMessage : errorMessage;
        element.textContent = message;
        element.classList.remove('hidden');
        setTimeout(() => {
            element.classList.add('hidden');
        }, 3000);
    }

    // Проверка авторизации
    async function checkAuth() {
        try {
            const response = await fetch('/check-auth', {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.authenticated) {
                document.getElementById('username-display').textContent = data.user.username;
                authSection.classList.add('hidden');
                profileSection.classList.remove('hidden');
                loadData();
            }
        } catch (err) {
            console.error('Ошибка проверки авторизации:', err);
        }
    }

    // Загрузка данных
    async function loadData() {
        try {
            const response = await fetch('/api/data', {
                credentials: 'include'
            });
            const data = await response.json();
            
            dataContainer.innerHTML = `
                <h3>Данные пользователя</h3>
                <p><strong>Имя:</strong> ${data.username || 'Нет данных'}</p>
                <p><strong>Email:</strong> ${data.email || 'Нет данных'}</p>
                <p><strong>Последний вход:</strong> ${new Date(data.lastLogin).toLocaleString() || 'Нет данных'}</p>
            `;
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
        }
    }

    // Обработчики событий
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }

    registerBtn?.addEventListener('click', () => {
        registrationSection.classList.toggle('hidden');
    });

    registerSubmitBtn?.addEventListener('click', async () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                registrationSection.classList.add('hidden');
                showError('Регистрация успешна! Пожалуйста, войдите.', false);
            } else {
                showError(data.message || 'Ошибка регистрации', true);
            }
        } catch (err) {
            showError('Ошибка соединения', true);
        }
    });

    loginBtn?.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                checkAuth();
            } else {
                showError(data.message || 'Неверные учетные данные', false);
            }
        } catch (err) {
            showError('Ошибка соединения', false);
        }
    });

    logoutBtn?.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                authSection.classList.remove('hidden');
                profileSection.classList.add('hidden');
                dataContainer.innerHTML = '';
            }
        } catch (err) {
            showError('Ошибка при выходе', false);
        }
    });

    // Инициализация
    initTheme();
    checkAuth();
});