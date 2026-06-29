# d . media Knowledge Base Master Content Plan

## Purpose

Този документ е окончателният Master Content Plan за публичната `d . media Knowledge Base`.

Knowledge Base е постоянна техническа база знания, а не блог, ферма за SEO съдържание или маркетинг секция. Съдържанието трябва да бъде готово за публикуване, доказуемо, редакторски проверено и свързано в ясна тематична архитектура.

## Architecture

- Публичен индекс: `/knowledge-base/`
- Път на статия: `/knowledge-base/[slug]/`
- Източник на съдържание: `astro/src/content/knowledge-base/*.md`
- Основен език: Bulgarian
- Типове статии: `pillar`, `supporting`
- Автор: `d . media`

## Required Article Contract

Всяка статия трябва да съдържа:

- Introduction
- Table of Contents
- Definitions
- Historical Context
- Core Concepts
- Technical Explanation
- Business Perspective
- Practical Examples
- Real Case Studies
- Comparisons
- Advantages
- Limitations
- Common Mistakes
- Best Practices
- Step-by-step Implementation
- Decision Framework
- Production Checklist
- Extended FAQ
- Summary
- Suggested Internal Links
- Авторitative External References

## Categories, Clusters, Pillars and Supporting Articles

### 1. Брандинг

Основна статия: `branding`

Поддържащи статии:

- `brand-platform`
- `brand-positioning`
- `brand-personality`
- `brand-voice`
- `brand-architecture`
- `brand-audit`
- `brand-guidelines`
- `brand-consistency`
- `brand-measurement`

Зависимости: `brand-platform` преди `brand-positioning`; `brand-guidelines` след `brand-identity`.

Вътрешни връзки: всички поддържащи статии водят към `branding`; `branding` води към `brand-strategy`, `brand-identity`, `content-architecture`.

### 2. Бранд стратегия

Основна статия: `brand-strategy`

Поддържащи статии:

- `market-positioning`
- `audience-research`
- `value-proposition`
- `competitive-analysis`
- `brand-messaging`
- `naming-strategy`
- `brand-roadmap`
- `brand-workshops`
- `strategy-to-design`

Зависимости: `audience-research` преди `value-proposition`; `strategy-to-design` след `brand-identity`.

Вътрешни връзки: всички поддържащи статии водят към `brand-strategy`; `brand-strategy` води към `branding`, `brand-identity`, `content-governance`.

### 3. Бранд идентичност

Основна статия: `brand-identity`

Поддържащи статии:

- `logo-system`
- `color-system`
- `typography-system`
- `visual-language`
- `identity-guidelines`
- `identity-applications`
- `identity-redesign`
- `identity-handover`
- `identity-quality-control`

Зависимости: `visual-language` преди `identity-guidelines`; `identity-handover` след `identity-guidelines`.

Вътрешни връзки: всички поддържащи статии водят към `brand-identity`; `brand-identity` води към `branding`, `graphic-design`, `ui-typography`.

### 4. Графичен дизайн

Основна статия: `graphic-design`

Поддържащи статии:

- `layout-composition`
- `print-design`
- `social-media-design`
- `campaign-visuals`
- `design-systems-for-marketing`
- `file-preparation`
- `visual-hierarchy`
- `design-review`
- `design-production-checklist`

Зависимости: `visual-hierarchy` преди `layout-composition`; `file-preparation` преди `design-production-checklist`.

Вътрешни връзки: всички поддържащи статии водят към `graphic-design`; `graphic-design` води към `brand-identity`, `content-architecture`, `social-media-design`.

### 5. Уеб дизайн

Основна статия: `web-design`

Поддържащи статии:

- `website-information-architecture`
- `landing-page-structure`
- `service-page-design`
- `portfolio-page-design`
- `responsive-design`
- `conversion-paths`
- `web-copy-structure`
- `visual-web-systems`
- `web-design-review`

Зависимости: `website-information-architecture` преди `service-page-design`; `responsive-design` преди `web-design-review`.

Вътрешни връзки: всички поддържащи статии водят към `web-design`; `web-design` води към `ux`, `ui`, `web-development`.

### 6. UX

Основна статия: `ux`

Поддържащи статии:

- `user-journey`
- `user-flows`
- `navigation-ux`
- `form-ux`
- `content-ux`
- `mobile-ux`
- `ux-research`
- `ux-audit`
- `ux-checklist`

