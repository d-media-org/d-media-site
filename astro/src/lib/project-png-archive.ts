import type { Locale } from "@/lib/i18n";
import { mainProjectArchiveEntries, mainProjectAssetAdditions } from "@/lib/main-project-assets";

function getImageOrder(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("transparent") || normalized.includes("transperent")) {
    return 0;
  }

  if (
    normalized.includes("white") ||
    normalized.includes("light") ||
    normalized.includes("бял") ||
    normalized.includes("свет")
  ) {
    return 1;
  }

  if (
    normalized.includes("black") ||
    normalized.includes("dark") ||
    normalized.includes("чер")
  ) {
    return 2;
  }

  return 3;
}

const baseProjectPngArchive = [
  {
    "slug": "apple-community-bulgaria",
    "title": "Apple Community Bulgaria",
    "imageCount": 22,
    "cover": "/assets/projects/apple-community-bulgaria/cover.png",
    "images": [
      { "src": "/assets/projects/apple-community-bulgaria/community-cover.png", "label": "Apple Community Bulgaria — Community cover" },
      { "src": "/assets/projects/apple-community-bulgaria/community-clean-cover.png", "label": "Apple Community Bulgaria — clean Community cover" },
      { "src": "/assets/projects/apple-community-bulgaria/community-logotype.png", "label": "Apple Community Bulgaria — Community logotype" },
      { "src": "/assets/projects/apple-community-bulgaria/sales-cover.png", "label": "Apple Sales Community Bulgaria — cover" },
      { "src": "/assets/projects/apple-community-bulgaria/sales-clean-cover.png", "label": "Apple Sales Community Bulgaria — clean cover" },
      { "src": "/assets/projects/apple-community-bulgaria/sales-logotype.png", "label": "Apple Sales Community Bulgaria — logotype" },
      { "src": "/assets/projects/apple-community-bulgaria/airpods-cover.png", "label": "AirPods Community Bulgaria — cover" },
      { "src": "/assets/projects/apple-community-bulgaria/airpods-clean-cover.png", "label": "AirPods Community Bulgaria — clean cover" },
      { "src": "/assets/projects/apple-community-bulgaria/airpods-logotype.png", "label": "AirPods Community Bulgaria — logotype" },
      { "src": "/assets/projects/apple-community-bulgaria/podcast-cover.png", "label": "Apple Community Bulgaria podcast — cover" },
      { "src": "/assets/projects/apple-community-bulgaria/podcast-clean-cover.png", "label": "Apple Community Bulgaria podcast — clean cover" },
      { "src": "/assets/projects/apple-community-bulgaria/podcast-artcover.png", "label": "Apple Community Bulgaria podcast — artwork" },
      { "src": "/assets/projects/apple-community-bulgaria/podcast-logotype.png", "label": "Apple Community Bulgaria podcast — logotype" },
      { "src": "/assets/projects/apple-community-bulgaria/christmas-community-cover.png", "label": "Apple Community Bulgaria — Christmas cover" },
      { "src": "/assets/projects/apple-community-bulgaria/christmas-airpods-cover.png", "label": "AirPods Community Bulgaria — Christmas cover" },
      { "src": "/assets/projects/apple-community-bulgaria/christmas-sales-cover.png", "label": "Apple Sales Community Bulgaria — Christmas cover" },
      { "src": "/assets/projects/apple-community-bulgaria/christmas-podcast-cover.png", "label": "Apple Community Bulgaria podcast — Christmas cover" },
      { "src": "/assets/projects/apple-community-bulgaria/newyear-community-cover.png", "label": "Apple Community Bulgaria — New Year cover" },
      { "src": "/assets/projects/apple-community-bulgaria/newyear-airpods-cover.png", "label": "AirPods Community Bulgaria — New Year cover" },
      { "src": "/assets/projects/apple-community-bulgaria/newyear-sales-cover.png", "label": "Apple Sales Community Bulgaria — New Year cover" },
      { "src": "/assets/projects/apple-community-bulgaria/newyear-podcast-cover.png", "label": "Apple Community Bulgaria podcast — New Year cover" }
    ],
    "featured": true,
    "priority": 1,
    "isCaseStudy": true,
    "subtitle": "От общност до собствена медийна екосистема",
    "projectType": "Собствен проект / общност / бранд / подкаст",
    "status": "Завършен",
    "summary": "Собствен проект на d . media, изграден около идеята за организирана българска общност за потребители на Apple.",
    "context": "С развитието си проектът прераства от една Facebook група в система от специализирани общности и собствен подкаст с разработена визуална и звукова идентичност.",
    "focus": [
      "Завършен собствен проект на d . media",
      "Общност, бранд и подкаст екосистема",
      "Визуална идентичност и съдържание за социални мрежи",
      "Звукова продукция, sound design, запис, монтаж и микс",
      "Завършен E0 епизод, суров запис за E1, видео версия и тийзър"
    ],
    "caseStudySections": [
      { "title": "Статус", "text": "Завършен собствен проект на d . media. На 1 август 2025 г. започва едномесечен период на замразяване на Apple Community Bulgaria, Apple Sales Community Bulgaria и Apple Community Bulgaria podcast след оценка на активността и устойчивостта на общностите." },
      { "title": "Проектът в числа", "text": "Провереният запазен производствен архив съдържа 93 файла и е приблизително 1.29 GB. В него са налични 43 графични файла, 2 видеоматериала и над 2 часа и 35 минути възпроизвеждаем звуков материал. Тези стойности описват запазения архив, а не целия произведен обем и не 43 уникални дизайна." },
      { "title": "Екосистема", "text": "Екосистемата включва Apple Community Bulgaria, Apple Sales Community Bulgaria, AirPods Community Bulgaria и Apple Community Bulgaria podcast. AirPods Community Bulgaria е името по време на участието на d . media; след оттеглянето групата е върната към първоначалното си име и оригиналния си администратор и днес е AirPods Users Bulgaria." },
      { "title": "Визуална система", "text": "Разработена е свързана визуална система с лога, логотипи, Facebook корици, podcast artwork, шаблони, Christmas и New Year варианти и editable AI/PSD източници." },
      { "title": "Подкаст", "text": "Подкаст направлението разширява проекта отвъд Facebook общностите. Архивът съдържа original intro, jingle, extended intro, extended mix, full theme, short intro, background, closing, clean, clean strings, club и ethno edits, запис, монтаж, микс, аудио реклама, видео версия и тийзър. Има завършен E0 и суров запис за E1; E1 не е представен като публикуван епизод." },
      { "title": "Общност", "text": "Към 4 септември 2026 г. предоставената снимка показва приблизително 1.2K членове в основната Apple Community Bulgaria група, 47 в Apple Sales Community Bulgaria и 9 в Apple Community Bulgaria podcast. Текущите приблизително 3.4K членове на AirPods Users Bulgaria не са използвани като резултат на d . media. Не са налични надеждни исторически данни за темп на растеж, обхват, импресии, ангажираност или уникална аудитория." },
      { "title": "Равносметка", "text": "Apple Community Bulgaria преминава през целия жизнен цикъл на собствен медиен проект — от концепция и визуална идентичност до управление на общности, съдържание, звук, видео и подкаст продукция. Проектът е приключен и архивът показва реално произведената система без твърдения за недоказани резултати." }
    ]
  },
  {
    "slug": "d-media",
    "title": "d . media",
    "imageCount": 4,
    "cover": "/assets/brand/ONLY-logotype.png",
    "detailCover": "/downloads/brand-assets/d . media logotype_transparent.png",
    "images": [
      {
        "src": "/optimized-assets/project-web/d-media/business-card-mockup.jpg",
        "label": "d . media — business card identity application"
      },
      {
        "src": "/optimized-assets/project-web/d-media/linkedin-cover.jpg",
        "label": "d . media — LinkedIn cover"
      },
      {
        "src": "/optimized-assets/project-web/d-media/youtube-cover.jpg",
        "label": "d . media — YouTube cover"
      },
      {
        "src": "/optimized-assets/project-web/d-media/instagram-pinned-cover.jpg",
        "label": "d . media — pinned social cover"
      }
    ],
    "featured": true,
    "priority": 0,
    "isCaseStudy": true,
    "summary": "Собствената платформа на d . media, изградена като бърз, многоезичен и поддържим сайт с ясна SEO/GEO основа.",
    "context": "Проектът показва как бранд идентичност, съдържание, уеб архитектура, производителност и реално приложение работят в една система.",
    "focus": [
      "100 Performance, 100 Accessibility, 100 Best Practices и 100 SEO в Lighthouse",
      "Миграция към Astro и Cloudflare Pages",
      "SEO, GEO и multilingual архитектура за реална употреба",
      "Реални brand applications и архив от 155 motion варианта"
    ],
    "caseStudySections": [
      {
        "title": "Предизвикателство",
        "text": "Сайтът трябваше да представи d . media като творческо студио, да събере услуги, проекти, брандбук, правни страници и двуезична структура, без да губи скорост, яснота и стабилност в мобилна среда."
      },
      {
        "title": "Подход",
        "text": "Подредихме съдържанието, услугите, проектите, контактния поток и архивите в минимална система, която води към действие без визуален шум."
      },
      {
        "title": "Архитектура",
        "text": "Платформата премина от първоначален Next.js сайт към Astro/Cloudflare Pages архитектура с ясни маршрути, локални публични assets и синхронизирана езикова структура между BG и EN."
      },
      {
        "title": "Performance",
        "text": "Финалната линия е стабилно PageSpeed/Lighthouse състояние около 100 Performance, 100 Accessibility, 100 Best Practices и 100 SEO, с възможни моментни флуктуации според измерването."
      },
      {
        "title": "Миграция към Astro",
        "text": "Миграцията към Astro намали runtime тежестта и направи сайта по-предвидим за статично публикуване, route validation и дългосрочна поддръжка."
      },
      {
        "title": "Миграция към Cloudflare",
        "text": "Преместването към Cloudflare Pages даде по-чиста инфраструктура, директен контрол върху домейна, preview/live процес и премахване на активната зависимост от стар външен asset слой."
      },
      {
        "title": "SEO и GEO готовност",
        "text": "Метаданни, canonical, hreflang, sitemap, schema, social preview и llms файлове са подредени за search, AI search и реална индексация. Добавени са активна Content-Signal политика и Markdown content negotiation за основните публични страници."
      },
      {
        "title": "Визуална система",
        "text": "Сайтът запазва Panton типографията, монохромната editorial посока, logotype-only social preview логиката и минимална визуална система без декоративен шум."
      },
      {
        "title": "Галерии и мобилна стабилност",
        "text": "Проектният архив премина през оптимизация на PNG файлове, bounded web derivatives, portrait/landscape логика за mockup секции и специални итерации за iPhone/Safari стабилност."
      },
      {
        "title": "Motion система",
        "text": "Казусът включва архив от 155 оптимизирани logo intro и animation варианта с poster кадри и отложено зареждане, така че motion разработката остава достъпна без да натоварва първоначалното отваряне на страницата."
      },
      {
        "title": "Резултат",
        "text": "d-media.org работи като собствен работен пример: бранд система, реални приложения, съдържание, проектен и motion архив и уеб платформа, изградени по същия стандарт, който предлагаме."
      }
    ]
  },
  {
    "slug": "yanita",
    "title": "Yanita",
    "imageCount": 3,
    "cover": "/assets/project-covers/yanita.png",
    "images": [
      {
        "src": "/assets/project-pngs/yanita/01.png",
        "label": "Yanita_logo @ original_transparent.png"
      },
      {
        "src": "/assets/project-pngs/yanita/02.png",
        "label": "Yanita_logo @ black_transparent.png"
      },
      {
        "src": "/assets/project-pngs/yanita/03.png",
        "label": "Yanita_logo @ white_transparent.png"
      }
    ],
    "featured": true,
    "priority": 1,
    "summary": "Beauty идентичност, представена през основните прозрачни logo варианти.",
    "context": "Текущият архив пази чистата основа на знака в оригинална, тъмна и светла версия, без приложните файлове от по-късни формати.",
    "focus": [
      "Оригинален прозрачен знак",
      "Черна прозрачна версия",
      "Бяла прозрачна версия"
    ]
  },
  {
    "slug": "zlatimira-u",
    "title": "zlatimira.u",
    "imageCount": 2,
    "cover": "/optimized-assets/project-web/main/zlatimira-u/01-zlatimira-u-dark.webp",
    "images": [
      {
        "src": "/optimized-assets/project-web/main/zlatimira-u/01-zlatimira-u-dark.webp",
        "label": "zlatimira.u — тъмен вариант"
      },
      {
        "src": "/optimized-assets/project-web/main/zlatimira-u/02-zlatimira-u-light.webp",
        "label": "zlatimira.u — светъл вариант"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Декоративна емблема за zlatimira.u, разработена в светъл и тъмен вариант.",
    "context": "Материалите документират създаването на декоративен знак в светъл и тъмен вариант.",
    "focus": [
      "Декоративна емблема",
      "Светъл вариант",
      "Тъмен вариант"
    ]
  },
  {
    "slug": "support-account",
    "title": "Support Account",
    "imageCount": 3,
    "cover": "/assets/project-covers/support-account.png",
    "images": [
      {
        "src": "/assets/project-pngs/support-account/01.png",
        "label": "Support Account_logotype_transparent (original).png"
      },
      {
        "src": "/assets/project-pngs/support-account/02.png",
        "label": "Support Account_logotype_transparent (bulgarian).png"
      },
      {
        "src": "/assets/project-pngs/support-account/03.png",
        "label": "Support Account_logo_transparent.png"
      },
    ],
    "featured": true,
    "priority": 2,
    "isCaseStudy": true,
    "summary": "Корпоративна идентичност за счетоводна дейност с ясен и подреден професионален облик.",
    "context": "Подборът показва основния знак и логотипите в ключовите им версии, както и визитката като реално печатно приложение на идентичността.",
    "focus": [
      "Оригинален и български логотип",
      "Прозрачен logo вариант за директно приложение",
      "Визитка — лице и гръб"
    ],
    "videos": [
      {
        "src": "/optimized-assets/project-media/support-account-logo-animation.mp4",
        "poster": "/assets/project-covers/support-account.png",
        "label": "Анимация на знака Support Account"
      }
    ],
    "caseStudySections": [
      {
        "title": "Задача",
        "text": "Идентичността трябваше да изгради професионално присъствие за счетоводна дейност и да остане ясна в корпоративни, печатни и дигитални приложения."
      },
      {
        "title": "Система",
        "text": "Разработени са знак, оригинален и български логотип, визитни приложения и motion вариант, които работят като последователна визуална система."
      },
      {
        "title": "Резултат",
        "text": "Брандът получава разпознаваем и спокоен облик, приложим както в ежедневна бизнес комуникация, така и в кратки дигитални формати."
      }
    ]
  },
  {
    "slug": "support-account-group",
    "title": "Support Account Group",
    "imageCount": 2,
    "cover": "/assets/project-covers/support-account-group.png",
    "images": [
      {
        "src": "/assets/project-pngs/support-account-group/01.png",
        "label": "Support Account Group_logotype_transparent.png"
      },
      {
        "src": "/assets/project-pngs/support-account-group/02.png",
        "label": "Support Account Group_transparent.png"
      }
    ],
    "featured": true,
    "priority": 3,
    "summary": "Корпоративна идентичност за втори бранд в рамките на същата счетоводна дейност.",
    "context": "Подборът е сведен до двата прозрачни основни файла, които пазят най-чисто връзката със Support Account и отделното позициониране на групата.",
    "focus": [
      "Прозрачен логотип за корпоративна употреба",
      "Комбиниран прозрачен знак за директно приложение",
      "Ясна връзка със Support Account без смесване на марките"
    ]
  },
  {
    "slug": "aneliart",
    "title": "Aneli Art",
    "imageCount": 3,
    "cover": "/assets/project-covers/aneliart.png",
    "images": [
      {
        "src": "/assets/project-pngs/aneliart/01.png",
        "label": "AneliArt_logo_transparent.png"
      },
      {
        "src": "/assets/project-pngs/aneliart/02.png",
        "label": "AneliArt_logo @ black_transparent.png"
      },
      {
        "src": "/assets/project-pngs/aneliart/03.png",
        "label": "AneliArt_logo @ white_transparent.png"
      }
    ],
    "featured": true,
    "priority": 4,
    "summary": "Авторски знак с чист силует и подредени прозрачни версии за различен фон.",
    "context": "Архивът вече държи основния знак в прозрачна, черна и бяла версия, вместо единичен export.",
    "focus": [
      "Основен прозрачен знак",
      "Черна прозрачна версия",
      "Бяла прозрачна версия"
    ]
  },
  {
    "slug": "boris-lilov-photography",
    "title": "Boris Lilov Photography",
    "imageCount": 3,
    "cover": "/assets/project-covers/boris-lilov-photography.png",
    "images": [
      {
        "src": "/assets/project-pngs/boris-lilov-photography/01.png",
        "label": "boris lilov PHOTOGRAPHY logo+logotype _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/boris-lilov-photography/02.png",
        "label": "boris lilov PHOTOGRAPHY logotype _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/boris-lilov-photography/03.png",
        "label": "boris lilov PHOTOGRAPHY logo _ transperent.png"
      },
    ],
    "featured": false,
    "priority": 999,
    "summary": "Фотографска идентичност, представена чрез основните прозрачни варианти на системата.",
    "context": "Подборът вече е фокусиран върху комбинирания знак, логотипа и самостоятелното logo решение в прозрачни файлове.",
    "focus": [
      "Комбиниран прозрачен знак",
      "Прозрачен логотип",
      "Прозрачен logo знак"
    ],
    "caseStudySections": [
      {
        "title": "Задача",
        "text": "Фотографската идентичност трябваше да носи авторски характер, без да конкурира самите изображения и работата на фотографа."
      },
      {
        "title": "Подход",
        "text": "Системата е сведена до комбиниран знак, самостоятелен логотип и отделен символ, за да работи еднакво добре върху кадри, корици и motion материали."
      },
      {
        "title": "Резултат",
        "text": "Получен е чист визуален подпис с достатъчно гъвкавост за портфолио, социални канали и видео представяне."
      }
    ]
  },
  {
    "slug": "diana",
    "title": "Diana",
    "imageCount": 4,
    "cover": "/assets/project-covers/diana.png",
    "images": [
      {
        "src": "/assets/project-pngs/diana/01.png",
        "label": "Diana_logo @ original_transparent.png"
      },
      {
        "src": "/assets/project-pngs/diana/02.png",
        "label": "Diana_logo @ original_white type_transparent.png"
      },
      {
        "src": "/assets/project-pngs/diana/03.png",
        "label": "Diana_logo @ black_transparent.png"
      },
      {
        "src": "/assets/project-pngs/diana/04.png",
        "label": "Diana_logo @ white_transparent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Идентичност за бранд за ръчно изработена украса за празненства и събития.",
    "context": "Посоката търсеше по-деликатно и празнично присъствие, което да остане четимо и подредено в различни формати.",
    "focus": [
      "Оригинален прозрачен знак",
      "Вариант с бял letterform treatment",
      "Черна и бяла прозрачна версия"
    ]
  },
  {
    "slug": "dj-nedi",
    "title": "DJ NEDI",
    "imageCount": 3,
    "cover": "/assets/project-covers/dj-nedi.png",
    "images": [
      {
        "src": "/assets/project-pngs/dj-nedi/01.png",
        "label": "DJ Nedi_logo @ black_transparent.png"
      },
      {
        "src": "/assets/project-pngs/dj-nedi/02.png",
        "label": "DJ Nedi_logo @ white_transparent.png"
      },
      {
        "src": "/assets/project-pngs/dj-nedi/03.png",
        "label": "Dynamite_cover_transparent.png"
      }
    ],
    "featured": true,
    "priority": 4,
    "summary": "Визуален пакет за диджей с обложка, визии за клип и YouTube приложение.",
    "context": "Проектът беше насочен към дигитално присъствие, в което знакът, обложката и материалите за клипа трябва да работят заедно.",
    "focus": [
      "Черна прозрачна версия на логото",
      "Бяла прозрачна версия на логото",
      "Прозрачна обложка за Dynamite"
    ]
  },
  {
    "slug": "dj-just-mp",
    "title": "DJ Just MP",
    "imageCount": 3,
    "cover": "/assets/project-covers/dj-just-mp.png",
    "images": [
      {
        "src": "/assets/project-pngs/dj-just-mp/01.png",
        "label": "DJ Just MP_logo @ original_transparent.png"
      },
      {
        "src": "/assets/project-pngs/dj-just-mp/02.png",
        "label": "DJ Just MP_logo @ black_transparent.png"
      },
      {
        "src": "/assets/project-pngs/dj-just-mp/03.png",
        "label": "DJ Just MP_logo @ white_transparent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "DJ идентичност, представена чрез трите основни прозрачни версии на знака.",
    "context": "Подборът е сведен до оригиналния, черния и белия прозрачeн вариант, за да се пази най-чистият вид на системата.",
    "focus": [
      "Оригинален прозрачен знак",
      "Черна прозрачна версия",
      "Бяла прозрачна версия"
    ]
  },
  {
    "slug": "enduro-team-stoletovo",
    "title": "Enduro Team Stoletovo",
    "imageCount": 1,
    "cover": "/assets/project-covers/enduro-team-stoletovo.png",
    "images": [
      {
        "src": "/assets/project-pngs/enduro-team-stoletovo/01.png",
        "label": "enduro team STOLETOVO (transperent).png"
      },
    ],
    "featured": false,
    "priority": 999,
    "summary": "Знак за off-road отбор, запазен тук в основния прозрачен export.",
    "context": "Текущият архив държи само оригиналния прозрачен файл, който носи най-чисто клубния характер на знака.",
    "focus": [
      "Основен прозрачен знак",
      "Ясно изразен клубен характер",
      "Директна употреба върху различни носители"
    ]
  },
  {
    "slug": "galka-nails",
    "title": "Galka Nails",
    "imageCount": 1,
    "cover": "/assets/project-covers/galka-nails.png",
    "images": [
      {
        "src": "/assets/project-pngs/galka-nails/01.png",
        "label": "Galka’s nails transperent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Компактен beauty знак с директно име и бързо разпознаване.",
    "context": "Проектът беше сведен до най-чистата форма, без да губи характер и приложимост.",
    "focus": [
      "Един основен brand asset",
      "Прозрачна версия за приложение",
      "Чист beauty знак с директно присъствие"
    ]
  },
  {
    "slug": "gosmile",
    "title": "GO SMILE",
    "imageCount": 2,
    "cover": "/assets/project-covers/gosmile.png",
    "images": [
      {
        "src": "/assets/project-pngs/gosmile/01.png",
        "label": "Go Smile Black.png"
      },
      {
        "src": "/assets/project-pngs/gosmile/02.png",
        "label": "Go Smile White.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Визуален пакет за продукт с чисти monochrome версии и ясно име.",
    "context": "Задачата беше да се изведе името с максимална четимост и чиста продуктова визуална рамка.",
    "focus": [
      "Черна и бяла logo версия",
      "Чисто продуктово позициониране",
      "Минимална и лесно приложима визуална система"
    ]
  },
  {
    "slug": "j-v",
    "title": "J & V",
    "imageCount": 5,
    "cover": "/assets/project-covers/j-v.png",
    "images": [
      {
        "src": "/assets/project-pngs/j-v/01.png",
        "label": "J & V 2.png"
      },
      {
        "src": "/assets/project-pngs/j-v/02.png",
        "label": "J & V 3.png"
      },
      {
        "src": "/assets/project-pngs/j-v/03.png",
        "label": "J & V 4.png"
      },
      {
        "src": "/assets/project-pngs/j-v/04.png",
        "label": "J & V.png"
      },
      {
        "src": "/assets/project-pngs/j-v/05.png",
        "label": "J & V _ mockup.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Идентичност за clothing label с чист fashion характер.",
    "context": "Проектът търсеше по-редакционен прочит, в който знакът да стои уверено и без излишно усложнение.",
    "focus": [
      "Основни logo варианти",
      "Мокъп контекст за по-реална маркова среда",
      "Чист и редакционен моден характер"
    ]
  },
  {
    "slug": "makeup-by-tsvetomira",
    "title": "Makeup by Tsvetomira",
    "imageCount": 1,
    "cover": "/assets/project-covers/makeup-by-tsvetomira.png",
    "images": [
      {
        "src": "/assets/project-pngs/makeup-by-tsvetomira/01.png",
        "label": "make up by Tsvetomira work logo _ transperent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Ранен етап от идентичност за гримьорски услуги.",
    "context": "Този проект поставя първата визуална основа преди по-късното развитие на бранда в по-завършена посока.",
    "focus": [
      "Първоначален logo asset",
      "Връзка с по-късната еволюция към TS makeup",
      "Начална beauty визуална рамка"
    ]
  },
  {
    "slug": "mis-18",
    "title": "MIS 18",
    "imageCount": 1,
    "cover": "/assets/project-covers/mis-18.png",
    "images": [
      {
        "src": "/assets/project-pngs/mis-18/01.png",
        "label": "MIS 18 logo _ Transperent.png"
      },
    ],
    "featured": false,
    "priority": 999,
    "summary": "Идентичност за митническа агенция, представена чрез основния знак и визитките.",
    "context": "Проектът беше ориентиран към административна и логистична среда, в която четимостта и ясният професионален облик са решаващи.",
    "focus": [
      "Основен прозрачен logo export",
      "Визитка — лице и гръб",
      "Чист знак за професионална среда"
    ],
    "links": [
      {
        "href": "https://www.customsagencymis.com/",
        "label": "Посети сайта на MIS 18"
      }
    ]
  },
  {
    "slug": "photo-workshop",
    "title": "Фото работилничка",
    "imageCount": 2,
    "cover": "/assets/project-covers/photo-workshop.png",
    "images": [
      {
        "src": "/assets/project-pngs/photo-workshop/01.png",
        "label": "Photo workshop _ color _ transparent _ logo.png"
      },
      {
        "src": "/assets/project-pngs/photo-workshop/02.png",
        "label": "Photo workshop _ white _ transparent _ logo.png"
      },
    ],
    "featured": false,
    "priority": 999,
    "summary": "Идентичност за Фото работилничка като фотостудио с версии за различни носители.",
    "context": "Решението трябваше да събере фотографския характер на студиото в спокойна и чиста визуална рамка.",
    "focus": [
      "Цветен прозрачен logo вариант",
      "Бяла прозрачна версия",
      "Спокоен фотографски визуален език"
    ]
  },
  {
    "slug": "plamena-nails",
    "title": "Plamena Nails",
    "imageCount": 3,
    "cover": "/assets/project-covers/plamena-nails.png",
    "images": [
      {
        "src": "/assets/project-pngs/plamena-nails/01.png",
        "label": "Plamena nails _ logo _ grey _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/plamena-nails/02.png",
        "label": "Plamena nails _ logo _ red _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/plamena-nails/03.png",
        "label": "Plamena nails _ logo _ violet _ transperent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Beauty знак с цветови варианти и ясно декоративно присъствие.",
    "context": "Проектът беше насочен към един знак в няколко цветови версии, подготвен за различни повърхности и бърза употреба.",
    "focus": [
      "Няколко цветови варианта",
      "Прозрачни файлове за лесно приложение",
      "Лек и декоративен beauty тон"
    ]
  },
  {
    "slug": "pp-hairstyle",
    "title": "PP Hairstyle",
    "imageCount": 1,
    "cover": "/assets/project-covers/pp-hairstyle.png",
    "images": [
      {
        "src": "/assets/project-pngs/pp-hairstyle/01.png",
        "label": "PP hairstyle _ logo _ transperent.png"
      },
    ],
    "featured": false,
    "priority": 999,
    "summary": "Beauty бранд с ясни версии за ежедневна употреба.",
    "context": "Проектът трябваше да изведе името чисто и разпознаваемо в различни базови приложения за услугата.",
    "focus": [
      "Основен прозрачен logo файл",
      "По-лек beauty service характер",
      "Ясна практическа употреба"
    ]
  },
  {
    "slug": "sport-fishing-stoletovo",
    "title": "Спортен риболов Столетово",
    "imageCount": 3,
    "cover": "/assets/project-covers/sport-fishing-stoletovo.png",
    "images": [
      {
        "src": "/assets/project-pngs/sport-fishing-stoletovo/01.png",
        "label": "SFS_orignal_transperent.png"
      },
      {
        "src": "/assets/project-pngs/sport-fishing-stoletovo/02.png",
        "label": "SFS_black_transperent.png"
      },
      {
        "src": "/assets/project-pngs/sport-fishing-stoletovo/03.png",
        "label": "SFS_white_transperent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Идентичност за място за спортен риболов с директен характер и ясни версии за приложение.",
    "context": "Решението беше насочено към по-ясно присъствие за самото място, без да губи сила при реално приложение.",
    "focus": [
      "Оригинален прозрачен знак",
      "Черна прозрачна версия",
      "Бяла прозрачна версия"
    ]
  },
  {
    "slug": "stanulovi-s-house",
    "title": "Stanulovi's House",
    "imageCount": 1,
    "cover": "/assets/project-covers/stanulovi-s-house.png",
    "images": [
      {
        "src": "/assets/project-pngs/stanulovi-s-house/01.png",
        "label": "Stanulovi-01-01.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Компактен знак за къща за гости с чисто и ясно изписване.",
    "context": "Проектът беше фокусиран върху директна разпознаваемост и спокойно присъствие в базови приложения за място за настаняване.",
    "focus": [
      "Един основен visual export",
      "Чисто име и знак в едно решение",
      "Лесно приложение в базови контексти"
    ]
  },
  {
    "slug": "ts-makeup",
    "title": "TS makeup",
    "imageCount": 2,
    "cover": "/assets/project-covers/ts-makeup.png",
    "images": [
      {
        "src": "/assets/project-pngs/ts-makeup/01.png",
        "label": "TS makeup _ logo _ lasercut _ trasperent.png"
      },
      {
        "src": "/assets/project-pngs/ts-makeup/02.png",
        "label": "TS makeup _ logo _ transperent _ +shadow.png"
      },
    ],
    "featured": false,
    "priority": 999,
    "summary": "По-завършен етап от прехода от d . media към Makeup by Tsvetomira в по-чист beauty знак.",
    "context": "Това е по-зрелият етап на ребрандиране, в който ранната посока е събрана в по-точно и уверено решение за Makeup by Tsvetomira.",
    "focus": [
      "Lasercut прозрачен вариант",
      "Прозрачна версия със сянка",
      "По-зрял beauty визуален език след прехода към новото име"
    ]
  },
  {
    "slug": "kdj",
    "title": "KDJ",
    "imageCount": 4,
    "cover": "/assets/project-covers/kdj.png",
    "images": [
      {
        "src": "/assets/project-pngs/kdj/01.png",
        "label": "KDJ _ logo _ electric green _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/kdj/02.png",
        "label": "KDJ _ logo _ electric orange _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/kdj/03.png",
        "label": "KDJ _ logo _ black _ transperent.png"
      },
      {
        "src": "/assets/project-pngs/kdj/04.png",
        "label": "KDJ _ logo _ white _ transperent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Идентичност с няколко цветови прозрачни версии за директна дигитална и сценична употреба.",
    "context": "Архивът събира четирите основни прозрачни exports, през които се вижда цветовият диапазон и поведението на знака върху различен фон.",
    "focus": [
      "Electric green прозрачна версия",
      "Electric orange прозрачна версия",
      "Черна и бяла прозрачна версия"
    ]
  },
  {
    "slug": "tanev-car-detailing",
    "title": "TANEV Car Detailing",
    "imageCount": 3,
    "cover": "/assets/project-covers/tanev-car-detailing.png",
    "images": [
      {
        "src": "/assets/project-pngs/tanev-car-detailing/01.png",
        "label": "TANEV CDS_logo_transparent.png"
      },
      {
        "src": "/assets/project-pngs/tanev-car-detailing/02.png",
        "label": "TANEV CDS_logo @ black_transparent.png"
      },
      {
        "src": "/assets/project-pngs/tanev-car-detailing/03.png",
        "label": "TANEV CDS_logo @ white_transparent.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "summary": "Car detailing идентичност, запазена през основните прозрачни версии на знака.",
    "context": "Подборът е сведен до оригиналния, черния и белия прозрачен export, за да остане най-чистата работна система на знака.",
    "focus": [
      "Основен прозрачен знак",
      "Черна прозрачна версия",
      "Бяла прозрачна версия"
    ]
  },
  {
    "slug": "syanka-ot-minaloto",
    "title": "Сянка от миналото",
    "imageCount": 4,
    "cover": "/assets/project-covers/syanka-ot-minaloto.png",
    "images": [
      {
        "src": "/assets/project-pngs/syanka-ot-minaloto/01.png",
        "label": "Сянка от миналото_logo_no txt_white background.png"
      },
      {
        "src": "/assets/project-pngs/syanka-ot-minaloto/02.png",
        "label": "Сянка от миналото_logo_white background.png"
      },
      {
        "src": "/assets/project-pngs/syanka-ot-minaloto/03.png",
        "label": "Сянка от миналото.png"
      },
      {
        "src": "/assets/project-pngs/syanka-ot-minaloto/04.png",
        "label": "Сянка от миналото_mockup.png"
      }
    ],
    "featured": false,
    "priority": 999,
    "isCaseStudy": true,
    "summary": "Визуална идентичност за YouTube канал и видео съдържание.",
    "context": "Проектът беше създаден за силно дигитално присъствие, в което знакът и каналната употреба трябва да работят заедно.",
    "focus": [
      "Лого и вариант без текст",
      "Файлове за светъл фон и мокъп приложение",
      "Присъствие, ориентирано към YouTube среда"
    ],
    "caseStudySections": [
      {
        "title": "Начало и формат",
        "text": "„Сянка от миналото“ стартира през юли 2025 г. като съвместен проект с участието на d . media в изграждането на неговия визуален и аудиовизуален облик. В рамките на активния период са публикувани шест видеоматериала — пет основни теренни епизода и специално издание „Зад кадър“."
      },
      {
        "title": "Потенциал",
        "text": "За краткия си активен период каналът достига приблизително 4,8 хил. гледания и 164 абонати. Отделни епизоди показват реален потенциал за достигане до значително по-широка публика. Най-силният резултат е при „Бункерите под планината – част 2“ с над 2100 гледания, като наличните данни показват, че голямата част от аудиторията е достигната чрез препоръчващите механизми на YouTube. Това показва, че самата концепция и тематиката имат потенциал."
      },
      {
        "title": "Прекъсване на развитието",
        "text": "Въпреки тези положителни показатели развитието на проекта практически е преустановено. Последната публикация е от 26 октомври 2025 г., което означава близо 11 месеца без ново съдържание. Така не е използван моментът, в който каналът започва да достига аудитория извън собствената си абонатна база, нито е изградена необходимата последователност за устойчиво развитие на поредицата."
      },
      {
        "title": "Основание за оттегляне",
        "text": "За d . media копродукцията предполага не само участие в създаването на отделни материали, а активно развиващ се проект, последователност и възможност изградената визуална идентичност да бъде използвана като част от дългосрочно съдържателно развитие. При продължителната липса на нови епизоди тази предпоставка вече не е налице."
      },
      {
        "title": "Решение",
        "text": "Поради това d . media се оттегля от бъдещото си участие в копродукцията на „Сянка от миналото“. Решението не е оценка, че проектът е неуспешен — наличните резултати по-скоро показват обратното. Причината е продължителното фактическо прекъсване на активното му развитие и липсата на основание студиото да продължава да бъде обвързано като копродуцент с неактивен проект."
      },
      {
        "title": "Материали и архив",
        "text": "d . media запазва положителната си оценка за извършената съвместна работа и няма да ограничава използването на вече създадените и предоставени аудио- и визуални материали, при условие че те се използват във вида, в който са предоставени. По този начин създадената идентичност и архивът на „Сянка от миналото“ могат да останат част от проекта и след прекратяването на копродукцията."
      }
    ],
    "videos": [
      {
        "src": "/optimized-assets/project-media/syanka-ot-minaloto-intro.m4v",
        "poster": "/assets/project-covers/syanka-ot-minaloto.png",
        "label": "Сянка от миналото — intro"
      },
      {
        "src": "/optimized-assets/project-media/syanka-ot-minaloto-opener.m4v",
        "poster": "/assets/project-covers/syanka-ot-minaloto.png",
        "label": "Сянка от миналото — opener"
      }
    ],
    "links": [
      {
        "href": "https://www.youtube.com/@СЯНКА-ОТ-МИНАЛОТО",
        "label": "Отвори YouTube канала",
        "title": "YouTube канал",
        "text": "Гледай реалното приложение на визуалната идентичност в канала „Сянка от миналото“."
      }
    ]
  }
] as const;

export const projectPngArchive = [
  ...baseProjectPngArchive.map((project) => {
    const images = mainProjectAssetAdditions[project.slug as keyof typeof mainProjectAssetAdditions];

    if (!images) {
      return project;
    }

    return {
      ...project,
      imageCount: images.length,
      images,
    };
  }),
  ...mainProjectArchiveEntries,
] as const;

export const featuredProjectPngs = projectPngArchive.filter((project) => project.featured);

const localizedProjectCopy = {
  bg: {},
  en: {
    "apple-community-bulgaria": {
      title: "Apple Community Bulgaria",
      subtitle: "From a community to an owned media ecosystem",
      projectType: "Owned project / community / brand / podcast",
      status: "Completed",
      summary: "A d . media-owned project built around the idea of an organised Bulgarian community for Apple users.",
      context: "As it developed, the project grew from one Facebook group into a system of specialised communities and an owned podcast with a developed visual and sound identity.",
      focus: [
        "Completed d . media-owned project",
        "Community, brand, and podcast ecosystem",
        "Visual identity and social media content",
        "Audio production, sound design, recording, editing, and mixing",
        "Completed E0 episode, raw E1 recording, video version, and teaser",
      ],
      caseStudySections: [
        { title: "Status", text: "A completed d . media-owned project. On 1 August 2025, a one-month freeze period began for Apple Community Bulgaria, Apple Sales Community Bulgaria, and Apple Community Bulgaria podcast after an assessment of community activity and sustainability." },
        { title: "The project in numbers", text: "The checked preserved production archive contains 93 files and is approximately 1.29 GB. It includes 43 saved graphic files, 2 video materials, and more than 2 hours and 35 minutes of playable audio. These figures describe the preserved archive, not the total production volume and not 43 unique designs." },
        { title: "The ecosystem", text: "The ecosystem included Apple Community Bulgaria, Apple Sales Community Bulgaria, AirPods Community Bulgaria, and Apple Community Bulgaria podcast. AirPods Community Bulgaria was the name used during d . media’s involvement; after withdrawal, the group returned to its original name and original administrator and is now AirPods Users Bulgaria." },
        { title: "Visual system", text: "A connected visual system was developed with logos, logotypes, Facebook covers, podcast artwork, templates, Christmas and New Year variants, and editable AI/PSD sources." },
        { title: "Podcast", text: "The podcast direction expanded the project beyond Facebook communities. The archive contains original intro, jingle, extended intro, extended mix, full theme, short intro, background, closing, clean, clean strings, club and ethno edits, recording, editing, mixing, audio advertising, video version, and teaser. It includes a completed E0 and a raw E1 recording; E1 is not presented as a published episode." },
        { title: "Community", text: "As of 4 September 2026, the provided screenshot shows approximately 1.2K members in the main Apple Community Bulgaria group, 47 in Apple Sales Community Bulgaria, and 9 in Apple Community Bulgaria podcast. The current approximately 3.4K members of AirPods Users Bulgaria are not used as a d . media result. Reliable historical growth, reach, impressions, engagement, and unique-audience data are not available." },
        { title: "Reflection", text: "Apple Community Bulgaria passed through the full lifecycle of an owned media project—from concept and visual identity to community management, content, sound, video, and podcast production. The project is completed, and the archive shows the produced system without claims about unverified outcomes." },
      ],
    },
    "d-media": {
      summary: "The d . media platform, built as a fast, multilingual, maintainable website with a clear SEO/GEO foundation.",
      context: "The project shows how brand identity, content, web architecture, performance, and real application work as one system.",
      focus: [
        "100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO in Lighthouse",
        "Migration to Astro and Cloudflare Pages",
        "SEO, GEO, and multilingual architecture for real use",
        "Real brand applications and an archive of 155 motion variants",
      ],
      caseStudySections: [
        {
          title: "Challenge",
          text: "The website had to present d . media as a creative studio and bring together services, projects, the brand book, legal pages, and a bilingual structure without losing speed, clarity, or mobile stability.",
        },
        {
          title: "Approach",
          text: "We organised the content, services, projects, contact flow, and archives into a minimal system that guides action without visual noise.",
        },
        {
          title: "Architecture",
          text: "The platform moved from an initial Next.js website to an Astro/Cloudflare Pages architecture with clear routes, local browser-facing assets, and language parity between BG and EN.",
        },
        {
          title: "Performance",
          text: "The final baseline is a stable PageSpeed/Lighthouse state around 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO, with possible momentary measurement fluctuations.",
        },
        {
          title: "Migration to Astro",
          text: "Moving to Astro reduced runtime weight and made the site more predictable for static publishing, route validation, and long-term maintenance.",
        },
        {
          title: "Migration to Cloudflare",
          text: "Moving to Cloudflare Pages created cleaner infrastructure, direct domain control, a preview/live workflow, and removal of the active dependency on the former external asset layer.",
        },
        {
          title: "SEO and GEO readiness",
          text: "Metadata, canonical, hreflang, sitemap, schema, social preview, and llms files are structured for search, AI search, and real indexing. An active Content-Signal policy and Markdown content negotiation were added for the primary public pages.",
        },
        {
          title: "Visual System",
          text: "The site keeps the Panton typography, monochrome editorial direction, logotype-only social preview logic, and a minimal visual system without decorative noise.",
        },
        {
          title: "Galleries and mobile stability",
          text: "The project archive went through PNG optimisation, bounded web derivatives, portrait/landscape logic for mockup sections, and dedicated iPhone/Safari stability iterations.",
        },
        {
          title: "Motion system",
          text: "The case study includes an archive of 155 optimized logo intro and animation variants with poster frames and deferred loading, keeping the motion development accessible without weighing down the initial page load.",
        },
        {
          title: "Results",
          text: "d-media.org works as its own case study: a brand system, real applications, content, project and motion archives, and a web platform built on the same standards we offer.",
        },
      ],
    },
    "support-account": {
      summary: "Corporate identity for an accounting business with a clear and structured professional presence.",
      context: "The selection shows the core mark and logotypes in their key versions, together with the business card as a real print application of the identity.",
      focus: [
        "Original and Bulgarian logotype",
        "Transparent logo version for direct application",
        "Business card — front and back",
      ],
      caseStudySections: [
        {
          title: "Brief",
          text: "The identity had to establish a professional presence for an accounting business and remain clear across corporate, print, and digital applications.",
        },
        {
          title: "System",
          text: "The work includes a mark, original and Bulgarian logotypes, business-card applications, and a motion version built as one consistent visual system.",
        },
        {
          title: "Result",
          text: "The brand gains a recognisable, calm presence suited to daily business communication and short digital formats.",
        },
      ],
    },
    "support-account-group": {
      summary: "Corporate identity for a second brand within the same accounting activity.",
      context: "The selection is reduced to the two core transparent files that keep the link to Support Account clear while preserving the group’s separate positioning.",
      focus: [
        "Transparent logotype for corporate use",
        "Combined transparent mark for direct application",
        "A clear visual link to Support Account without mixing the two brands",
      ],
    },
    yanita: {
      summary: "Beauty identity presented through the core transparent logo versions.",
      context: "The current archive keeps the sign in its original, dark, and light transparent versions, without the later applied formats.",
      focus: [
        "Original transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "zlatimira-u": {
      title: "zlatimira.u",
      summary: "A decorative emblem for zlatimira.u, developed in light and dark variants.",
      context: "The available materials document the creation of a decorative mark in light and dark variants.",
      focus: [
        "Decorative emblem",
        "Light variant",
        "Dark variant",
      ],
      images: [
        {
          src: "/optimized-assets/project-web/main/zlatimira-u/01-zlatimira-u-dark.webp",
          label: "zlatimira.u — dark variant",
        },
        {
          src: "/optimized-assets/project-web/main/zlatimira-u/02-zlatimira-u-light.webp",
          label: "zlatimira.u — light variant",
        },
      ],
    },
    aneliart: {
      summary: "An authorial mark with a clean silhouette and organised transparent versions for different backgrounds.",
      context: "The archive now holds the main sign in transparent, black, and white variants instead of a single export.",
      focus: [
        "Primary transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "boris-lilov-photography": {
      summary: "Photography identity represented through the core transparent versions of the system.",
      context: "The selection is now focused on the combined mark, the logotype, and the standalone logo in transparent files.",
      focus: [
        "Combined transparent mark",
        "Transparent logotype",
        "Transparent logo sign",
      ],
      caseStudySections: [
        {
          title: "Brief",
          text: "The photography identity needed an authorial character without competing with the images or the photographer’s work.",
        },
        {
          title: "Approach",
          text: "The system uses a combined mark, a standalone logotype, and a separate symbol so it can work across photographs, covers, and motion materials.",
        },
        {
          title: "Result",
          text: "The outcome is a clean visual signature with enough flexibility for a portfolio, social channels, and video presentation.",
        },
      ],
    },
    diana: {
      summary: "Identity for a handmade decorations brand for celebrations and events.",
      context: "The direction called for a softer, more festive presence that would still remain legible and organised across formats.",
      focus: [
        "Original transparent mark",
        "Variant with a white type treatment",
        "Black and white transparent versions",
      ],
    },
    "dj-nedi": {
      summary: "Visual package for a DJ with cover art, video materials, and YouTube use.",
      context: "The project focused on digital presence, where the mark, cover art, and the materials around the video release had to work together.",
      focus: [
        "Black transparent logo version",
        "White transparent logo version",
        "Transparent Dynamite cover artwork",
      ],
    },
    "dj-just-mp": {
      summary: "DJ identity shown through the three core transparent versions of the mark.",
      context: "The selection is reduced to the original, black, and white transparent exports to preserve the cleanest reading of the system.",
      focus: [
        "Original transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "enduro-team-stoletovo": {
      summary: "A mark for an off-road team, kept here through its primary transparent export.",
      context: "The current archive keeps only the original transparent file, which carries the club character most cleanly.",
      focus: [
        "Primary transparent mark",
        "A clearly expressed club character",
        "Direct application across different materials",
      ],
    },
    "galka-nails": {
      summary: "A compact beauty mark with a direct name and quick recognition.",
      context: "The project was reduced to its cleanest form without losing character or usability.",
      focus: [
        "One core brand asset",
        "Transparent version for application",
        "A clean beauty mark with a direct presence",
      ],
    },
    gosmile: {
      summary: "A visual package for a product with clean monochrome versions and a clear name.",
      context: "The task was to bring the name forward with maximum legibility and a clean product-oriented visual frame.",
      focus: [
        "Black and white logo version",
        "Clear product positioning",
        "Minimal and easy-to-apply visual system",
      ],
    },
    "j-v": {
      summary: "Identity for a clothing label with a clean fashion character.",
      context: "The project aimed for a more editorial reading in which the mark could feel confident without unnecessary complication.",
      focus: [
        "Core logo variants",
        "Mockup context for a more realistic brand setting",
        "A clean and editorial fashion character",
      ],
    },
    "makeup-by-tsvetomira": {
      summary: "An early-stage identity for make-up services.",
      context: "This project established the first visual foundation before the brand evolved into a more developed direction.",
      focus: [
        "Initial logo asset",
        "A link to the later evolution into TS makeup",
        "An early beauty visual framework",
      ],
    },
    "mis-18": {
      summary: "Identity for a customs agency, presented through the primary mark and business cards.",
      context: "The project was built for an administrative and logistics setting, where legibility and a clear professional image were essential.",
      focus: [
        "Primary transparent logo export",
        "Business card — front and back",
        "A clean sign for a professional setting",
      ],
      links: [
        {
          href: "https://www.customsagencymis.com/",
          label: "Visit the MIS 18 website",
        },
      ],
    },
    "photo-workshop": {
      title: "Foto Rabotilnichka",
      summary: "Identity for Foto Rabotilnichka as a photography studio, with versions for different applications.",
      context: "The solution needed to bring the studio’s photographic character into a calm, clean visual framework.",
      focus: [
        "Colour transparent logo version",
        "White transparent version",
        "A calm photographic visual language",
      ],
    },
    "plamena-nails": {
      summary: "A beauty mark with colour variants and a clearly decorative presence.",
      context: "The project centred on one sign in several colour versions, prepared for different surfaces and immediate use.",
      focus: [
        "Several colour variants",
        "Transparent files for easy application",
        "A light, decorative beauty tone",
      ],
    },
    "pp-hairstyle": {
      summary: "A beauty brand with clear versions for everyday use.",
      context: "The project had to bring the name forward in a clean and recognisable way across the core applications of the service.",
      focus: [
        "Primary transparent logo file",
        "A lighter beauty service character",
        "Clear practical application",
      ],
    },
    "sport-fishing-stoletovo": {
      title: "Sport Fishing Stoletovo",
      summary: "Identity for a sport fishing venue with direct character and clear application versions.",
      context: "The solution aimed for a clearer presence for the place itself without losing force in real use.",
      focus: [
        "Original transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "stanulovi-s-house": {
      summary: "A compact sign for a guest house with a clean and clear wordmark.",
      context: "The project focused on direct recognition and a calm presence in the core applications of a hospitality place.",
      focus: [
        "One primary visual export",
        "A clean combination of name and sign",
        "Easy application in core contexts",
      ],
    },
    "ts-makeup": {
      summary: "A more developed stage in the shift from d . media to Makeup by Tsvetomira, resolved through a cleaner beauty sign.",
      context: "This is the more mature stage of the rebrand, where the earlier direction was gathered into a more precise and confident solution for Makeup by Tsvetomira.",
      focus: [
        "Lasercut transparent variant",
        "Transparent version with shadow",
        "A more mature beauty visual language after the move into the new name",
      ],
    },
    kdj: {
      summary: "Identity with several colour-led transparent versions for direct digital and stage use.",
      context: "The archive gathers the four core transparent exports, showing the colour range and the sign’s behaviour on different backgrounds.",
      focus: [
        "Electric green transparent version",
        "Electric orange transparent version",
        "Black and white transparent versions",
      ],
    },
    "tanev-car-detailing": {
      title: "TANEV Car Detailing",
      summary: "Car detailing identity kept through the main transparent versions of the sign.",
      context: "The selection is reduced to the original, black, and white transparent exports so the clean working system of the mark stays intact.",
      focus: [
        "Primary transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "elena-skevov-mua": {
      summary: "A project from the main d . media archive, added with the available original files and application materials.",
      context: "The archive shows the available files for Elena Skevov MUA, prepared as lightweight web images for fast browsing on the site.",
      focus: [
        "Original files from the project folder",
        "Optimized web versions for the site",
        "A preview of the available applications and working materials",
      ],
    },
    "monika-hristova": {
      summary: "A business-card project from the main d . media archive, added from the available PDF source.",
      context: "The archive shows the available Monika Hristova business-card file as a lightweight web preview for fast browsing on the site.",
      focus: [
        "Original file from the project folder",
        "Optimized web preview for the site",
        "Business-card material prepared for project browsing",
      ],
    },
    teti: {
      title: "Teti",
      summary: "A salon visual-material project from the main d . media archive, added with the available business-card and information files.",
      context: "The archive shows the available files for Teti, prepared as lightweight web images for fast browsing on the site.",
      focus: [
        "Business-card files from the project folder",
        "Salon price and working-time materials",
        "Optimized web versions for the site",
      ],
    },
    "syanka-ot-minaloto": {
      title: "Shadow from the Past",
      summary: "Visual identity for a YouTube channel and video-led content.",
      context: "The project was created for a strongly digital presence in which the mark and the channel application had to work together.",
      focus: [
        "Logo and a text-free variation",
        "Files for light backgrounds and mockup application",
        "A presence shaped for the YouTube environment",
      ],
      caseStudySections: [
        {
          title: "Origins and format",
          text: "Shadow from the Past launched in July 2025 as a collaborative project, with d . media taking part in developing its visual and audiovisual identity. During the active period, six videos were published—five main field episodes and a special ‘Behind the Scenes’ edition.",
        },
        {
          title: "Potential",
          text: "During its short active period, the channel reached approximately 4.8K views and 164 subscribers. Individual episodes showed potential to reach a significantly wider audience. The strongest result was ‘The Bunkers under the Mountain – Part 2’ with over 2,100 views; the available data shows that most of the audience was reached through YouTube’s recommendation mechanisms. This indicates potential in the concept and subject matter.",
        },
        {
          title: "Pause in development",
          text: "Despite these positive indicators, the project’s development has effectively stopped. The last publication was on 26 October 2025, meaning almost 11 months without new content. As a result, the moment when the channel began reaching viewers beyond its subscriber base was not used, and the consistency needed for the series’ sustained development was not established.",
        },
        {
          title: "Reason for withdrawal",
          text: "For d . media, co-production means not only contributing to individual materials, but also an actively developing project, consistency, and the possibility for the visual identity to support long-term content development. With the prolonged absence of new episodes, that premise no longer applies.",
        },
        {
          title: "Decision",
          text: "For this reason, d . media is withdrawing from future co-production of Shadow from the Past. This is not an assessment that the project failed—the available results indicate otherwise. The reason is the prolonged factual interruption of its active development and the lack of grounds for the studio to remain bound as co-producer to an inactive project.",
        },
        {
          title: "Materials and archive",
          text: "d . media retains a positive view of the work completed together and will not restrict use of the audio and visual materials already created and supplied, provided they are used in the form in which they were supplied. The identity and archive of Shadow from the Past can therefore remain part of the project after co-production ends.",
        },
      ],
      links: [
        {
          href: "https://www.youtube.com/@СЯНКА-ОТ-МИНАЛОТО",
          label: "Open the YouTube channel",
          title: "YouTube channel",
          text: "See the visual identity in use on the Shadow from the Past channel.",
        },
      ],
    },
  },
} as const;

function getEnglishProjectImages(project: (typeof projectPngArchive)[number]) {
  const localizedCopy = localizedProjectCopy.en[project.slug as keyof typeof localizedProjectCopy.en];
  return localizedCopy && "images" in localizedCopy ? localizedCopy.images : project.images;
}

export function getProjectPngArchive(locale: Locale) {
  if (locale === "bg") {
    return projectPngArchive.map((project) => ({
      ...project,
      images: [...project.images].sort((left, right) => {
        const leftOrder = getImageOrder(left.label ?? "");
        const rightOrder = getImageOrder(right.label ?? "");

        if (leftOrder !== rightOrder) {
          return leftOrder - rightOrder;
        }

        return 0;
      }),
    }));
  }

  return projectPngArchive.map((project) => ({
    ...project,
    ...localizedProjectCopy.en[project.slug as keyof typeof localizedProjectCopy.en],
    images: [...getEnglishProjectImages(project)].sort((left, right) => {
      const leftOrder = getImageOrder(left.label ?? "");
      const rightOrder = getImageOrder(right.label ?? "");

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return 0;
    }),
  }));
}
