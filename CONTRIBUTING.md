# Contributing

## Перед стартом
- Используйте Node.js 20+ и npm 10+.
- Установите зависимости: `npm install`.
- Создайте `.env` с ключом `VITE_GEMINI_API_KEY`.

## Код-стайл
- Строгий TypeScript, без `any`.
- Используем ESLint + Prettier (`npm run lint`, `npm run format`).
- Импорты сортируются `simple-import-sort`.
- Не храните бизнес-логику в компонентах — переносите в `services`, `modules`, `utils`.

## Коммиты
- Husky запускает `npm run lint` на pre-commit.
- Сообщения в commit в формате `type: message` (например, `feat: add history drawer`).

## Pull Request
- Описывайте изменения и проверенные команды.
- Добавляйте ссылки на связанные задачи.
- Убедитесь, что сборка проходит: `npm run build`.

