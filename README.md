# Найкращі практики в Emoji Match Game

## 1. Declarative Form Validation (React Hook Form + Yup)

Замість imperiативних перевірок через `if-else`, використано **схеми валідації Yup** з інтеграцією через `yupResolver`. Це забезпечує чистий, читабельний код з чіткими правилами валідації.

**Переваги:**
- **Декларативність** - правила описані окремо від логіки компонента
- **Повторне використання** - схеми можна застосовувати в різних формах
- **Автоматичні помилки** - генеруються на основі схеми
- **Типобезпека** - TypeScript перевіряє відповідність схеми типам

**Реалізація:**
```typescript
// SettingsForm.tsx
const schema: yup.ObjectSchema<GameSettings> = yup.object({
    pairsCount: yup.number()
        .required("Number of pairs is required")
        .min(3, "Minimum 3 pairs")
        .max(12, "Maximum 12 pairs")
        .integer("Must be a whole number"),
    flipSpeed: yup.number()
        .required("Flip speed is required")
        .min(500, "Minimum 500ms")
        .max(3000, "Maximum 3000ms"),
    theme: yup.mixed<"animals" | "food" | "nature">()
        .oneOf(["animals", "food", "nature"])
        .required("Theme is required")
}).required();
```

**Підключення до форми:**
* [SettingsForm.tsx](src/components/SettingsForm.tsx#L11-L28) - схема валідації
* [SettingsForm.tsx](src/components/SettingsForm.tsx#L33-L37) - інтеграція з useForm

---

## 2. Separation of Concerns - Presentational vs Container Components

Використано **розділення компонентів на презентаційні та контейнерні**. Презентаційні компоненти відповідають тільки за UI, а логіка винесена в сторінки-контейнери.

**Переваги:**
- **Повторне використання** - UI компоненти незалежні від бізнес-логіки
- **Легше тестування** - можна тестувати UI окремо від логіки
- **Чіткий розподіл відповідальності** - кожен компонент має одну мету
- **Простіший рефакторинг** - зміна логіки не впливає на UI

**Презентаційні компоненти (тільки UI):**
```typescript
// Button.tsx - чистий UI
interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button className="btn" onClick={onClick}>
            {text}
        </button>
    );
}

// Card.tsx - тільки відображення
interface CardProps {
    symbol: string;
    onClick: () => void;
    isFlipped: boolean;
}

export default function Card({ symbol, onClick, isFlipped }: CardProps) {
    return (
        <div
            className="card"
            onClick={onClick}
            style={{ cursor: isFlipped ? 'default' : 'pointer' }}
        >
            {symbol}
        </div>
    );
}

// Grid.tsx - компонує Cards, але не має власної логіки
export default function Grid({ cards, flipped, solved, onCardClick }: GridProps) {
    return (
        <div className="grid">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    symbol={flipped.includes(card.id) || solved.includes(card.id) ? card.emoji : "❓"}
                    onClick={() => onCardClick(card.id)}
                    isFlipped={flipped.includes(card.id) || solved.includes(card.id)}
                />
            ))}
        </div>
    );
}
```

**Контейнерні компоненти (логіка + state):**
```typescript
// GamePage.tsx - містить всю ігрову логіку
export default function GamePage({ emojis, flipSpeed }: GamePageProps) {
    const [showWinModal, setShowWinModal] = useState(false);
    const { cards, flipped, solved, moves, time, flipCard, /* ... */ } = useGameStore();
    
    // Вся логіка гри
    useEffect(() => { /* ініціалізація */ }, [emojis]);
    useEffect(() => { /* таймер */ }, [cards, solved]);
    useEffect(() => { /* перевірка пар */ }, [flipped]);
    
    const handleCardClick = (id: number) => {
        // Складна логіка обробки кліку
    };
    
    // Рендер використовує презентаційні компоненти
    return (
        <div>
            <Header title="🎮 Game Time!" />
            <Grid cards={cards} flipped={flipped} solved={solved} onCardClick={handleCardClick} />
            <WinModal /* ... */ />
        </div>
    );
}
```

**Файли:**
* Презентаційні: [Button.tsx](src/components/Button.tsx), [Card.tsx](src/components/Card.tsx), [Grid.tsx](src/components/Grid.tsx), [Header.tsx](src/components/Header.tsx)
* Контейнерні: [GamePage.tsx](src/pages/GamePage.tsx), [StartPage.tsx](src/pages/StartPage.tsx), [UserProfilePage.tsx](src/pages/UserProfilePage.tsx)

---

## 3. Data-Driven UI через Constants

Використано **централізовані константи** для даних, які керують UI, замість hardcode значень в компонентах. Це забезпечує єдине джерело правди (Single Source of Truth).

**Переваги:**
- **Легке оновлення** - зміна в одному місці впливає на весь додаток
- **Масштабованість** - легко додавати нові теми/емодзі
- **Типобезпека** - TypeScript перевіряє використання констант
- **Чистий код** - компоненти не захаращені даними

**Реалізація констант:**
```typescript
// constants/emojiThemes.ts
export const emojiThemes = {
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🦁", "🐯", "🐮"],
    food: ["🍎", "🍌", "🍇", "🍓", "🍉", "🍊", "🍋", "🥝", "🍒", "🥑", "🌽", "🥕"],
    nature: ["🌸", "🌺", "🌻", "🌷", "🌹", "🌴", "🌲", "🍀", "🌿", "🌾", "🌵", "🍁"]
};
```

**Використання в компонентах:**
```typescript
// App.tsx - вибір емодзі на основі налаштувань
import { emojiThemes } from "./constants/emojiThemes";

function App() {
    const { settings } = useSettingsStore();
    const emojis = emojiThemes[settings.theme].slice(0, settings.pairsCount);
    
    return (
        <Routes>
            <Route
                path="/game"
                element={<GamePage emojis={emojis} flipSpeed={settings.flipSpeed} />}
            />
        </Routes>
    );
}
```

**Типобезпека через union types:**
```typescript
// settingsStore.ts
export interface GameSettings {
    pairsCount: number;
    flipSpeed: number;
    theme: "animals" | "food" | "nature"; // TypeScript перевірить існування теми
}

// SettingsForm.tsx - всі теми прив'язані до констант
<select {...register("theme")} className="form-select">
    <option value="animals">Animals 🐾</option>
    <option value="food">Food 🍎</option>
    <option value="nature">Nature 🌿</option>
</select>
```

**Легке розширення:**
```typescript
// Додавання нової теми - зміна в одному файлі
export const emojiThemes = {
    animals: [/* ... */],
    food: [/* ... */],
    nature: [/* ... */],
    sports: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏓", "🏸", "🥊", "🎱", "🏒", "🏑"]
};

theme: "animals" | "food" | "nature" | "sports"
```

**Файли:**
* [emojiThemes.ts](src/constants/emojiThemes.ts) - централізовані дані
* [App.tsx](src/App.tsx#L13) - використання констант
* [settingsStore.ts](src/store/settingsStore.ts#L6) - типізація тем

---

## 4. React Router для декларативної навігації

Використано **React Router v6** для організації маршрутизації з декларативним підходом через JSX та хуки для програмної навігації.

**Переваги:**
- **Декларативність** - маршрути описані як React компоненти
- **Хуки для навігації** - `useNavigate()` замість императива
- **Параметри URL** - `useParams()` для динамічних маршрутів
- **Fallback маршрути** - автоматичний редирект для 404

**Структура маршрутів:**
```typescript
// App.tsx
<BrowserRouter>
    <div className="app">
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
                path="/game"
                element={<GamePage emojis={emojis} flipSpeed={settings.flipSpeed} />}
            />
            <Route path="/user/:userId" element={<UserProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
</BrowserRouter>
```

**Програмна навігація через хук:**
```typescript
// StartPage.tsx
const navigate = useNavigate();

const handleStart = (newSettings: GameSettings) => {
    updateSettings(newSettings);
    navigate("/game"); // Програмний перехід
};

const handleViewProfile = () => {
    navigate(`/user/${userId}`);
};
```

**Динамічні параметри URL:**
```typescript
// UserProfilePage.tsx
const { userId: paramUserId } = useParams<{ userId: string }>();

useEffect(() => {
    if (paramUserId && paramUserId !== userId) {
        setUserId(paramUserId);
        loadUserData(paramUserId);
    }
}, [paramUserId]);
```

**Файли:**
* [App.tsx](src/App.tsx#L16-L32) - конфігурація маршрутів
* [StartPage.tsx](src/pages/StartPage.tsx#L9) - використання useNavigate
* [GamePage.tsx](src/pages/GamePage.tsx#L15) - навігація в компоненті
* [UserProfilePage.tsx](src/pages/UserProfilePage.tsx#L8) - useParams для ID

---

## 5. Custom Hooks Pattern для переповторюваної логіки

У проекті активно використовується патерн **React Hook Form**, який є прикладом custom hook для інкапсуляції складної логіки форм.

**Переваги:**
- **Інкапсуляція логіки** - вся робота з формою в одному місці
- **Повторне використання** - один хук для різних форм
- **Декларативний API** - `register`, `handleSubmit`, `watch`
- **Оптимізація ре-рендерів** - мінімальні перемальовування

**Використання хуку форми:**
```typescript
// SettingsForm.tsx
const {
    register,        // Реєстрація полів
    handleSubmit,    // Обробка submit
    watch,           // Відстеження змін
    formState: { errors }  // Стан помилок
} = useForm<GameSettings>({
    resolver: yupResolver(schema),
    defaultValues: initialSettings
});

const flipSpeed = watch("flipSpeed"); // Реактивне значення для UI
```

**Реєстрація полів через spread:**
```typescript
<input
    type="number"
    {...register("pairsCount", { valueAsNumber: true })}
    className="form-input"
/>

<input
    type="range"
    {...register("flipSpeed", { valueAsNumber: true })}
    className="form-range"
/>

<select {...register("theme")} className="form-select">
    <option value="animals">Animals 🐾</option>
    <option value="food">Food 🍎</option>
    <option value="nature">Nature 🌿</option>
</select>
```

**Обробка submit:**
```typescript
<form onSubmit={handleSubmit(onSubmit)} className="settings-form">
    {/* Поля форми */}
</form>
```

**Автоматичне відображення помилок:**
```typescript
{errors.pairsCount && (
    <span className="error">{errors.pairsCount.message}</span>
)}
{errors.flipSpeed && (
    <span className="error">{errors.flipSpeed.message}</span>
)}
```

**Файли:**
* [SettingsForm.tsx](src/components/SettingsForm.tsx#L32-L37) - використання useForm
* [SettingsForm.tsx](src/components/SettingsForm.tsx#L39) - watch для реактивності
* [SettingsForm.tsx](src/components/SettingsForm.tsx#L48-L52) - register для полів
* [SettingsForm.tsx](src/components/SettingsForm.tsx#L42) - handleSubmit

---