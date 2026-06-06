import type { Locale } from "@/lib/i18n";

type LegalNode = {
  id: string;
  title?: string;
  content?: readonly string[];
  bullets?: readonly string[];
  tail?: readonly string[];
  subsections?: readonly LegalNode[];
};

export type LegalSection = LegalNode;

const privacyPolicy = {
  bg: [
    {
      id: "0",
      title: "",
      content: [
        "d . media осъществява дейността си в съответствие със Закона за защита на личните данни и Регламент (ЕС) 2016/679. Настоящата политика информира всеки Клиент относно обработването на данни, чрез които се идентифицира или може да се идентифицира.",
        "Администратор на лични данни -",
        "d . media",
      ],
    },
    {
      id: "1",
      title: "Видове обработвани лични данни",
      content: ["1.1. d . media обработва следните групи лични данни:"],
      bullets: [
        "физическа идентичност: имена, адрес, телефон;",
        "(2) финансова идентичност: информация за номер на банкова сметка (IBAN);",
        "(3) дигитална идентичност: e-mail адрес, IP адрес, MAC адрес / идентификатори на устройства, бисквитки (cookies) и пиксели за проследяване, ID на акаунти (в социални мрежи, уебсайтове, приложения)",
      ],
    },
    {
      id: "2",
      title: "Източници на събиране на лични данни",
      content: ["2.1. d . media обработва следните групи лични данни:"],
      bullets: [
        "(1) от PayPal: e-mail адрес, адрес, телефонен номер и други публично видими данни, предоставени доброволно;",
        "(2) от Facebook: e-mail адрес, име, дата на раждане и други публично видими данни, предоставени доброволно;",
        "(3) от e-mail бюлетин: e-mail адрес, име (ако е посочено) и IP адрес;",
        "(4) при извършени услуги: e-mail адрес, име, адрес, телефонен номер.",
      ],
    },
    {
      id: "3",
      title: "Обработване на специални категории лични данни",
      content: ["3.1. d . media не обработва специални категории лични данни на Клиентите."],
    },
    {
      id: "4",
      title: "Цели за обработване на личните данни",
      content: ["4.1. d . media обработва лични данни със следните цели:"],
      bullets: [
        "(1) предоставяне на информация и съдействие, поискано от вас;",
        "(2) анализ на поведението на потребителите за предоставяне на по-релевантно съдържание;",
        "(3) индивидуализиране и контакт с клиентите;",
        "(4) за всички дейности, свързани със съществуването, изменението и прекратяването на договорни отношения;",
        "(5) предлагане и промотиране на допълнителни услуги;",
        "(6) спазване на регулаторните изисквания;",
        "(7) осъществяване на защита при възникнал спор.",
      ],
    },
    {
      id: "5",
      title: "Правно основание за обработване на лични данни",
      bullets: [
        "(1) за изпълнението на договор или за встъпване в преддоговорни отношения;",
        "(2) за спазването на законово задължение;",
        "(3) за целите на легитимни интереси на d . media;",
        "(4) при условията на доброволно дадено съгласие.",
      ],
    },
    {
      id: "6",
      title: "Срок за съхраняване на лични данни",
      content: [
        "6.1. d . media съхранява личните данни по време на договорните отношения и за преходен период след това. Ако се инициира съдебно действие, данните могат да бъдат съхранявани до края на такова действие. Данни, обработвани на основание съгласие, се обработват до неговото оттегляне.",
        "6.2. Съхранението се извършва при спазване на принципите за минимизация, точност, ограничение във времето и сигурност.",
        "6.3. След изтичане на съответните срокове данните се изтриват или анонимизират по сигурен начин.",
        "6.4. Срокове за съхранение на лични данни в зависимост от нуждата от тях са:",
      ],
      bullets: [
        "(1) Клиентски данни (услуги/договори): до 5 години след приключване на договора.",
        "(2) Счетоводни документи (фактури, разписки, договори, платежни документи): 10 години.",
        "(3) Данни от комуникация (e-mail кореспонденции, форми за контакт): до 1 година след приключване на кореспонденцията.",
        "(4) Маркетинг данни (e-mail бюлетини, абонаменти): до оттегляне на съгласието.",
        "(5) Доставчици и партньори: 5 години след приключване на взаимоотношенията.",
        "(6) GDPR съгласия: докато трае съгласието + 2 години за доказателство.",
      ],
    },
    {
      id: "7",
      title: "Изтриване или анонимизиране на данните",
      content: [
        "7.1. Изтриване на данните е процес, в който данните се премахват по такъв начин, че не могат да бъдат възстановени.",
        "7.2. Методите на изтриване на данните са следните:",
      ],
      bullets: [
        "(1) Логическо изтриване – триене от бази данни/системи.",
        "(2) Физическо унищожаване – хартиени документи чрез шредиране или изгаряне;",
        "(3) Сигурно изтриване от носители – използване на софтуер за overwrite;",
        "(4) Премахване от архиви – данните се изтриват и от резервни копия, когато срокът изтече.",
      ],
      tail: [
        "7.3. Анонимизацията на данните е процес, в който данните се обработват така, че да не могат да се свържат обратно с конкретно лице.",
        "7.4. Примери за анонимизация могат да бъдат:",
      ],
    },
    {
      id: "7.4",
      title: "",
      bullets: [
        "(1) замяна на имена с кодове или идентификатори, които нямат ключ за връзка;",
        "(2) премахване на уникални идентификатори (e-mail адрес, телефон);",
        "(3) агрегиране на данни (например 10 потребители от София вместо списък с имена).",
      ],
    },
    {
      id: "8",
      title: "Споделяне на лични данни",
      content: [
        "8.1. Лични данни могат да бъдат предоставени на регулаторни, данъчни, съдебни и други органи в съответствие с приложимото право.",
        "8.2. Данни могат да се предоставят на обработващи като платежни доставчици, Meta и хостинг доставчици, когато е необходимо.",
      ],
    },
    {
      id: "9",
      title: "Защита на лични данни",
      content: [
        "9.1. d . media поддържа подходящи технически и организационни мерки за защита на личните данни. Информацията се съхранява физически на собствени средства за съхранение на данни, локализирани на седалището на d . media.",
      ],
    },
    {
      id: "10",
      title: "Извършване на автоматизирано вземане на решения",
      content: ["10.1. d . media не извършва автоматизирано взимане на решения с данни."],
    },
    {
      id: "11",
      title: "Права на клиентите",
      content: ["11.1. Всеки Клиент може да упражни следните права с писмено съобщение до d . media:"],
      bullets: [
        "(1) Право на оттегляне на съгласието.",
        "(2) Право на достъп.",
        "(3) Право на коригиране.",
        "(4) Право на изтриване.",
        "(5) Право на ограничаване на обработването.",
        "(6) Право на възражение.",
        "(7) Право на преносимост на данните.",
      ],
    },
    {
      id: "12",
      title: "Информирано съгласие",
      content: [
        "12.1. Събирането на лични данни започва с инициирането на преддоговорни или договорни отношения. В договора за услуги изрично се записва, че Клиентът се съгласява данните му да бъдат събирани и съхранявани съгласно тази Политика.",
      ],
    },
  ] as LegalSection[],
  en: [
    {
      id: "0",
      title: "",
      content: [
        "d . media conducts its activity in accordance with the Personal Data Protection Act and Regulation (EU) 2016/679. This policy informs every Client about the processing of data through which a person is or may be identified.",
        "Data controller -",
        "d . media",
      ],
    },
    {
      id: "1",
      title: "Types of personal data processed",
      content: ["1.1. d . media processes the following groups of personal data:"],
      bullets: [
        "physical identity: names, address, telephone number;",
        "(2) financial identity: bank account information (IBAN);",
        "(3) digital identity: e-mail address, IP address, MAC address / device identifiers, cookies, tracking pixels, and account IDs in social networks, websites, or applications.",
      ],
    },
    {
      id: "2",
      title: "Sources of personal data collection",
      content: ["2.1. d . media processes the following groups of personal data:"],
      bullets: [
        "(1) from PayPal: e-mail address, address, telephone number, and other publicly visible data provided voluntarily;",
        "(2) from Facebook: e-mail address, name, date of birth, and other publicly visible data provided voluntarily;",
        "(3) from e-mail newsletter forms: e-mail address, name if provided, and IP address;",
        "(4) in connection with services rendered: e-mail address, name, address, and telephone number.",
      ],
    },
    {
      id: "3",
      title: "Processing of special categories of personal data",
      content: ["3.1. d . media does not process special categories of personal data of Clients."],
    },
    {
      id: "4",
      title: "Purposes of personal data processing",
      content: ["4.1. d . media processes personal data for the following purposes:"],
      bullets: [
        "(1) providing information and assistance requested by you;",
        "(2) analysing user behaviour to provide more relevant content;",
        "(3) identification and contact with clients;",
        "(4) all activities related to the existence, amendment, and termination of contractual relations;",
        "(5) offering and promoting additional services;",
        "(6) complying with regulatory requirements;",
        "(7) protecting rights in the event of a dispute.",
      ],
    },
    {
      id: "5",
      title: "Legal basis for processing personal data",
      bullets: [
        "(1) for the performance of a contract or entry into pre-contractual relations;",
        "(2) for compliance with a legal obligation;",
        "(3) for the purposes of the legitimate interests of d . media;",
        "(4) on the basis of freely given consent.",
      ],
    },
    {
      id: "6",
      title: "Retention period for personal data",
      content: [
        "6.1. d . media stores personal data during contractual relations and for a transitional period thereafter. If legal action is initiated, data may be retained until the end of such action. Data processed on the basis of consent is processed until consent is withdrawn.",
        "6.2. Retention is carried out in compliance with the principles of minimisation, accuracy, storage limitation, and security.",
        "6.3. After the relevant periods expire, data is deleted or anonymised securely.",
        "6.4. Retention periods for personal data according to operational need are:",
      ],
      bullets: [
        "(1) client data (services / agreements): up to 5 years after completion of the agreement;",
        "(2) accounting documents (invoices, receipts, agreements, payment documents): 10 years;",
        "(3) communication data (e-mail correspondence, contact forms): up to 1 year after correspondence ends;",
        "(4) marketing data (newsletter subscriptions): until consent is withdrawn;",
        "(5) suppliers and partners: 5 years after the relationship ends;",
        "(6) GDPR consents: for the duration of the consent plus 2 years for evidence.",
      ],
    },
    {
      id: "7",
      title: "Deletion or anonymisation of data",
      content: [
        "7.1. Data deletion is a process in which data is removed in such a way that it cannot be restored.",
        "7.2. The methods of deletion are as follows:",
      ],
      bullets: [
        "(1) logical deletion from databases and systems;",
        "(2) physical destruction of paper documents through shredding or incineration;",
        "(3) secure deletion from storage media through overwrite software;",
        "(4) removal from backups when the retention period expires.",
      ],
      tail: [
        "7.3. Data anonymisation is a process in which data is processed so that it can no longer be linked back to a specific person.",
        "7.4. Examples of anonymisation include:",
      ],
    },
    {
      id: "7.4",
      title: "",
      bullets: [
        "(1) replacing names with codes or identifiers without a matching key;",
        "(2) removing unique identifiers such as e-mail address or telephone number;",
        "(3) aggregating data, for example 10 users from Sofia instead of a list of names.",
      ],
    },
    {
      id: "8",
      title: "Sharing of personal data",
      content: [
        "8.1. Personal data may be provided to regulatory, tax, judicial, and other authorities in accordance with applicable law.",
        "8.2. Data may be provided to processors such as payment providers, Meta, or hosting providers where necessary.",
      ],
    },
    {
      id: "9",
      title: "Personal data protection",
      content: [
        "9.1. d . media maintains appropriate technical and organisational measures for the protection of personal data. Information is stored on dedicated data storage devices located at the seat of d . media.",
      ],
    },
    {
      id: "10",
      title: "Automated decision-making",
      content: ["10.1. d . media does not carry out automated decision-making using personal data."],
    },
    {
      id: "11",
      title: "Rights of clients",
      content: ["11.1. Every Client may exercise the following rights by written notice to d . media:"],
      bullets: [
        "(1) the right to withdraw consent;",
        "(2) the right of access;",
        "(3) the right to rectification;",
        "(4) the right to erasure;",
        "(5) the right to restriction of processing;",
        "(6) the right to object;",
        "(7) the right to data portability.",
      ],
    },
    {
      id: "12",
      title: "Informed consent",
      content: [
        "12.1. The collection of personal data begins with the initiation of pre-contractual or contractual relations. The service agreement expressly records that the Client agrees for their data to be collected and stored under this Policy.",
      ],
    },
  ] as LegalSection[],
};

