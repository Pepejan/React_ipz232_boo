# System Specification Document
## Emoji Match – гра на запам'ятовування

**Версія:** 1.0  
**Дата:** 03.05.2026  
**Автор:** Бондарчук Олександр, група ІПЗ-23-2

---

## 1. Що за проєкт

Emoji Match  браузерна гра на пам'ять. Перевертаєш картки, шукаєш пари емодзі. React + TypeScript, збирається через Vite. Бекенду немає  всі дані в localStorage.

---

## 2. Стек

- **React 19** + TypeScript
- **Zustand** стейт менеджмент
- **React Router DOM**  маршрутизація
- **React Hook Form + Yup**  форма налаштувань з валідацією
- **Vite** збірка
- **Vitest** юніт-тести
- **Playwright** e2e тести
- **Storybook** перегляд компонентів ізольовано
- **TypeDoc** документація з JSDoc

---

## 3. Структура

```
src/
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── CookieBanner.tsx
│   ├── Grid.tsx
│   ├── Header.tsx
│   ├── Modal.tsx
│   ├── SettingsForm.tsx
│   └── WinModal.tsx
├── constants/
│   └── emojiThemes.ts
├── pages/
│   ├── StartPage.tsx
│   ├── GamePage.tsx
│   ├── ResultPage.tsx
│   └── UserProfilePage.tsx
├── store/
│   ├── gameStore.ts
│   ├── settingsStore.ts
│   ├── userStore.ts
│   └── index.ts
├── utils/
│   └── validation.ts
└── App.tsx
```

---

## 4. Маршрути

| Шлях | Сторінка | Призначення |
|------|----------|-------------|
| `/` | StartPage | Форма налаштувань, старт гри |
| `/game` | GamePage | Ігровий процес |
| `/result` | ResultPage | Підсумковий екран |
| `/user/:userId` | UserProfilePage | Статистика гравця |

---

## 5. Стан (Zustand stores)

Три стори, кожен відповідає за свою область:

**gameStore** поточна гра: масив карток, які перевернуті, які вже знайдені, лічильник ходів, таймер. Не персистується  після перезавантаження сторінки незакінчена гра не відновлюється.

**settingsStore** налаштування: кількість пар (3–12), час затримки (500–3000 мс), тема емодзі. Зберігається в `emoji-match-settings`.

**userStore** профіль і список ігор. Кожна завершена гра записується з кількістю ходів, часом, датою і розміром поля. Підтримує кілька профілів  дані кожного в окремих ключах.

---

## 6. Компоненти

**Card** одна картка. Отримує `isFlipped` і `isSolved`, на їх основі застосовуються CSS-класи. Клік пробрасується через `onClick(id)`.

**Grid** сітка карток. Колонки адаптуються під кількість пар через CSS grid.

**SettingsForm**  три поля: пари, затримка, тема. Валідація через Yup схему. Після сабміту викликає `onSubmit(settings)`.

**WinModal** з'являється коли `solved.length === cards.length`. Показує ходи і час.

**CookieBanner** банер згоди, відображається один раз. Відповідь пишеться в localStorage.

---

## 7. Ігровий флоу

1. Гравець відкриває `/`  бачить SettingsForm
2. Заповнює форму, тисне "Start"  налаштування зберігаються, редірект на `/game`
3. `initializeGame` перемішує емодзі, генерує масив `[emoji, emoji] × pairsCount`
4. Клік на картку → `flipCard(id)`, картка перевертається
5. Коли перевернуто 2:
   - Однакові → `markAsSolved`, залишаються відкритими
   - Різні → через `flipSpeed` мс → `unflipCards`
6. `incrementMoves` після кожної пари спроб
7. Коли `solved.length === cards.length` → `setGameActive(false)`, WinModal
8. `addGameResult` записує результат, перехід на `/result`

---

## 8. localStorage

| Ключ | Вміст |
|------|-------|
| `emoji-match-settings` | Налаштування (JSON) |
| `emoji-match-user` | Стан userStore (JSON) |
| `user_<id>_games` | Масив ігор гравця |
| `user_<id>_name` | Ім'я гравця |
| `cookie-consent` | Відповідь на банер |

---

## 9. Нефункціональне

- Vite-білд оптимізований, завантажується швидко
- Після першого завантаження працює офлайн
- Адаптивна верстка від 375px
- Підтримуються останні версії Chrome, Firefox, Safari, Edge
- Жодних зовнішніх запитів  дані не покидають браузер

---

## 10. Тести

- **Vitest** юніт-тести для store логіки і утиліт
- **Playwright** e2e, перевіряє реальний ігровий флоу
- **Storybook** ручний огляд компонентів в ізоляції
