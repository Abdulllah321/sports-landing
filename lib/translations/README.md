# Multi-Language Support (AR/EN) - Server-Side Rendered

This implementation provides SEO-friendly, server-side rendered multi-language support for Arabic and English.

## Architecture

### Server-Side Rendering (SSR)
- **Translations are rendered on the server** for better SEO and performance
- **No client-side translation loading** - all text is pre-rendered
- **Proper HTML lang and dir attributes** set server-side

### Routing Structure
```
/ → redirects to /en
/en → English content
/ar → Arabic content
```

### Key Files

#### Server-Side
- `lib/server-translations.ts` - Server-side translation utilities
- `middleware.ts` - Handles locale routing and redirects
- `app/[locale]/layout.tsx` - Locale-specific layout
- `app/[locale]/page.tsx` - Locale-specific pages
- `components/*-server.tsx` - Server components with translations

#### Client-Side
- `lib/translation-context.tsx` - Language switching context (client-only)
- `components/language-switcher.tsx` - Language switcher component
- `components/mobile-menu.tsx` - Interactive mobile menu

## Usage

### Adding New Translations

1. Add keys to both `en.json` and `ar.json`:
```json
{
  "newSection": {
    "title": "New Section",
    "description": "Description text"
  }
}
```

2. Use in server components:
```tsx
import { getServerTranslation } from "@/lib/server-translations"

export function MyServerComponent({ locale }: { locale: Locale }) {
  const t = getServerTranslation(locale)
  
  return (
    <h1>{t('newSection.title')}</h1>
  )
}
```

3. Use in client components (for dynamic content):
```tsx
"use client"
import { useLanguage } from "@/lib/translation-context"

export function MyClientComponent() {
  const { locale } = useLanguage()
  // Use locale for conditional rendering or API calls
}
```

## SEO Benefits

- ✅ **Server-side rendered translations** - Search engines see translated content
- ✅ **Proper HTML lang attributes** - `lang="ar"` or `lang="en"`
- ✅ **RTL support** - `dir="rtl"` for Arabic
- ✅ **URL-based locales** - `/en/page` and `/ar/page`
- ✅ **Fast initial load** - No client-side translation loading

## Performance Benefits

- ✅ **No client-side translation bundles** - Smaller JavaScript
- ✅ **Pre-rendered content** - Faster First Contentful Paint
- ✅ **Proper font loading** - Arabic fonts loaded only when needed
- ✅ **Static generation ready** - Can be statically generated

## RTL Support

- Automatic `dir="rtl"` for Arabic
- Arabic fonts: Cairo (headings), Noto Sans Arabic (body)
- CSS classes: `font-arabic-heading`, `font-arabic-body`

## Language Switching

- Language switcher updates URL and reloads page
- Preserves current page path when switching languages
- User preference saved in localStorage