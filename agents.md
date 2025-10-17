# Cursor AI Agent Configuration

## Project Overview
This is a Next.js sports platform (Ficro) with internationalization support, built for investor demos. The platform includes academies, tournaments, facilities, player management, and various sports-related features.

## Development Environment Tips

### Package Manager
- **Use Bun instead of npm** for all commands
  - `bun install` instead of `npm install`
  - `bun run dev` instead of `npm run dev`
  - `bun add` instead of `npm install`
  - `bun remove` instead of `npm uninstall`

### UI Components
- **Use Shadcn UI** for most UI components
  - Prefer Shadcn components over custom implementations
  - Use `npx shadcn-ui@latest add [component]` to add new components
  - Follow Shadcn patterns for consistency
  - Components are located in `components/ui/`

### Code Organization
- **Split pages into proper components** for cleaner code
  - Server components for data fetching and static content
  - Client components for interactive features
  - Separate concerns: `-server.tsx` and `-client.tsx` files
  - Use proper folder structure: `components/pages/`, `components/player/`, `components/common/`

### Internationalization
- **Always use translation functions** instead of hardcoded text
  - Use `t('key')` for client components with `getClientTranslation(locale)`
  - Use `getServerTranslationWithLocale()` for server components
  - Add new keys to both `lib/translations/en.json` and `lib/translations/ar.json`
  - Follow the pattern: `t('section.key')` (e.g., `t('nav.menu')`)
  - Use `useLanguage()` hook for accessing locale and setLocale
  - Translation files are properly aligned with comprehensive coverage

## Development Guidelines

### Component Creation
1. **Server Components**: For data fetching, static content
2. **Client Components**: For interactivity, state management
3. **Proper separation**: Use `"use client"` directive only when needed
4. **Translation support**: Always use translation functions

### Styling
- **Tailwind CSS** for utility classes
- **CSS variables** for theme customization
- **Responsive design** with mobile-first approach
- **Dark/light mode** support with proper theming

### State Management
- **React hooks** for local state
- **Context providers** for global state
- **Server state** with Next.js data fetching
- **Client state** with useState, useEffect

### Form Submission
- **Form** use there zod and react-hook-form with proper form validation 
## Common Patterns

### Page Structure
```tsx
// app/page.tsx
import { HomePageServer } from "@/components/pages/home-page-server"

export default function HomePage() {
  return <HomePageServer />
}

// components/pages/home-page-server.tsx
import { getServerTranslationWithLocale } from "@/components/locale-provider-server"
import { HomePageClient } from "./home-page-client"

export async function HomePageServer() {
  const { t, locale } = await getServerTranslationWithLocale()
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <HomePageClient locale={locale} />
    </div>
  )
}
```

### Translation Usage
```tsx
// Client component
import { useLanguage } from "@/lib/translation-context"
import { getClientTranslation } from "@/lib/client-translations"

export function MyComponent() {
  const { locale } = useLanguage()
  const t = getClientTranslation(locale)
  
  return <h1>{t('section.title')}</h1>
}

// Server component
import { getServerTranslationWithLocale } from "@/lib/locale-provider-server"

export async function MyServerComponent() {
  const { t } = await getServerTranslationWithLocale()
  
  return <h1>{t('section.title')}</h1>
}

// Language switching
import { useLanguage } from "@/lib/translation-context"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  
  return (
    <button onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}>
      {locale === 'en' ? 'العربية' : 'English'}
    </button>
  )
}
```

### Component Organization
```tsx
// components/pages/feature-page-server.tsx
export async function FeaturePageServer() {
  // Server logic, data fetching
}

// components/pages/feature-page-client.tsx
"use client"
export function FeaturePageClient({ locale }: { locale: Locale }) {
  // Client logic, interactivity
}
```

## File Naming Conventions

- **Server components**: `*-server.tsx`
- **Client components**: `*-client.tsx`
- **Page components**: `*-page-server.tsx`, `*-page-client.tsx`
- **Feature components**: `feature-*.tsx`
- **UI components**: Follow Shadcn patterns

## Translation Keys Structure

### Available Translation Files
- **`lib/translations/en.json`** - Complete English translations
- **`lib/translations/ar.json`** - Complete Arabic translations
- **Properly aligned** with comprehensive coverage
- **Well-structured keys** with proper nesting

### Key Structure Examples
```json
{
  "nav": {
    "menu": "Menu",
    "about": "About Us",
    "player": "Player",
    "tournaments": "Tournaments"
  },
  "hero": {
    "title": "Train. Book. Compete.",
    "description": "Reserve fields, explore tournaments...",
    "stats": {
      "players": "Players Registered",
      "tournaments": "Tournaments Run"
    }
  },
  "academies": {
    "hero": {
      "title": "Sports Academies",
      "description": "Join elite sports academies..."
    },
    "packages": {
      "bronze": {
        "title": "Bronze Package",
        "description": "Perfect for beginners..."
      }
    }
  }
}
```

### Adding New Translations
1. **Add to both files** - Always update both `en.json` and `ar.json`
2. **Follow nesting pattern** - Use proper key structure
3. **Test both languages** - Ensure RTL support for Arabic
4. **Use consistent naming** - Follow existing patterns

## Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Add Shadcn component
bunx shadcn-ui@latest add [component-name]

# Build for production
bun run build

# Start production server
bun run start
```

## Best Practices

1. **Always use translations** - Never hardcode text
2. **Split components properly** - Server vs Client separation
3. **Use Shadcn UI** - Consistent component library
4. **Follow naming conventions** - Clear file organization
5. **Mobile-first design** - Responsive layouts
6. **Accessibility** - Proper ARIA labels and keyboard navigation
7. **Performance** - Optimize images, lazy loading
8. **SEO** - Proper meta tags and structured data

## Common Issues & Solutions

### Hydration Errors
- Use `suppressHydrationWarning` for expected mismatches
- Ensure server/client component separation
- Check for browser-specific code in server components

### Translation Issues
- Always add keys to both `en.json` and `ar.json` files
- Use proper key structure: `section.subsection.key`
- Check for missing translation keys
- Ensure RTL support for Arabic translations
- Test language switching with `useLanguage()` hook
- Use `getClientTranslation(locale)` for client components
- Use `getServerTranslationWithLocale()` for server components

### Styling Issues
- Use Tailwind classes consistently
- Check CSS variable definitions in `globals.css`
- Ensure proper theme integration

## Notes for AI Assistant

- This is a **sports platform** for **investor demos**
- Focus on **professional appearance** and **user experience**
- Use **modern design patterns** and **best practices**
- Ensure **accessibility** and **performance**
- Maintain **consistency** across all components
- Always consider **mobile responsiveness**
- Implement **proper error handling**
- Follow **Next.js 15 App Router** patterns
