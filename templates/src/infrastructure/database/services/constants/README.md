# Константы для сидинга данных

Эта папка содержит константы для заполнения базы данных начальными данными.

## Структура

- `index.ts` - экспорт всех констант
- `languages.constants.ts` - данные языков (английский, немецкий)
- `regular-verbs.constants.ts` - данные правильных глаголов
- `irregular-verbs.constants.ts` - данные неправильных глаголов
- `modal-verbs.constants.ts` - данные модальных глаголов
- `nouns.constants.ts` - данные существительных A1/A2 уровня
- `adjectives.constants.ts` - данные прилагательных A1/A2 уровня
- `adverbs.constants.ts` - данные наречий A1/A2 уровня
- `phrases.constants.ts` - данные фраз A1/A2 уровня

## Использование

Константы используются в сервисе сидинга для заполнения базы данных начальными данными.

### Стратегия сидинга

1. **Сначала создаются языки** - используются данные из `languages.constants.ts`
2. **Кэшируются ID языков** - для быстрого доступа при создании карточек
3. **Создаются карточки** - с привязкой к ID языка

### Пример использования

```typescript
import { REGULAR_VERBS_DATA, IRREGULAR_VERBS_DATA } from './constants';

// 1. Инициализация кэша языков
const languageIds: Record<string, string> = {};

async function getLanguageIdByCode(code: string): Promise<string> {
  if (languageIds[code]) {
    return languageIds[code];
  }

  const language = await prisma.language.findUnique({
    where: { code },
    select: { id: true },
  });

  if (!language) {
    throw new Error(`Language with code '${code}' not found`);
  }

  languageIds[code] = language.id;
  return language.id;
}

// 2. Создание карточки
const englishId = await getLanguageIdByCode('en');

await prisma.card.create({
  data: {
    wordOrPhrase: 'house',
    slug: 'house',
    languageId: englishId, // Используем ID языка
    level: 'A1',
    partOfSpeech: 'NOUN',
    // ... другие поля
  },
});
```

### Порядок сидинга

1. **Языки** (`languages.constants.ts`)
2. **Глаголы** (`regular-verbs.constants.ts`, `irregular-verbs.constants.ts`, `modal-verbs.constants.ts`)
3. **Существительные** (`nouns.constants.ts`)
4. **Прилагательные** (`adjectives.constants.ts`)
5. **Наречия** (`adverbs.constants.ts`)
6. **Фразы** (`phrases.constants.ts`)

## Форматы данных

### RegularVerbData

```typescript
interface RegularVerbData {
  wordOrPhrase: string; // "work"
  slug: string; // "work"
  transcription: string; // "wɜːk"
  translation: string; // "работать"
  level: LanguageLevel; // A1 или A2
  difficulty: CardDifficulty; // EASY/MEDIUM
  frequency: number; // 1-10
}
```

### IrregularVerbData

```typescript
interface IrregularVerbData {
  infinitive: string; // "go"
  pastSimple: string; // "went"
  pastParticiple: string; // "gone"
  translation: string; // "идти"
  level: LanguageLevel; // A1 или A2
  frequency: number; // 1-10
  difficulty: number; // 1-10
}
```

### LanguageData

```typescript
interface LanguageData {
  code: string; // "en", "de"
  name: string; // "English", "German"
  nativeName: string; // "English", "Deutsch"
  flag: string; // "🇺🇸", "🇩🇪"
  isActive: boolean; // true/false
  isDefault: boolean; // true/false
}
```
