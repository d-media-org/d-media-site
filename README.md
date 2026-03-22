## d . media - site

Официалният уеб проект на `d . media`, изграден с `Next.js` според брандбука на бранда.

## Local Development

Стартиране на локален development server:

```bash
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000), за да видиш сайта локално.

Основните route-ове са:
- `/`
- `/projects`
- `/services`
- `/about`

Типографията използва локални файлове от `Panton`.

## Build

```bash
npm run build
```

## Deploy

Препоръчителният deploy target е `Vercel`, след което домейнът `d-media.org` може да бъде вързан през `Cloudflare DNS`.

## Notes

- брандът винаги се изписва като `d . media`
- използва се само `Panton`
- визуалната система следва монохромната рамка от brand book-а
