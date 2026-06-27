# Project

## Purpose
Explain what the repository represents and how the current website is organized.

## Scope
Covers project identity, public URLs, current stack, navigation, services, languages, and known repository boundaries.

## Rules
- Describe the project as the official website of `d . media`.
- Treat the production site as the static Astro implementation in `astro/`.
- Treat root Next.js files as present in the repository but not the current Cloudflare production path unless a human validates otherwise.
- Use Bulgarian as the default locale and English under `/en/`.
- Keep service names aligned with `astro/src/lib/site-content.ts`.

## Project Summary
`d . media` is a digital studio based in Sofia, Bulgaria. The site presents brand identity, content, social media, web, SEO/GEO, performance, technical support, graphic design, advertising, projects, pricing, estimator, blog, policies, and contact information.

Current public URLs listed in repository documentation:
- `https://www.d-media.org`
- `https://d-media.org`
- Preview alias: `https://preview.d-media-site.pages.dev`

## Current Navigation
Main navigation is defined in `astro/src/lib/site-content.ts`.

Bulgarian:
- Начало
- Услуги
- Проекти
- Цени
- Оценка на проект
- Блог
- За бранда
- Контакти

English:
- Home
- Services
- Projects
- Pricing
- Estimator
- Blog
- About
- Contacts

## Services
Repository service content includes:
- Brand Identity / Бранд идентичност
- Content Creation / Създаване на съдържание
- Social Media Management / Управление на социални медии
- Web Design and Development / Уеб дизайн и разработка
- Technical SEO / Техническо SEO
- GEO and AI Visibility / GEO и AI видимост
- Performance Optimization / Оптимизация на скоростта
- Technical Support / Техническа поддръжка
- Graphic Design / Графичен дизайн
- Advertising / Реклама
- Additional Charges and Rights / Допълнителни начисления и права

## Examples
- A route such as `/services/brand-identity/` has a corresponding English route under `/en/services/brand-identity/`.
- Contact data currently appears in `astro/src/lib/site-content.ts`: `contact@d-media.org`, `0892 494 495`.
- Social links include Instagram, Behance, LinkedIn, TikTok, and YouTube.

## Related documents
- `02-BRAND.md`
- `06-CONTENT.md`
- `10-ARCHITECTURE.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
