export interface LanguageData {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  isDefault: boolean;
}

export const LANGUAGES_DATA: LanguageData[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    isActive: true,
    isDefault: true,
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isActive: true,
    isDefault: false,
  },
];
