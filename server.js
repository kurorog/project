const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();

// Улучшенная "база данных" в памяти с дополнительными полями
const usersDB = {
    'admin': {
        password: bcrypt.hashSync('12345', 10),
        email: 'admin@example.com',
        createdAt: new Date(),
        lastLogin: null
    }
};

// Middleware с улучшенной обработкой CORS и безопасности
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Улучшенная настройка сессии
app.use(session({
    name: 'auth.sid', // Четкое имя cookie
    secret: process.env.SESSION_SECRET || 'your_strong_secret_here', // Лучше использовать переменные окружения
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Автоматическое переключение для production
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 часа
    }
}));

// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
});

// Маршруты с улучшенной обработкой ошибок

// Установка темы
app.post('/theme', (req, res) => {
    try {
        const { theme } = req.body;
        if (!theme || !['light', 'dark'].includes(theme)) {
            return res.status(400).json({ success: false, message: 'Некорректная тема' });
        }

        res.cookie('theme', theme, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        res.json({ success: true });
    } catch (err) {
        console.error('Theme error:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Валидация входных данных
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Логин и пароль обязательны' 
            });
        }
        
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ 
                success: false, 
                message: 'Логин должен быть от 3 до 20 символов' 
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Пароль должен быть не менее 6 символов' 
            });
        }
        
        if (usersDB[username]) {
            return res.status(409).json({ 
                success: false, 
                message: 'Пользователь уже существует' 
            });
        }
        
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Сохранение пользователя
        usersDB[username] = {
            password: hashedPassword,
            email: `${username}@example.com`,
            createdAt: new Date(),
            lastLogin: null
        };
        
        console.log(`Зарегистрирован новый пользователь: ${username}`);
        res.status(201).json({ success: true });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка при регистрации' 
        });
    }
});

// Аутентификация пользователя
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Базовые проверки
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Логин и пароль обязательны' 
            });
        }
        
        // Проверка существования пользователя
        const user = usersDB[username];
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Неверные учетные данные' // Общее сообщение для безопасности
            });
        }
        
        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Неверные учетные данные' 
            });
        }
        
        // Обновление времени последнего входа
        user.lastLogin = new Date();
        
        // Создание сессии
        req.session.user = { 
            username,
            email: user.email
        };
        
        console.log(`Успешный вход пользователя: ${username}`);
        res.json({ 
            success: true,
            user: {
                username,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка сервера' 
        });
    }
});

// Проверка аутентификации
app.get('/check-auth', (req, res) => {
    try {
        if (req.session.user) {
            return res.json({ 
                authenticated: true, 
                user: req.session.user 
            });
        }
        res.json({ authenticated: false });
    } catch (err) {
        console.error('Check auth error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка сервера' 
        });
    }
});

// Выход из системы
app.post('/logout', (req, res) => {
    try {
        const username = req.session.user?.username;
        
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json({ success: false });
            }
            
            res.clearCookie('auth.sid');
            console.log(`Пользователь вышел из системы: ${username || 'unknown'}`);
            res.json({ success: true });
        });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка сервера' 
        });
    }
});

// Получение данных пользователя
app.get('/api/data', (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ 
                error: 'Требуется авторизация' 
            });
        }
        
        const userData = usersDB[req.session.user.username];
        if (!userData) {
            return res.status(404).json({ 
                error: 'Данные пользователя не найдены' 
            });
        }
        
        res.json({
            username: req.session.user.username,
            email: req.session.user.email,
            createdAt: userData.createdAt,
            lastLogin: userData.lastLogin
        });
    } catch (err) {
        console.error('API data error:', err);
        res.status(500).json({ 
            error: 'Ошибка сервера' 
        });
    }
});

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Маршрут не найден' 
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Внутренняя ошибка сервера' 
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные пользователи:');
    console.log('- admin / 12345');
    console.log('\nДля регистрации новых пользователей используйте /register');
});