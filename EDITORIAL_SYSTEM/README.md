# Editorial System 1.0

## Purpose

`EDITORIAL_SYSTEM/` е единственият работен стандарт за планиране, писане, редакция, UX, UI, вътрешно свързване и review на блог статии за `d . media`.

Тази директория не описва проекта като цяло. Тя описва как се създава и оценява една статия.

## Documents

1. `EDITORIAL_STANDARDS.md`
   - философия;
   - цел на блога;
   - аудитория;
   - какво не се публикува;
   - Definition of Done;
   - editorial workflow.

2. `ARTICLE_STRUCTURE.md`
   - логическа архитектура на статията;
   - H1/H2/H3 правила;
   - въведение;
   - секционна логика;
   - правило за размяна на H2 секции.

3. `ARTICLE_UX.md`
   - reading flow;
   - reading journey;
   - scan behavior;
   - mobile/tablet/desktop reading;
   - cognitive load.

4. `ARTICLE_UI.md`
   - article UI елементи;
   - visual rhythm;
   - callout, warning, tip, note, examples, tables, FAQ, CTA;
   - правила срещу стена от текст.

5. `LINKING_STRATEGY.md`
   - vertical links;
   - horizontal links;
   - context links;
   - related articles;
   - related services;
   - anchor text.

6. `WRITING_GUIDE.md`
   - тон;
   - стил;
   - забрани;
   - примери;
   - техническа точност;
   - саморедакция.

7. `REVIEW_CHECKLIST.md`
   - PASS/FAIL критерии;
   - вътрешна редакторска оценка;
   - финално решение.

## Reading Order

За всяка задача, която засяга блог статия, чети в този ред:

1. `EDITORIAL_SYSTEM/README.md`
2. `EDITORIAL_SYSTEM/EDITORIAL_STANDARDS.md`
3. `EDITORIAL_SYSTEM/ARTICLE_STRUCTURE.md`
4. `EDITORIAL_SYSTEM/WRITING_GUIDE.md`
5. `EDITORIAL_SYSTEM/LINKING_STRATEGY.md`
6. `EDITORIAL_SYSTEM/ARTICLE_UX.md`
7. `EDITORIAL_SYSTEM/ARTICLE_UI.md`
8. `EDITORIAL_SYSTEM/REVIEW_CHECKLIST.md`

## Required Documents by Task

За нова статия:

- `EDITORIAL_STANDARDS.md`
- `ARTICLE_STRUCTURE.md`
- `WRITING_GUIDE.md`
- `LINKING_STRATEGY.md`
- `REVIEW_CHECKLIST.md`

За редакция на съществуваща статия:

- `ARTICLE_STRUCTURE.md`
- `WRITING_GUIDE.md`
- `REVIEW_CHECKLIST.md`

За промяна на article UX/UI:

- `ARTICLE_UX.md`
- `ARTICLE_UI.md`
- `REVIEW_CHECKLIST.md`

За вътрешно свързване:

- `LINKING_STRATEGY.md`
- `ARTICLE_STRUCTURE.md`

## Workflow

Всяка блог статия преминава през:

```text
Research
→ Outline
→ Project Owner Approval
→ Writing
→ Technical Review
→ Editorial Review
→ Project Owner Review
→ Published
```

DMA няма право да прескача етапи.

DMA няма право да счита първата версия за финална.

DMA няма право да пренапише повече от една статия в рамките на една задача.

## Research Output Template

```text
Article:

Working title:

Primary reader problem:

Reader intent:

What the reader already knows:

What the reader needs to understand:

Repository-backed facts:

Unsupported facts:
Нуждае се от потвърждение.

Relevant services:

Relevant internal links:

Risks:

Questions for Project Owner:
```
## Evidence Map Output Template

```text
Article:

H2:

Main claim:

Claim type:
Fact / Inference / Recommendation

Proven facts:

Primary sources:

Secondary sources:

Source checked on:

Citation to use:

BG / EN applicability:

Confidence:
High / Medium / Low

Source conflict:
None / Describe

Technical specifications:

Calculations and units:

Practical examples:

Internal links:

Allowed conclusions:

Disallowed claims:

Cannot be proven:

Evidence status:
PASS / FAIL

Editorial status:
Draft / Peer Review / Editorial / QA

Decision:
Keep as H2 / Convert to H3 / Merge / Remove / Needs Project Owner decision
```


## Outline Template

```text
Article:

H1:

Intro promise:

H2 sequence:
1.
2.
3.
4.
5.
6.

Required examples:

Required tables or structured blocks:

FAQ questions:

Internal links:

CTA:

Why this structure cannot be reordered without losing logic:
```

## Project Owner Approval Template

```text
Article:

Research approved:
Yes / No

Outline approved:
Yes / No

Required changes before writing:

Approved scope:

Do not include:

Approval date:
```

## Definition of Done

Статията е готова само когато:

- workflow-ът е преминат без прескачане;
- няма `FAIL` в `REVIEW_CHECKLIST.md`;
- всеки оценъчен критерий е поне 9/10;
- статията не се отклонява от H1;
- всяка H2 секция отговаря директно на собственото си заглавие;
- има практическа стойност, примери, вътрешни връзки и естествен CTA;
- DMA е направил поне една саморедакция;
- Project Owner е направил финален review, когато задачата го изисква.
