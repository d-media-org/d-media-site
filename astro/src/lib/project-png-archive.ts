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
      "По-ранни Lighthouse стойности (Performance/Accessibility/Best Practices/SEO): мобилно 98/100/100/100; настолно 100/100/100/100",
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
        "text": "Наличната документация записва по-ранни стойности в категориите Performance/Accessibility/Best Practices/SEO: 98/100/100/100 на мобилни устройства и 100/100/100/100 на настолни. Датиран първичен отчет не е наличен, затова тези стойности не се представят като текущи или постоянни."
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
    "summary": "Визуалната идентичност на Yanita е представена чрез знака и подаръчни карти.",
    "context": "Галерията включва три варианта на знака и две подаръчни карти.",
    "focus": [
      "Три варианта на знака",
      "Две подаръчни карти"
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
    "context": "Галерията показва основни варианти на знака и логотипа, заедно с две визуализации.",
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
    "summary": "Авторски знак с изчистен силует, показан в прозрачна, черна и бяла версия.",
    "context": "Наличните материали показват знака в три варианта.",
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
      "Вариант със светло изписване",
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
    "summary": "Знак за ендуро отбор, показан в един прозрачен вариант.",
    "context": "Наличният материал показва един прозрачен вариант на знака.",
    "focus": [
      "Основен прозрачен знак",
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
    "summary": "Знак с надпис Galka’s Nails.",
    "context": "Наличният материал показва един вариант на знака на прозрачен фон.",
    "focus": [
      "Знак с надпис Galka’s Nails",
      "Един вариант на прозрачен фон"
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
    "summary": "Визуален знак с буквите J & V и цветни акценти.",
    "context": "Наличните материали показват няколко графични варианта и една визуализация.",
    "focus": [
      "Графични варианти на знака",
      "Визуализация"
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
    "summary": "Начална визуална идентичност за услуги по грим.",
    "context": "Галерията показва два варианта на знака, две визитки и визуализация с продукти.",
    "focus": [
      "Два варианта на знака",
      "Две визитки",
      "Визуализация с продукти"
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
    "summary": "Идентичност за митническа агенция, показана чрез знака, визитките и визуализацията.",
    "context": "Материалите включват прозрачен вариант на знака, визитки и негова визуализация.",
    "focus": [
      "Прозрачен вариант на знака",
      "Визитка — лице и гръб",
      "Визуализация на знака"
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
    "summary": "Знакът на Фото работилничка е показан в цветен и бял вариант.",
    "context": "Наличните материали показват двата цветови варианта на знака.",
    "focus": [
      "Цветен прозрачен вариант на знака",
      "Бяла прозрачна версия"
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
    "summary": "Знакът на Plamena Nails е показан в сиво, червено и виолетово.",
    "context": "Наличните материали показват три цветови версии на знака.",
    "focus": [
      "Няколко цветови варианта",
      "Прозрачни файлове",
      "Декоративно оформление"
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
    "summary": "Знакът на PP Hairstyle е показан в наличния прозрачен файл.",
    "context": "Наличният материал показва една версия на знака.",
    "focus": [
      "Прозрачен файл на знака"
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
    "summary": "Знакът за Спортен риболов Столетово е показан в цветови варианти.",
    "context": "Материалите включват оригиналния, черния и белия вариант, както и визуализация, която не доказва реално производство или употреба.",
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
    "summary": "Знак с името Stanulovi’s House.",
    "context": "Наличният материал показва един вариант на знака.",
    "focus": [
      "Един вариант на знака с изписано име"
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
    "summary": "Знакът TS makeup е показан в два варианта: лазерно изрязан и със сянка.",
    "context": "Наличните материали показват лазерно изрязан вариант и вариант със сянка.",
    "focus": [
      "Лазерно изрязан прозрачен вариант",
      "Прозрачна версия със сянка",
      "Два налични варианта на знака"
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
    "summary": "Знакът KDJ е показан в зелена, оранжева, черна и бяла версия.",
    "context": "Материалите показват четири прозрачни цветови варианта на знака.",
    "focus": [
      "Зелена прозрачна версия",
      "Оранжева прозрачна версия",
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
    "summary": "Знак за автомобилно детайлиране на TANEV в цветен, черен и бял вариант.",
    "context": "Наличните материали показват трите прозрачни версии на знака.",
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
    "summary": "Копродукция на YouTube канал с аудио- и визуални материали, рекламни и графични елементи и постпродукция.",
    "context": "Проектът беше създаден за силно дигитално присъствие, в което знакът и каналната употреба трябва да работят заедно.",
    "focus": [
      "Лого и вариант без текст",
      "Файлове за светъл фон и мокъп приложение",
      "Присъствие, ориентирано към YouTube среда"
    ],
    "caseStudySections": [
      {
        "title": "Начало и формат",
        "text": "„Сянка от миналото“ стартира през юли 2025 г. като копродукция с участието на d . media. В активния период са публикувани шест основни дълги видеа — пет теренни епизода и едно издание „Зад кадър“, както и седем кратки видеа."
      },
      {
      "title": "Резултати на канала",
      "text": "За периода 1 юли 2025 г. – 26 септември 2026 г. каналът отчита 5 708 гледания и 435 часа, 1 минута и 54 секунди време на гледане. От тях 5 188 (90,89%) са органични, а 520 (9,11%) са платени и са свързани с популяризирането на епизод 2. Функциите за разглеждане и предложените видеоклипове носят общо 3 378 гледания (59,18%). Нетната промяна в броя на абонатите за периода е +164. Най-гледаното основно видео е „Бункерите под планината – част 2“, публикувано на 31 август 2025 г.: 2 126 гледания и 223 часа и 27 минути гледане. При него 92,38% от гледанията идват от функциите за разглеждане и предложените видеоклипове, 95,63% са от зрители без абонамент, а нетният принос е +27 абоната."
      },
      {
        "title": "Прекъсване на развитието",
      "text": "Последното основно видео е публикувано на 26 октомври 2025 г. До 26 септември 2026 г. каналът е получил още 1 401 гледания, 133 часа и 56 минути време на гледане и +6 нетни абоната. Тези стойности описват канала за посочения период, без да приписват резултатите на отделен участник."
      },
      {
        "title": "Участие на d . media",
      "text": "d . media създава всички аудио-, визуални, рекламни и графични елементи и извършва обработката и постпродукцията на съдържанието за канала. Заснемането не е извършвано от d . media."
      },
      {
        "title": "Решение",
      "text": "d . media прекратява бъдещото си участие като копродуцент на „Сянка от миналото“. Това е решение на d . media за собственото ѝ бъдещо участие."
      },
      {
        "title": "Материали и архив",
      "text": "От страна на d . media няма ограничение вече предоставените аудио- и визуални материали да продължат да бъдат използвани във вида, в който са предоставени. Това не заявява прехвърляне на права върху материали на трети лица."
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
  bg: {
    "monika-hristova": {
      summary: "Дизайн на визитка за Monika Hristova, съчетаващ знак, име и обозначение ColorExpert.",
      context: "Показаната визитка съчетава графичен знак и името Monika Hristova с обозначението ColorExpert.",
      focus: ["Графичен знак", "Име и обозначение ColorExpert", "Дизайн на визитка"],
    },
    teti: {
      summary: "Визуални материали за салон, представени чрез визитки, ценова листа и работно време.",
      context: "Галерията включва четири визитки, ценова листа и информация за работното време на салона.",
      focus: ["Четири визитки", "Ценова листа", "Работно време на салона"],
    },
  },
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
        "Earlier documented Lighthouse scores (Performance/Accessibility/Best Practices/SEO): 98/100/100/100 on mobile; 100/100/100/100 on desktop",
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
          text: "The available documentation records earlier scores for Performance/Accessibility/Best Practices/SEO of 98/100/100/100 on mobile and 100/100/100/100 on desktop. No dated primary report is available, so these scores are not presented as current or permanent.",
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
      context: "The gallery shows core mark and logotype variants alongside two visualisations.",
      focus: [
        "Transparent logotype for corporate use",
        "Combined transparent mark for direct application",
        "A clear visual link to Support Account without mixing the two brands",
      ],
    },
    yanita: {
      summary: "Yanita’s visual identity is presented through the mark and gift cards.",
      context: "The gallery includes three mark variants and two gift cards.",
      focus: [
        "Three mark variants",
        "Two gift cards",
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
      summary: "An authorial mark with a clean silhouette, shown in transparent, black, and white variants.",
      context: "The available materials show the mark in three versions.",
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
    },
    diana: {
      summary: "Identity for a handmade decorations brand for celebrations and events.",
      context: "The direction called for a softer, more festive presence that would still remain legible and organised across formats.",
      focus: [
        "Original transparent mark",
        "Light lettering variant",
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
      context: "The available files show the original, black, and white transparent versions of the mark.",
      focus: [
        "Original transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "enduro-team-stoletovo": {
      summary: "A mark for Enduro Team Stoletovo, shown in one transparent version.",
      context: "The available material shows one transparent version of the mark.",
      focus: [
        "Primary transparent mark",
      ],
    },
    "galka-nails": {
      summary: "A mark bearing the name Galka’s Nails.",
      context: "The available material shows one version of the mark on a transparent background.",
      focus: [
        "Mark bearing the name Galka’s Nails",
        "One transparent version",
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
      summary: "A visual mark built around the letters J & V and colour accents.",
      context: "The available materials show several graphic versions and one visualisation.",
      focus: [
        "Graphic versions of the mark",
        "Visualisation",
      ],
    },
    "makeup-by-tsvetomira": {
      summary: "An initial visual identity for make-up services.",
      context: "The gallery shows two mark variants, two business cards, and a product visualisation.",
      focus: ["Two mark variants", "Two business cards", "Product visualisation"],
    },
    "mis-18": {
      summary: "Identity for a customs agency, shown through its mark, business cards, and a visualisation.",
      context: "The materials include a transparent mark, business cards, and a visualisation of the mark.",
      focus: ["Transparent mark", "Business card — front and back", "Mark visualisation"],
      links: [
        {
          href: "https://www.customsagencymis.com/",
          label: "Visit the MIS 18 website",
        },
      ],
    },
    "photo-workshop": {
      title: "Foto Rabotilnichka",
      summary: "The Foto Rabotilnichka mark is shown in colour and white versions.",
      context: "The available materials show two colour versions of the mark.",
      focus: [
        "Colour transparent mark version",
        "White transparent version",
        "A calm photographic visual language",
      ],
    },
    "plamena-nails": {
      summary: "The Plamena Nails mark is shown in grey, red, and violet.",
      context: "The available materials show three colour versions of the mark.",
      focus: [
        "Several colour variants",
        "Transparent files",
        "Decorative treatment",
      ],
    },
    "pp-hairstyle": {
      summary: "The PP Hairstyle mark is shown in the available transparent file.",
      context: "The available material shows one version of the mark.",
      focus: [
        "Transparent mark file",
      ],
    },
    "sport-fishing-stoletovo": {
      title: "Sport Fishing Stoletovo",
      summary: "The Sport Fishing Stoletovo mark is shown in several colour versions.",
      context: "The materials include the original, black, and white versions, plus a visualization that does not prove real-world production or use.",
      focus: [
        "Original transparent mark",
        "Black transparent version",
        "White transparent version",
      ],
    },
    "stanulovi-s-house": {
      summary: "A mark bearing the name Stanulovi’s House.",
      context: "The available material shows one version of the mark.",
      focus: [
        "One version of the mark with the name",
      ],
    },
    "ts-makeup": {
      summary: "The TS makeup mark is shown in two versions: laser-cut and with a shadow.",
      context: "The available materials show a laser-cut version and a version with a shadow.",
      focus: [
        "Laser-cut transparent variant",
        "Transparent version with shadow",
        "Two available versions of the mark",
      ],
    },
    kdj: {
      summary: "The KDJ mark is shown in green, orange, black, and white versions.",
      context: "The materials show four transparent colour versions of the mark.",
      focus: [
        "Green transparent version",
        "Orange transparent version",
        "Black and white transparent versions",
      ],
    },
    "tanev-car-detailing": {
      title: "TANEV Car Detailing",
      summary: "The TANEV mark for car detailing is shown in colour, black, and white versions.",
      context: "The available materials show three transparent versions of the mark.",
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
      summary: "Business-card design for Monika Hristova, combining a mark, her name, and the ColorExpert designation.",
      context: "The displayed card combines a graphic mark and the name Monika Hristova with the ColorExpert designation.",
      focus: ["Graphic mark", "Name and ColorExpert designation", "Business-card design"],
    },
    teti: {
      title: "Teti",
      summary: "Visual materials for a salon, shown through business cards, a price list, and working hours.",
      context: "The gallery includes four business cards, a price list, and the salon’s working hours.",
      focus: ["Four business cards", "Price list", "Salon working hours"],
    },
    "syanka-ot-minaloto": {
      title: "Shadow from the Past",
      summary: "YouTube channel co-production with audio and visual materials, advertising and graphic elements, plus post-production.",
      context: "The project was created for a strongly digital presence in which the mark and the channel application had to work together.",
      focus: [
        "Logo and a text-free variation",
        "Files for light backgrounds and mockup application",
        "A presence shaped for the YouTube environment",
      ],
      caseStudySections: [
        {
          title: "Origins and format",
          text: "Shadow from the Past launched in July 2025 as a co-production involving d . media. During the active period, six main long-form videos were published—five field episodes and one ‘Behind the Scenes’ edition—along with seven Shorts.",
        },
        {
          title: "Channel results",
          text: "For 1 July 2025–26 September 2026, the channel recorded 5,708 views and 435 hours, 1 minute, and 54 seconds of watch time. Of these, 5,188 (90.89%) were organic and 520 (9.11%) were paid, associated with promotion of episode 2. Browse features and suggested videos brought 3,378 views (59.18%) combined. Net subscriber change for the period was +164. The most-viewed main video was ‘The Bunkers under the Mountain – Part 2’, published on 31 August 2025: 2,126 views and 223 hours, 27 minutes of watch time. Browse features and suggested videos accounted for 92.38% of its views; 95.63% came from non-subscribed viewers, and it brought a net +27 subscribers.",
        },
        {
          title: "Pause in development",
          text: "The last main video was published on 26 October 2025. By 26 September 2026, the channel had received another 1,401 views, 133 hours and 56 minutes of watch time, and a net +6 subscribers. These figures describe the channel during that period and do not attribute the results to any one participant.",
        },
        {
          title: "d . media's contribution",
          text: "d . media created all audio, visual, advertising, and graphic elements, and handled the processing and post-production of the channel content. Filming was not carried out by d . media.",
        },
        {
          title: "Decision",
          text: "d . media is ending its future participation as a co-producer of Shadow from the Past. This is d . media’s decision about its own future involvement.",
        },
        {
          title: "Materials and archive",
          text: "d . media does not restrict continued use of audio and visual materials already supplied by d . media, in the form in which they were supplied. This does not state a transfer of rights to materials belonging to third parties.",
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
      ...localizedProjectCopy.bg[project.slug as keyof typeof localizedProjectCopy.bg],
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