const termsContent = {
  bg: [
    {
      id: "1",
      title: "ПРЕДМЕТЕН ОБХВАТ и общи положения",
      bullets: [
        "1.1. С иницииране на преддоговорни и/или договорни отношения Клиентът декларира, че е запознат и приема настоящите условия.",
        "1.2. Условията се прилагат към всички услуги на Изпълнителя.",
        "1.3. Настоящите Условия са задължителни за Изпълнителя и Клиента.",
        "1.4. При противоречие със специални условия, предимство имат последните.",
        "1.5. Потвърдена оферта има силата на договор, когато съдържа ясно дефинирани параметри и изрично съгласие.",
        "1.6. d . media има право да откаже обслужване или изпълнение на заявка/оферта на услуга по собствена преценка, като предостави причините за отказа на Клиента.",
        "1.7. Документите (оферти, фактури и др.) са част от договорните отношения.",
        "1.8. Посочените в тези Условия:",
        "Ценоразпис на услугите,",
        "Договор за услуги,",
        "Анекс,",
        "Предварително изчисление и",
        "Фактура за извършени услуги",
        "са приложени като приложения (образци) в края на документа. Изключение прави Ценоразписа на услуги, който е с актуалните цени на услугите.",
      ],
    },
    {
      id: "2",
      title: "ДЕФИНИЦИИ",
      bullets: [
        "2.1. При прилагане и тълкуване на настоящите Условия, използваните термини и изрази ще имат следното значение:",
        "d . media - търговско наименование на Изпълнителя;",
        "Клиент – всяко лице, встъпило в договорни отношения;",
        "Материали – всички създадени проекти;",
        "Услуги – всички предоставяни услуги;",
        "Договор за услуги – подписан договор или изрично потвърдена оферта;",
        "Ценоразпис – актуален списък с услуги и цени.",
      ],
    },
    {
      id: "3",
      title: "ВЪЗЛАГАНЕ И СКЛЮЧВАНЕ НА ДОГОВОРИ",
      bullets: [
        "3.1. Възлагането се извършва чрез договор или потвърдена оферта.",
        "3.2. Офертите се изпращат писмено или по електронна поща.",
        "3.3. Потвърждението създава договорно обвързване.",
        "3.4. Комуникацията може да се извършва електронно.",
        "3.5. Електронно изявление се счита за валидно, освен ако не е доказано противното.",
        "3.6. Всички параметри се уговарят писмено.",
        "3.7. Кореспонденция по електронна поща се счита за договор само ако съдържа ясно съгласие и параметри.",
      ],
    },
    {
      id: "4",
      title: "ДОГОВОР ЗА УСЛУГИ, АНЕКСИ И ПРИЛОЖЕНИЯ",
      bullets: [
        "4.1. Договорът има приоритет.",
        "4.2. Може да бъде хартиен или дигитален.",
        "4.3. Валидност – подпис или изрично потвърждение.",
        "4.4. Анекси се създават при промени.",
        "4.5. При невъзможност за анекс се изготвя нов договор.",
        "4.6. Приложенията са част от договора.",
      ],
    },
    {
      id: "5",
      title: "УСЛУГИ: ОБЩИ И РАЗШИРЕНИ ДЕФИНИЦИИ",
      content: [
        "5.1. Според действащия Ценоразпис, услугите се делят на следните категории:",
        "5.2. Допълнителните начисления към услугите:",
      ],
      bullets: [
        "общи допълнителни начисления",
        "начисления за приоритет на поръчката",
        "такси за придобиване на авторски права",
      ],
      tail: ["5.3. Допълнителни разяснения към услугите:"],
      subsections: [
        {
          id: "5.3.1",
          content: [
            "5.3.1. Услугите по шаблон представляват услуги, чието съдържание и външен вид е предварително подготвен и Клиентът може да променя ограничена част от видът му и параметрите му. Промените се уговарят между Клиента и d . media.",
          ],
        },
        {
          id: "5.3.2",
          content: [
            "5.3.2. Услугите “по поръчка” представляват услуги, чието съдържание и външен вид зависи единствено от концепцията и идеите на Клиента.",
          ],
        },
        {
          id: "5.3.3",
          content: [
            "5.3.3. d . media извършва услугата до вид, готов за материално изработване (например принтиране) или визуализиране (например публикуване в дигитален вариант). Когато публикуването е поверено на d . media, всеки материал е с определен знак, показващ произхода му, освен ако не е уговорено друго.",
          ],
        },
        {
          id: "5.3.4",
          content: [
            "5.3.4. Клиентът има право да заяви премахване на обозначението за произход (white-label услуга) срещу допълнително заплащане съгласно Ценоразписа или изрична договорка между страните.",
          ],
        },
        {
          id: "5.3.5",
          content: [
            "5.3.5. d . media предава готовите материали във файлови формати, предварително уговорени с Клиента или във вид, приет за стандартен за съответния тип услуга.",
          ],
        },
        {
          id: "5.3.6",
          content: [
            "5.3.6. Сроковете за изработка на услугите са пряко зависими с Договора за услуги и са предварително уговорени с Клиента.",
          ],
        },
        {
          id: "5.4",
          title: "Разширени дефиниции на услугите и възможни параметри",
          subsections: [
            {
              id: "5.4.1",
              title: "Услуги за принтиране",
              bullets: [
                "едностранна визитка: визитка за лична или бизнес употреба с една страна.",
                "двустранна визитка: визитка за лична или бизнес употреба с две страни.",
                "едностранен ваучер (giftcard): ваучер за отстъпки, награди или подаръци с една страна.",
                "двустранен ваучер (giftcard): ваучер за отстъпки, награди или подаръци с две страни.",
                "брошура / флаер: информационна брошура с една страница (едностранна или двустранна), бигована брошура или флаер.",
                "други: менюта, информационни брошури с няколко страници, покани за събития и т.н.",
              ],
            },
            {
              id: "5.4.2",
              title: "Услуги за дигитални канали",
              bullets: [
                "корица за събитие за Facebook: дизайн за публикация с размери, специфични за корица за събитие.",
                "корица за профил / група / страница за Facebook: дизайн за корица с размери, специфични за корица.",
                "графичен дизайн в аспект 1:1: дизайн в квадратен аспект, подходящ за публикация в социални мрежи (Facebook, Instagram).",
                "графичен дизайн в аспект 9:16: дизайн в типичен аспект за стори (Facebook, Instagram).",
                "графичен дизайн за YouTube: дизайн за използване в YouTube (банер, thumbnail, корица и др.).",
              ],
              tail: [
                "Тези услуги могат да бъдат извършвани както по шаблон, така и по поръчка. Клиентите могат да изберат комбинация от три услуги на пакетна цена.",
              ],
            },
            {
              id: "5.4.3",
              title: "Услуги за визуална идентичност",
              bullets: [
                "дизайн на логотип: създаване на лого, базирано изключително на шрифт.",
                "дизайн на лого: създаване на дизайн на лого на физическо лице, бранд или др.",
                "дизайн на лого и логотип: комбинация от двете.",
                "Векторизиране на растерно лого и/или логотип: преобразуване на растерен проект във векторен.",
              ],
            },
            {
              id: "5.4.4",
              title: "Услуги за видео анимация по шаблон",
              bullets: [
                "анимация с лого и/или логотип до 5 секунди.",
                "анимация с лого и/или логотип до 10 секунди.",
                "анимация с лого и/или логотип над 10 секунди.",
              ],
            },
            {
              id: "5.4.5",
              title: "Допълнителни начисления",
              bullets: [
                "работа с клиент на място",
                "начисления за приоритет на поръчката",
                "премахване на обозначение за произход (white-label)",
              ],
            },
            {
              id: "5.4.6",
              title: "Такси за авторски права",
              content: [
                "Клиентът може да заплати годишна такса за придобиване на неизключителни или изключителни авторски права за срок до 10 години.",
              ],
            },
          ],
        },
        {
          id: "5.5",
          title: "Технически допълнения към услугите",
          bullets: [
            "5.5.1. Услугите от т. 5.4.1. се изработват на Adobe Photoshop и/или Adobe Illustrator и стандартно се предоставят като файлове .psd / .eps / .png в цветови модел CMYK с резолюция 300 dpi.",
            "5.5.2. Услугите от т. 5.4.2. се изработват на Adobe Photoshop и/или Adobe Illustrator и стандартно се предоставят като файлове .png в цветови модел RGB с резолюция 300 dpi.",
            "5.5.3. Услугите от т. 5.4.3. се изработват на Adobe Illustrator.",
            "5.5.4. Услугите от т. 5.4.4. се изработват на Final Cut Pro.",
            "5.5.5. d . media си запазва правото да използва друг софтуер или да променя техническите спецификации в полза на Клиента, след предварително съгласуване.",
          ],
        },
      ],
    },
    {
      id: "6",
      title: "ПРАВА И ЗАДЪЛЖЕНИЯ НА СТРАНИТЕ",
      subsections: [
        {
          id: "6.1",
          title: "Права на d . media",
          bullets: [
            "(1) Да изисква от Клиента предоставяне на необходимите материали.",
            "(2) Да не носи отговорност за грешки в предоставените материали.",
            "(3) Да увеличава сроковете при забавяне от страна на Клиента.",
            "(4) Да получи съдействие от Клиента.",
            "(5) Да използва материалите за портфолио след съгласуване.",
            "(6) Да използва подизпълнители.",
            "(7) Да откаже изпълнение при неплащане.",
            "(8) Да откаже услуги, противоречащи на закона.",
            "(9) Да счита работата за приета при липса на обратна връзка до 3 работни дни.",
            "(10) Да постави проект в изчакване при липса на комуникация над 7 дни.",
          ],
        },
        {
          id: "6.2",
          title: "Задължения на d . media",
          bullets: [
            "(1) Да изпълни работата качествено.",
            "(2) Да използва свои ресурси.",
            "(3) Да предоставя информация при поискване.",
          ],
        },
        {
          id: "6.3",
          title: "Права на Клиента",
          bullets: [
            "(1) Да получи качествена услуга.",
            "(2) Да контролира изпълнението.",
          ],
        },
        {
          id: "6.4",
          title: "Задължения на Клиента",
          bullets: [
            "(1) Да предостави материали.",
            "(2) Да заплати възнаграждението.",
            "(3) Липсата на възражение в срок от 3 работни дни се счита за приемане.",
          ],
        },
      ],
    },
    {
      id: "7",
      title: "СРОКОВЕ, ЦЕНИ И ПЛАЩАНИЯ",
      content: ["7.1. Срокове: съгласно договор."],
      subsections: [
        {
          id: "7.2",
          title: "Цени и плащания",
          bullets: [
            "(1) Цените се договарят в евро.",
            "(2) Посочват се и в лева по курс 1.95583.",
            "(3) Плащанията се извършват по договорен начин.",
          ],
        },
      ],
    },
    {
      id: "8",
      title: "МАТЕРИАЛИ, СЪДЪРЖАНИЕ И ИНТЕЛЕКТУАЛНА СОБСТВЕНОСТ",
      bullets: [
        "8.1. Материалите са защитени от закона.",
        "8.2. Клиентът носи отговорност за съдържанието.",
        "8.3. d . media запазва правата върху създадените материали.",
        "8.4. Клиентът получава право на използване съгласно договорката.",
      ],
    },
    {
      id: "9",
      title: "ОТГОВОРНОСТ И НЕУСТОЙКИ",
      bullets: [
        "9.1. d . media дължи 1% неустойка на ден при забавяне.",
        "9.2. Клиентът дължи 0.5% на ден при забавено плащане.",
        "9.3. При над 10 дни забавяне d . media може да прекрати договора.",
        "9.4. При отказ от страна на Клиента – 25% неустойка.",
        "9.5. При започната работа – дължи се извършеното.",
      ],
    },
    {
      id: "10",
      title: "ОГРАНИЧАВАНЕ НА ОТГОВОРНОСТТА (ФОРСМАЖОР)",
      bullets: [
        "10.1. Форсмажор е непредвидимо събитие извън контрола на страните.",
        "10.2. Страните се уведомяват взаимно.",
        "10.3. d . media не носи отговорност при такива обстоятелства.",
      ],
    },
    {
      id: "11",
      title: "СРОК И ПРЕКРАТЯВАНЕ НА ДОГОВОРА",
      bullets: [
        "11.1. Срокът се определя в договора.",
        "11.2. Прекратяване при изпълнение, съгласие или нарушение.",
      ],
    },
    {
      id: "12",
      title: "КОНФИДЕНЦИАЛНОСТ",
      bullets: [
        "12.1. Всички данни са конфиденциални.",
        "12.2. Използват се само за изпълнение.",
        "12.3. Разгласяването е забранено.",
      ],
    },
    {
      id: "13",
      title: "ДОПЪЛНИТЕЛНИ РАЗПОРЕДБИ",
      bullets: [
        "13.1. Условията могат да се променят по договорка.",
        "13.2. Непосочените случаи се решават по договорка.",
        "13.3. d . media обработва лични данни съгласно GDPR единствено за целите на изпълнение на услугите.",
        "13.4. Прилага се българското законодателство.",
      ],
    },
    {
      id: "14",
      title: "ПРИЛОЖИМО ПРАВО И СПОРОВЕ",
      bullets: [
        "14.1. Прилага се българското право.",
        "14.2. Споровете се решават от съда по седалището на изпълнителя.",
      ],
    },
  ] as LegalSection[],
  en: [
    {
      id: "1",
      title: "SCOPE AND GENERAL PROVISIONS",
      bullets: [
        "1.1. By initiating pre-contractual and/or contractual relations, the Client declares that they are aware of and accept these terms.",
        "1.2. The terms apply to all services of the Provider.",
        "1.3. These Terms are binding on the Provider and the Client.",
        "1.4. In the event of a conflict with specific terms, the latter prevail.",
        "1.5. A confirmed offer has the force of an agreement when it contains clearly defined parameters and explicit consent.",
        "1.6. d . media has the right to refuse service or execution of a request/offer for a service at its own discretion, while providing the reasons for the refusal to the Client.",
        "1.7. Documents (offers, invoices, etc.) form part of the contractual relationship.",
        "1.8. The following referred to in these Terms:",
        "Price List of Services,",
        "Service Agreement,",
        "Annex,",
        "Preliminary Estimate and",
        "Invoice for Performed Services",
        "are attached as annexes (templates) at the end of the document. An exception is the Price List of Services, which contains the current service prices.",
      ],
    },
    {
      id: "2",
      title: "DEFINITIONS",
      bullets: [
        "2.1. For the application and interpretation of these Terms, the terms and expressions used shall have the following meaning:",
        "d . media - trade name of the Provider;",
        "Client – any person who has entered into contractual relations;",
        "Materials – all created projects;",
        "Services – all services provided;",
        "Service Agreement – a signed agreement or an expressly confirmed offer;",
        "Price List – current list of services and prices.",
      ],
    },
    {
      id: "3",
      title: "COMMISSIONING AND CONCLUSION OF AGREEMENTS",
      bullets: [
        "3.1. Commissioning takes place through an agreement or a confirmed offer.",
        "3.2. Offers are sent in writing or by e-mail.",
        "3.3. Confirmation creates contractual commitment.",
        "3.4. Communication may take place electronically.",
        "3.5. An electronic statement is considered valid unless proven otherwise.",
        "3.6. All parameters are agreed in writing.",
        "3.7. E-mail correspondence is considered an agreement only if it contains clear consent and parameters.",
      ],
    },
    {
      id: "4",
      title: "SERVICE AGREEMENT, ANNEXES, AND ATTACHMENTS",
      bullets: [
        "4.1. The agreement has priority.",
        "4.2. It may be in paper or digital form.",
        "4.3. Validity – signature or express confirmation.",
        "4.4. Annexes are created when changes occur.",
        "4.5. If an annex is not possible, a new agreement is prepared.",
        "4.6. Attachments form part of the agreement.",
      ],
    },
    {
      id: "5",
      title: "SERVICES: GENERAL AND EXTENDED DEFINITIONS",
      content: [
        "5.1. According to the current Price List, the services are divided into the following categories:",
        "5.2. Additional charges to the services:",
      ],
      bullets: [
        "general additional charges",
        "priority order charges",
        "copyright acquisition fees",
      ],
      tail: ["5.3. Additional clarifications regarding the services:"],
      subsections: [
        {
          id: "5.3.1",
          content: [
            "5.3.1. Template-based services are services whose content and appearance are prepared in advance and the Client may change a limited part of their appearance and parameters. The changes are agreed between the Client and d . media.",
          ],
        },
        {
          id: "5.3.2",
          content: [
            "5.3.2. Custom services are services whose content and appearance depend solely on the concept and ideas of the Client.",
          ],
        },
        {
          id: "5.3.3",
          content: [
            "5.3.3. d . media performs the service to a stage ready for material production (for example printing) or visualisation (for example publication in digital form). When publication is entrusted to d . media, each material bears a specific mark showing its origin, unless otherwise agreed.",
          ],
        },
        {
          id: "5.3.4",
          content: [
            "5.3.4. The Client has the right to request removal of the origin marking (white-label service) against additional payment according to the Price List or an express agreement between the parties.",
          ],
        },
        {
          id: "5.3.5",
          content: [
            "5.3.5. d . media delivers the final materials in file formats agreed in advance with the Client or in a form accepted as standard for the respective type of service.",
          ],
        },
        {
          id: "5.3.6",
          content: [
            "5.3.6. The production timelines of the services depend directly on the Service Agreement and are agreed in advance with the Client.",
          ],
        },
        {
          id: "5.4",
          title: "Extended definitions of the services and possible parameters",
          subsections: [
            {
              id: "5.4.1",
              title: "Printing services",
              bullets: [
                "single-sided business card: a business card for personal or business use with one side.",
                "double-sided business card: a business card for personal or business use with two sides.",
                "single-sided voucher (gift card): a voucher for discounts, rewards, or gifts with one side.",
                "double-sided voucher (gift card): a voucher for discounts, rewards, or gifts with two sides.",
                "brochure / flyer: an informational brochure with one page (single-sided or double-sided), a creased brochure, or a flyer.",
                "others: menus, informational brochures with several pages, event invitations, etc.",
              ],
            },
            {
              id: "5.4.2",
              title: "Digital channel services",
              bullets: [
                "Facebook event cover: design for a publication with dimensions specific to an event cover.",
                "Facebook profile / group / page cover: cover design with dimensions specific to a cover.",
                "graphic design in 1:1 aspect: design in a square aspect suitable for publication on social media (Facebook, Instagram).",
                "graphic design in 9:16 aspect: design in a typical story aspect (Facebook, Instagram).",
                "graphic design for YouTube: design for use in YouTube (banner, thumbnail, cover, etc.).",
              ],
              tail: [
                "These services may be performed both as template-based and as custom work. Clients may choose a combination of three services at a package price.",
              ],
            },
            {
              id: "5.4.3",
              title: "Visual identity services",
              bullets: [
                "logotype design: creation of a logo based exclusively on type.",
                "logo design: creation of a logo design for an individual, brand, or other entity.",
                "logo and logotype design: a combination of the two.",
                "Vectorisation of a raster logo and/or logotype: conversion of a raster project into a vector one.",
              ],
            },
            {
              id: "5.4.4",
              title: "Template-based video animation services",
              bullets: [
                "animation with logo and/or logotype up to 5 seconds.",
                "animation with logo and/or logotype up to 10 seconds.",
                "animation with logo and/or logotype over 10 seconds.",
              ],
            },
            {
              id: "5.4.5",
              title: "Additional charges",
              bullets: [
                "on-site work with the client",
                "priority order charges",
                "removal of origin marking (white-label)",
              ],
            },
            {
              id: "5.4.6",
              title: "Copyright fees",
              content: [
                "The Client may pay an annual fee to acquire non-exclusive or exclusive copyright for a period of up to 10 years.",
              ],
            },
          ],
        },
        {
          id: "5.5",
          title: "Technical additions to the services",
          bullets: [
            "5.5.1. The services under item 5.4.1. are created in Adobe Photoshop and/or Adobe Illustrator and are standardly delivered as .psd / .eps / .png files in CMYK colour mode with 300 dpi resolution.",
            "5.5.2. The services under item 5.4.2. are created in Adobe Photoshop and/or Adobe Illustrator and are standardly delivered as .png files in RGB colour mode with 300 dpi resolution.",
            "5.5.3. The services under item 5.4.3. are created in Adobe Illustrator.",
            "5.5.4. The services under item 5.4.4. are created in Final Cut Pro.",
            "5.5.5. d . media reserves the right to use other software or to change the technical specifications in favour of the Client, after prior coordination.",
          ],
        },
      ],
    },
    {
      id: "6",
      title: "RIGHTS AND OBLIGATIONS OF THE PARTIES",
      subsections: [
        {
          id: "6.1",
          title: "Rights of d . media",
          bullets: [
            "(1) To require the Client to provide the necessary materials.",
            "(2) Not to bear responsibility for errors in the provided materials.",
            "(3) To extend timelines in case of delay by the Client.",
            "(4) To receive cooperation from the Client.",
            "(5) To use the materials for portfolio purposes after coordination.",
            "(6) To use subcontractors.",
            "(7) To refuse performance in case of non-payment.",
            "(8) To refuse services that contradict the law.",
            "(9) To consider the work accepted in the absence of feedback within 3 working days.",
            "(10) To place a project on hold in case of lack of communication for more than 7 days.",
          ],
        },
        {
          id: "6.2",
          title: "Obligations of d . media",
          bullets: [
            "(1) To perform the work with quality.",
            "(2) To use its own resources.",
            "(3) To provide information upon request.",
          ],
        },
        {
          id: "6.3",
          title: "Rights of the Client",
          bullets: [
            "(1) To receive a quality service.",
            "(2) To control the execution.",
          ],
        },
        {
          id: "6.4",
          title: "Obligations of the Client",
          bullets: [
            "(1) To provide materials.",
            "(2) To pay the remuneration.",
            "(3) Absence of objection within 3 working days is considered acceptance.",
          ],
        },
      ],
    },
    {
      id: "7",
      title: "TIMELINES, PRICES, AND PAYMENTS",
      content: ["7.1. Timelines: according to the agreement."],
      subsections: [
        {
          id: "7.2",
          title: "Prices and payments",
          bullets: [
            "(1) Prices are agreed in euro.",
            "(2) They are also stated in lev at the rate of 1.95583.",
            "(3) Payments are made in the agreed manner.",
          ],
        },
      ],
    },
    {
      id: "8",
      title: "MATERIALS, CONTENT, AND INTELLECTUAL PROPERTY",
      bullets: [
        "8.1. The materials are protected by law.",
        "8.2. The Client bears responsibility for the content.",
        "8.3. d . media retains the rights over the created materials.",
        "8.4. The Client receives a right of use according to the agreement.",
      ],
    },
    {
      id: "9",
      title: "LIABILITY AND PENALTIES",
      bullets: [
        "9.1. d . media owes a penalty of 1% per day in case of delay.",
        "9.2. The Client owes 0.5% per day in case of delayed payment.",
        "9.3. In the event of delay over 10 days, d . media may terminate the agreement.",
        "9.4. In case of withdrawal by the Client – 25% penalty.",
        "9.5. If work has begun – the performed work is due.",
      ],
    },
    {
      id: "10",
      title: "LIMITATION OF LIABILITY (FORCE MAJEURE)",
      bullets: [
        "10.1. Force majeure is an unforeseeable event outside the control of the parties.",
        "10.2. The parties notify each other.",
        "10.3. d . media bears no responsibility in such circumstances.",
      ],
    },
    {
      id: "11",
      title: "TERM AND TERMINATION OF THE AGREEMENT",
      bullets: [
        "11.1. The term is defined in the agreement.",
        "11.2. Termination upon performance, consent, or breach.",
      ],
    },
    {
      id: "12",
      title: "CONFIDENTIALITY",
      bullets: [
        "12.1. All data is confidential.",
        "12.2. It is used only for performance.",
        "12.3. Disclosure is prohibited.",
      ],
    },
    {
      id: "13",
      title: "ADDITIONAL PROVISIONS",
      bullets: [
        "13.1. The terms may be changed by agreement.",
        "13.2. Cases not specified are resolved by agreement.",
        "13.3. d . media processes personal data according to GDPR solely for the purposes of performing the services.",
        "13.4. Bulgarian legislation applies.",
      ],
    },
    {
      id: "14",
      title: "APPLICABLE LAW AND DISPUTES",
      bullets: [
        "14.1. Bulgarian law applies.",
        "14.2. Disputes are resolved by the court at the seat of the provider.",
      ],
    },
  ] as LegalSection[],
};

export function getPrivacyPolicy(locale: Locale) {
  return privacyPolicy[locale];
}

export function getTermsPolicy(locale: Locale) {
  return termsContent[locale];
}
