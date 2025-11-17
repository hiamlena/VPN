# VPN Deployment Assistant

Современное React/Vite приложение для генерации детальных планов развёртывания корпоративного VPN на базе WireGuard с помощью Gemini API. Поддерживает адаптивный UI на Chakra UI, историю запросов и форматирование Markdown.

## Требования
- Node.js 20+
- npm 10+
- Аккаунт Google AI Studio и действующий API-ключ Gemini

## Установка
```bash
npm install
```

## Скрипты
- `npm run dev` — локальная разработка
- `npm run build` — продакшн-сборка
- `npm run preview` — предпросмотр собранной версии
- `npm run lint` — строгий ESLint
- `npm run format` — форматирование Prettier

## Запуск разработки
```bash
npm run dev
```
Откройте `http://localhost:5173`.

## Сборка
```bash
npm run build
```
Артефакты будут в `dist/`.

## Деплой
Рекомендуемый вариант — **Vercel**:
1. Создайте проект на Vercel и импортируйте репозиторий.
2. Добавьте переменные окружения (см. ниже).
3. Build command: `npm run build`, Output: `dist`.

Альтернатива — GitHub Pages + GitHub Actions (нужно задать `base` в `vite.config.ts`).

## Переменные окружения
Создайте `.env` (пример в `.env.example`):
```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_MODEL=gemini-2.0-flash
```

## Структура проекта
```
src/
  components/      // UI-компоненты и атомарные блоки
  modules/         // доменные модули (AI, история)
  pages/           // страницы приложения
  services/        // внешние API-клиенты
  hooks/           // кастомные хуки
  utils/           // утилиты и хэндлеры ошибок
  styles/          // тема и глобальные стили
  types/           // типы и интерфейсы
```

## Особенности
- Чистая архитектура: UI, сервисы и доменная логика разделены.
- Строгий TypeScript, без `any`.
- Адаптивный UI на Chakra UI, тёмная тема по умолчанию.
- История запросов в LocalStorage, быстрый откат результата.
- Markdown-рендер и быстрые копирования текста.
- Husky pre-commit запускает ESLint.

## Пример использования
1. Укажите запрос и (опционально) название компании.
2. Нажмите «Сгенерировать план».
3. Изучите секции результата, используйте копирование и историю.