Зависимости: `ux-research` преди `user-journey`; `user-flows` преди `form-ux`.

Вътрешни връзки: всички поддържащи статии водят към `ux`; `ux` води към `information-architecture`, `accessibility`, `ui`.

### 7. UI

Основна статия: `ui`

Поддържащи статии:

- `ui-components`
- `ui-states`
- `ui-spacing`
- `ui-typography`
- `ui-color`
- `ui-accessibility`
- `ui-patterns`
- `ui-review`
- `ui-documentation`

Зависимости: `ui-components` преди `ui-states`; `ui-accessibility` след `accessibility`.

Вътрешни връзки: всички поддържащи статии водят към `ui`; `ui` води към `ux`, `web-development`, `accessibility`.

### 8. Уеб разработка

Основна статия: `web-development`

Поддържащи статии:

- `frontend-architecture`
- `astro-development`
- `static-site-architecture`
- `component-architecture`
- `routing`
- `forms-and-functions`
- `deployment-workflow`
- `technical-maintenance`
- `development-qa`

Зависимости: `frontend-architecture` преди `component-architecture`; `deployment-workflow` след `static-site-architecture`.

Вътрешни връзки: всички поддържащи статии водят към `web-development`; `web-development` води към `astro`, `cloudflare-hosting-performance`, `technical-seo`.

### 9. Astro

Основна статия: `astro`

Поддържащи статии:

- `astro-static-output`
- `astro-routing`
- `astro-layouts`
- `astro-content-collections`
- `astro-seo`
- `astro-performance`
- `astro-cloudflare-pages`
- `astro-markdown`
- `astro-migration`

Зависимости: `astro-static-output` преди `astro-cloudflare-pages`; `astro-content-collections` преди `astro-markdown`.

Вътрешни връзки: всички поддържащи статии водят към `astro`; `astro` води към `web-development`, `cloudflare-pages`, `technical-seo`.

### 10. Cloudflare, хостинг и производителност

Основна статия: `cloudflare-hosting-performance`

Поддържащи статии:

- `cloudflare-pages`
- `wrangler-deploy`
- `cloudflare-functions`
- `d1-basics`
- `hosting-checklist`
- `pagespeed`
- `core-web-vitals`
- `asset-optimization`
- `performance-regression`

Зависимости: `cloudflare-pages` преди `wrangler-deploy`; `asset-optimization` преди `pagespeed`.

Вътрешни връзки: всички поддържащи статии водят към `cloudflare-hosting-performance`; основната статия води към `astro`, `web-development`, `technical-seo`.

### 11. Техническо SEO, семантично SEO, GEO и видимост в AI системи

Основна статия: `technical-seo-semantic-seo-geo-ai-visibility`

Поддържащи статии:

- `technical-seo`
- `semantic-seo`
- `structured-data`
- `sitemap`
- `robots-txt`
- `canonical-hreflang`
- `llms-txt`
- `content-signal`
- `ai-visibility`

Зависимости: `technical-seo` преди `semantic-seo`; `structured-data` преди `ai-visibility`; `sitemap` преди `llms-txt`.

Вътрешни връзки: всички поддържащи статии водят към the pillar; основната статия води към `astro-seo`, `content-architecture`, `information-architecture`.

### 12. CMS, достъпност, архитектура на съдържанието и информационна архитектура

Основна статия: `cms-accessibility-content-information-architecture`

Поддържащи статии:

- `cms-selection`
- `headless-cms`
- `editorial-workflow`
- `accessibility`
- `wcag-basics`
- `content-modeling`
- `content-governance`
- `taxonomy`
- `internal-linking`

Зависимости: `content-modeling` преди `taxonomy`; `accessibility` преди `wcag-basics`; `taxonomy` преди `internal-linking`.

Вътрешни връзки: всички поддържащи статии водят към the pillar; основната статия води към `semantic-seo`, `web-design`, `ux`.

## Execution Checklist

1. Изгради публичната архитектура на Knowledge Base.
2. Създай всички основни статии.
3. Създай поддържащите статии клъстер по клъстер.
4. Validate frontmatter and Markdown след each article.
5. Обнови вътрешните връзки и картата на сайта.
6. Изпълни проверките според `CHECKLIST.md`.
