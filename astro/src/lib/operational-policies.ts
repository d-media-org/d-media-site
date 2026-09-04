export type OperationalPolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type OperationalPolicy = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  sections: OperationalPolicySection[];
};

export const operationalPolicies: OperationalPolicy[] = [
  {
    slug: "revisions",
    title: "Политика за корекции и ревизии",
    shortTitle: "Корекции и ревизии",
    description: "Правила на d . media за подаване, обхват и изпълнение на корекции и ревизии по активни проекти.",
    intro: "Политиката определя как се заявяват, групират и изпълняват корекции по време на работния процес.",
    sections: [
      {
        title: "Подаване на корекции",
        paragraphs: ["Корекциите се подават писмено и обобщено от определеното за контакт лице. За един работен цикъл се приема един консолидиран списък с ясни и непротиворечиви указания."],
      },
      {
        title: "Обхват на ревизията",
        paragraphs: ["Ревизия е промяна в рамките на одобрената концепция и договорения обхват. Нова концепция, нов формат, промяна на заданието или връщане към вече отхвърлен вариант се оценяват отделно."],
      },
      {
        title: "Срокове и допълнителна работа",
        paragraphs: ["Срокът за корекции започва след получаване на пълен списък. Работа извън договорения брой ревизии или обхват се извършва след потвърждение на допълнителни срок и цена."],
      },
    ],
  },
  {
    slug: "frozen-projects",
    title: "Политика за замразени проекти",
    shortTitle: "Замразени проекти",
    description: "Условия за временно спиране, съхранение и възобновяване на замразени проекти в d . media.",
    intro: "Проект може да бъде временно замразен, когато работата не може да продължи поради липса на материали, обратна връзка, одобрение или друго необходимо действие.",
    sections: [
      {
        title: "Кога проектът се замразява",
        paragraphs: ["Проектът може да бъде замразен след писмено искане или когато необходима информация, материали, плащане или решение не бъдат предоставени в договорения срок."],
      },
      {
        title: "Период на замразяване",
        paragraphs: ["По време на замразяването работният график и резервираният ресурс се освобождават. Първоначалните срокове престават да бъдат приложими."],
      },
      {
        title: "Възобновяване",
        paragraphs: ["Работата се възобновява след получаване на всички необходими материали и потвърждение на нов график. Възобновяването зависи от текущата заетост на d . media и може да изисква актуализиране на обхвата или цената."],
      },
    ],
  },
  {
    slug: "abandoned-projects",
    title: "Политика за изоставени проекти",
    shortTitle: "Изоставени проекти",
    description: "Правила за проекти без обратна връзка, действие или възобновяване за продължителен период.",
    intro: "Политиката урежда приключването на проекти, по които липсва необходимата комуникация или действие за продължителен период.",
    sections: [
      {
        title: "Статус на изоставен проект",
        paragraphs: ["Проект може да бъде определен като изоставен, когато след напомняне не бъдат предоставени обратна връзка, материали, одобрение или плащане и не е договорено замразяване."],
      },
      {
        title: "Приключване",
        paragraphs: ["При изоставяне d . media може да прекрати работата, да закрие работния график и да архивира или изтрие проектните материали съгласно приложимите договорени условия."],
      },
      {
        title: "Ново възлагане",
        paragraphs: ["Възстановяването на изоставен проект се разглежда като ново възлагане. Наличните материали, обхватът, срокът и цената се преценяват отново."],
      },
    ],
  },
  {
    slug: "working-files",
    title: "Политика за работни файлове",
    shortTitle: "Работни файлове",
    description: "Обхват, предоставяне и съхранение на работни и изходни файлове по проекти на d . media.",
    intro: "Политиката разграничава финалните файлове за използване от работните ресурси, чрез които е създаден проектът.",
    sections: [
      {
        title: "Какво представляват работните файлове",
        paragraphs: ["Работни файлове са изходни документи, слоеве, компоненти, библиотеки, сорс код, настройки, чернови, неизбрани варианти и други материали от производствения процес."],
      },
      {
        title: "Предоставяне",
        paragraphs: ["Работните файлове не са част от стандартното предаване, освен ако са изрично включени в оферта или договор. Предоставянето им може да изисква допълнителна подготовка, лицензиране и възнаграждение."],
      },
      {
        title: "Съвместимост и архив",
        paragraphs: ["d . media не гарантира съвместимост с бъдещи версии на софтуер или ресурси на трети страни. Срокът за съхранение се определя според проекта и не представлява безсрочен архив."],
      },
    ],
  },
  {
    slug: "priority-projects",
    title: "Политика за спешни поръчки",
    shortTitle: "Спешни поръчки",
    description: "Условия за приоритетно, експресно и супер експресно изпълнение на проекти от d . media.",
    intro: "Спешните поръчки се приемат само след проверка на реалния обхват, наличния ресурс и възможността за надеждно изпълнение.",
    sections: [
      {
        title: "Приоритетни режими",
        bullets: [
          "Бърза поръчка: съкращаване на договорения срок с 25% и начисление +25%.",
          "Експресна поръчка: съкращаване на договорения срок с 50% и начисление +50%.",
          "Супер експресна поръчка: съкращаване на договорения срок със 75% и начисление +75%.",
        ],
      },
      {
        title: "Потвърждение",
        paragraphs: ["Приоритетният режим се активира само след писмено потвърждение от d . media. Подадено кратко предизвестие не създава автоматично задължение за спешно изпълнение."],
      },
      {
        title: "Зависимости",
        paragraphs: ["Срокът зависи от навременно предоставяне на материали, обратна връзка и одобрения. Забавяне по тези зависимости може да промени договорения график."],
      },
    ],
  },
  {
    slug: "domains-hosting",
    title: "Политика за домейни и хостинг",
    shortTitle: "Домейни и хостинг",
    description: "Отговорности и работен ред при регистрация, настройка и управление на домейни и хостинг.",
    intro: "Домейните и хостингът са услуги на външни доставчици и се управляват отделно от дизайна и разработката на уеб проект.",
    sections: [
      {
        title: "Собственост и достъп",
        paragraphs: ["Когато е възможно, домейнът и хостинг акаунтът се регистрират на името и с данните на клиента. Клиентът отговаря за достъпа, подновяването и актуалността на платежните данни."],
      },
      {
        title: "Настройка и управление",
        paragraphs: ["d . media може да съдейства при избор, конфигурация, DNS настройки, миграция и свързване на услуги. Тези действия се извършват в рамките на договорения технически обхват."],
      },
      {
        title: "Външни доставчици",
        paragraphs: ["d . media не контролира прекъсвания, промени в условията, цени, ограничения или загуба на услуга от външен доставчик. Разходите за домейн, хостинг и платени интеграции не са включени, освен ако не е посочено друго."],
      },
    ],
  },
  {
    slug: "external-accounts-budgets",
    title: "Политика за външни акаунти, достъпи и бюджети",
    shortTitle: "Външни акаунти и бюджети",
    description: "Работен ред за външни акаунти, достъпи, рекламни бюджети, платени платформи и услуги на трети страни.",
    intro: "Политиката урежда как се предоставят достъпи, управляват външни акаунти и третират разходи към платформи извън d . media.",
    sections: [
      {
        title: "Собственост на акаунтите",
        paragraphs: ["Когато е възможно, рекламни, аналитични, социални, домейн, хостинг, CMS, payment, email и други външни акаунти се създават и поддържат на името на клиента. Клиентът отговаря за собствеността, платежните данни, достъпите и спазването на правилата на съответната платформа."],
      },
      {
        title: "Предоставяне и ограничаване на достъп",
        paragraphs: ["d . media работи само с достъпите, необходими за договорения обхват. Клиентът трябва да предостави навременен, валиден и достатъчен достъп. Забавяне, липса на права или промяна на достъпите може да промени срок, обхват или цена."],
      },
      {
        title: "Бюджети и външни разходи",
        paragraphs: ["Рекламни бюджети, абонаменти, лицензи, платени плъгини, шрифтове, изображения, SaaS услуги, API такси, домейни, хостинг и други разходи към трети страни не са включени в цената на d . media, освен ако не е изрично уговорено друго."],
      },
      {
        title: "Ограничения на платформите",
        paragraphs: ["d . media не контролира одобрения, блокирания, промени в алгоритми, цени, правила, функционалности, модерация, технически прекъсвания или ограничения на външни платформи. При такова събитие се преценява необходимата корекция на работния план."],
      },
    ],
  },
  {
    slug: "support",
    title: "Политика за техническа поддръжка",
    shortTitle: "Техническа поддръжка",
    description: "Обхват, приоритет и условия за техническа поддръжка на уеб проекти от d . media.",
    intro: "Техническата поддръжка се предоставя като отделна еднократна или абонаментна услуга с предварително определен обхват.",
    sections: [
      {
        title: "Какво може да включва",
        bullets: ["Наблюдение и технически проверки.", "Актуализации и корекции.", "Поддръжка на съдържание и интеграции.", "Анализ и отстраняване на възникнали проблеми."],
      },
      {
        title: "Какво не е включено автоматично",
        paragraphs: ["Нови функционалности, редизайн, възстановяване след намеса на трети лица, проблеми при външни доставчици и работа извън договорения обхват се оценяват отделно."],
      },
      {
        title: "Реакция и приоритет",
        paragraphs: ["Срокът за реакция зависи от договореното ниво на поддръжка, сериозността на проблема и наличния достъп. Реакция означава начало на проверка, а не гарантиран срок за окончателно отстраняване."],
      },
    ],
  },
  {
    slug: "ai-policy",
    title: "Политика за използване на AI",
    shortTitle: "Използване на AI",
    description: "Принципи за контролирано използване на AI инструменти в работните процеси на d . media.",
    intro: "AI инструментите могат да подпомагат отделни етапи от работата, но не заменят професионалната преценка, контрола и отговорността за крайния резултат.",
    sections: [
      {
        title: "Допустима употреба",
        paragraphs: ["AI може да се използва за проучване, анализ, идеи, обработка, автоматизация, текст, изображения, код и други помощни дейности, когато това е подходящо за проекта."],
      },
      {
        title: "Контрол на резултата",
        paragraphs: ["Съдържанието, подпомогнато от AI, се преглежда и оценява преди предоставяне. d . media определя кога използването на такъв инструмент е уместно и каква проверка е необходима."],
      },
      {
        title: "Данни и ограничения",
        paragraphs: ["Поверителна или чувствителна информация не се предоставя на AI услуга без основание и необходим контрол. Резултатите могат да съдържат неточности или ограничения, поради което не се приемат без професионална проверка."],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Политика за възстановяване на суми",
    shortTitle: "Възстановяване на суми",
    description: "Условия за разглеждане на искания за възстановяване на платени суми по услуги на d . media.",
    intro: "Възстановяването на суми се разглежда според етапа на проекта, извършената работа, поетите разходи и конкретната договорка.",
    sections: [
      {
        title: "Преди започване на работа",
        paragraphs: ["Когато изпълнението не е започнало и не са направени невъзстановими разходи, искането се разглежда спрямо потвърдената оферта, договора и приложимите правила."],
      },
      {
        title: "След започване на работа",
        paragraphs: ["Извършената работа, резервираният ресурс, закупените лицензи и разходите към трети страни не подлежат автоматично на възстановяване. Дължимата сума се определя според реално изпълнения обхват."],
      },
      {
        title: "Начин на разглеждане",
        paragraphs: ["Искането се подава писмено с номер или описание на проекта и основание. След проверка d . media предоставя писмен отговор и приложимото финансово уреждане."],
      },
    ],
  },
  {
    slug: "project-delivery",
    title: "Предаване и приемане на проект",
    shortTitle: "Предаване и приемане",
    description: "Работен ред за предаване, проверка и приемане на финални материали и проекти от d . media.",
    intro: "Политиката описва информацията, която съпътства предаването на завършен проект, и начина за потвърждаване на приемането.",
    sections: [
      {
        title: "Данни за проекта",
        bullets: ["Наименование и референция на проекта.", "Страни и лица за контакт.", "Договорен обхват и предадени резултати.", "Формат и канал на предаване.", "Дата на предаване."],
      },
      {
        title: "Проверка и приемане",
        paragraphs: ["Клиентът проверява получените файлове и заявява конкретни несъответствия в договорения срок. При липса на възражение проектът се счита за приет съгласно приложимите договорени условия."],
      },
      {
        title: "Права, достъпи и последващи действия",
        paragraphs: ["Протоколът може да посочва предоставените лицензи, работни файлове, достъпи, инструкции, оставащи задължения и договорена поддръжка. Предаването не разширява автоматично уговорените права."],
      },
      {
        title: "Потвърждение",
        paragraphs: ["Приемането може да бъде потвърдено с подпис, електронно изявление или друг предварително договорен начин."],
      },
    ],
  },
];

export const operationalPoliciesEn: OperationalPolicy[] = [
  {
    slug: "revisions",
    title: "Corrections and Revisions Policy",
    shortTitle: "Corrections and revisions",
    description: "d . media rules for submitting, defining, and completing corrections and revisions during active projects.",
    intro: "This policy defines how corrections are requested, consolidated, and completed during the working process.",
    sections: [
      { title: "Submitting corrections", paragraphs: ["Corrections must be submitted in writing and consolidated by the designated contact person. One clear and non-conflicting list is accepted for each working cycle."] },
      { title: "Revision scope", paragraphs: ["A revision is a change within the approved concept and agreed scope. A new concept, format, brief, or return to a rejected option is assessed separately."] },
      { title: "Timing and additional work", paragraphs: ["The correction period begins after a complete list is received. Work beyond the agreed number of revisions or scope proceeds after additional timing and price are confirmed."] },
    ],
  },
  {
    slug: "frozen-projects",
    title: "Frozen Projects Policy",
    shortTitle: "Frozen projects",
    description: "Conditions for pausing, retaining, and resuming frozen projects at d . media.",
    intro: "A project may be temporarily frozen when work cannot continue because required materials, feedback, approval, payment, or another action is missing.",
    sections: [
      { title: "When a project is frozen", paragraphs: ["A project may be frozen following a written request or when required information, materials, payment, or a decision is not provided within the agreed period."] },
      { title: "Frozen period", paragraphs: ["During the frozen period, the working schedule and reserved capacity are released. The original deadlines no longer apply."] },
      { title: "Resuming work", paragraphs: ["Work resumes after all required materials are received and a new schedule is confirmed. Resumption depends on current capacity and may require an updated scope or price."] },
    ],
  },
  {
    slug: "abandoned-projects",
    title: "Abandoned Projects Policy",
    shortTitle: "Abandoned projects",
    description: "Rules for projects without feedback, action, or resumption over an extended period.",
    intro: "This policy governs the closure of projects where the communication or action required to continue has been absent for an extended period.",
    sections: [
      { title: "Abandoned status", paragraphs: ["A project may be considered abandoned when feedback, materials, approval, or payment remain unavailable after a reminder and no frozen period has been agreed."] },
      { title: "Closure", paragraphs: ["When a project is abandoned, d . media may stop work, close the schedule, and archive or delete project materials under the applicable agreed terms."] },
      { title: "New engagement", paragraphs: ["Restarting an abandoned project is treated as a new engagement. Available materials, scope, timing, and price are assessed again."] },
    ],
  },
  {
    slug: "working-files",
    title: "Working Files Policy",
    shortTitle: "Working files",
    description: "Scope, delivery, and retention of working and source files for d . media projects.",
    intro: "This policy distinguishes final files intended for use from the working resources used to create the project.",
    sections: [
      { title: "What working files include", paragraphs: ["Working files include source documents, layers, components, libraries, source code, settings, drafts, unselected options, and other production materials."] },
      { title: "Delivery", paragraphs: ["Working files are not part of standard delivery unless expressly included in an offer or agreement. Their delivery may require additional preparation, licensing, and fees."] },
      { title: "Compatibility and archive", paragraphs: ["d . media does not guarantee compatibility with future software versions or third-party resources. Retention depends on the project and does not constitute indefinite archiving."] },
    ],
  },
  {
    slug: "priority-projects",
    title: "Priority Projects Policy",
    shortTitle: "Priority projects",
    description: "Conditions for priority, express, and super-express project delivery by d . media.",
    intro: "Priority work is accepted only after the real scope, available capacity, and ability to deliver reliably have been reviewed.",
    sections: [
      { title: "Priority modes", bullets: ["Fast order: agreed delivery time reduced by 25%, with a +25% charge.", "Express order: agreed delivery time reduced by 50%, with a +50% charge.", "Super-express order: agreed delivery time reduced by 75%, with a +75% charge."] },
      { title: "Confirmation", paragraphs: ["A priority mode becomes active only after written confirmation from d . media. Short notice does not automatically create an obligation for urgent delivery."] },
      { title: "Dependencies", paragraphs: ["Timing depends on prompt delivery of materials, feedback, and approvals. Delays in these dependencies may change the agreed schedule."] },
    ],
  },
  {
    slug: "domains-hosting",
    title: "Domains and Hosting Policy",
    shortTitle: "Domains and hosting",
    description: "Responsibilities and workflow for domain and hosting registration, configuration, and management.",
    intro: "Domains and hosting are third-party services and are managed separately from the design and development of a web project.",
    sections: [
      { title: "Ownership and access", paragraphs: ["Where possible, the domain and hosting account are registered in the client’s name and with the client’s details. The client is responsible for access, renewal, and current payment information."] },
      { title: "Configuration and management", paragraphs: ["d . media may assist with selection, configuration, DNS settings, migration, and service connections within the agreed technical scope."] },
      { title: "Third-party providers", paragraphs: ["d . media does not control outages, changes in terms, prices, restrictions, or loss of service caused by external providers. Domain, hosting, and paid integration costs are excluded unless stated otherwise."] },
    ],
  },
  {
    slug: "external-accounts-budgets",
    title: "External Accounts, Access, and Budgets Policy",
    shortTitle: "External accounts and budgets",
    description: "Workflow for external accounts, access, advertising budgets, paid platforms, and third-party services.",
    intro: "This policy governs how access is provided, external accounts are handled, and platform costs outside d . media are treated.",
    sections: [
      { title: "Account ownership", paragraphs: ["Where possible, advertising, analytics, social, domain, hosting, CMS, payment, email, and other external accounts are created and maintained in the client’s name. The client is responsible for ownership, payment details, access, and compliance with the relevant platform rules."] },
      { title: "Providing and limiting access", paragraphs: ["d . media works only with the access required for the agreed scope. The client must provide timely, valid, and sufficient access. Delay, missing permissions, or access changes may affect timing, scope, or price."] },
      { title: "Budgets and external costs", paragraphs: ["Advertising budgets, subscriptions, licences, paid plugins, fonts, images, SaaS services, API fees, domains, hosting, and other third-party costs are not included in the d . media price unless expressly agreed otherwise."] },
      { title: "Platform limitations", paragraphs: ["d . media does not control approvals, blocks, algorithm changes, pricing, rules, features, moderation, technical outages, or restrictions of external platforms. When such an event occurs, the required adjustment to the work plan is assessed."] },
    ],
  },
  {
    slug: "support",
    title: "Technical Support Policy",
    shortTitle: "Technical support",
    description: "Scope, priority, and conditions for technical support of web projects by d . media.",
    intro: "Technical support is provided as a separate one-off or subscription service with a scope defined in advance.",
    sections: [
      { title: "What support may include", bullets: ["Monitoring and technical checks.", "Updates and corrections.", "Content and integration maintenance.", "Analysis and resolution of reported issues."] },
      { title: "What is not automatically included", paragraphs: ["New functionality, redesign, recovery after third-party intervention, external provider issues, and work beyond the agreed scope are assessed separately."] },
      { title: "Response and priority", paragraphs: ["Response time depends on the agreed support level, issue severity, and available access. Response means the start of investigation, not a guaranteed final resolution time."] },
    ],
  },
  {
    slug: "ai-policy",
    title: "AI Use Policy",
    shortTitle: "AI use",
    description: "Principles for controlled use of AI tools in d . media workflows.",
    intro: "AI tools may support parts of the work, but they do not replace professional judgement, control, or responsibility for the final result.",
    sections: [
      { title: "Permitted use", paragraphs: ["AI may be used for research, analysis, ideation, processing, automation, text, images, code, and other supporting tasks when appropriate for the project."] },
      { title: "Review and control", paragraphs: ["AI-assisted content is reviewed and assessed before delivery. d . media determines when such tools are appropriate and what verification is required."] },
      { title: "Data and limitations", paragraphs: ["Confidential or sensitive information is not submitted to an AI service without a valid basis and suitable controls. Outputs may contain inaccuracies or limitations and are not accepted without professional review."] },
    ],
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    shortTitle: "Refunds",
    description: "Conditions for reviewing refund requests for amounts paid for d . media services.",
    intro: "Refund requests are reviewed according to the project stage, completed work, committed costs, and the specific agreement.",
    sections: [
      { title: "Before work begins", paragraphs: ["When work has not started and no non-refundable costs have been incurred, the request is reviewed under the confirmed offer, agreement, and applicable rules."] },
      { title: "After work begins", paragraphs: ["Completed work, reserved capacity, purchased licences, and third-party costs are not automatically refundable. Any amount due is determined according to the work actually completed."] },
      { title: "Review process", paragraphs: ["The request must be submitted in writing with a project reference or description and the reason for the request. d . media then provides a written response and the applicable financial settlement."] },
    ],
  },
  {
    slug: "project-delivery",
    title: "Project Delivery and Acceptance Record",
    shortTitle: "Project delivery",
    description: "Workflow for delivering, checking, and accepting final materials and projects from d . media.",
    intro: "The record describes the information accompanying a completed project and the method used to confirm acceptance.",
    sections: [
      { title: "Project details", bullets: ["Project name and reference.", "Parties and contact persons.", "Agreed scope and delivered outputs.", "Delivery format and channel.", "Delivery date."] },
      { title: "Review and acceptance", paragraphs: ["The client checks the delivered files and reports specific discrepancies within the agreed period. Without an objection, the project is considered accepted under the applicable agreed terms."] },
      { title: "Rights, access, and follow-up", paragraphs: ["The record may identify provided licences, working files, access details, instructions, remaining obligations, and agreed support. Delivery does not automatically extend the agreed rights."] },
      { title: "Confirmation", paragraphs: ["Acceptance may be confirmed by signature, electronic statement, or another method agreed in advance."] },
    ],
  },
];

export function getOperationalPolicies(locale: "bg" | "en") {
  return locale === "bg" ? operationalPolicies : operationalPoliciesEn;
}

export function getOperationalPolicy(slug: string, locale: "bg" | "en" = "bg") {
  return getOperationalPolicies(locale).find((policy) => policy.slug === slug);
}
