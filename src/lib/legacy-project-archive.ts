export type LegacyMockupItem = {
  src: string;
  alt: string;
};

export type LegacyMockupCollection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  items: LegacyMockupItem[];
};

export type LegacyProjectArchiveItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  context: string;
  focus: string[];
  cover: string;
  images: LegacyMockupItem[];
  imageCount: number;
  featured?: boolean;
  priority?: number;
};

export const legacyProjectArchive: LegacyProjectArchiveItem[] = [];

export const legacyMockupCollections: LegacyMockupCollection[] = [
  {
    slug: "club-event-flyers",
    eyebrow: "архивен слой",
    title: "Колекция от мокъпи на флаери за клубни събития",
    description:
      "Подбрана архивна серия от стари носители за клубни и парти формати, представени като отделен визуален слой в портфолиото.",
    items: [
      {
        src: "/assets/legacy-project-files/flyer-mockups/482004548_2724640331061708_8196222395238196117_n.jpg",
        alt: "Мокъп на клубни флаери за събития",
      },
      {
        src: "/assets/legacy-project-files/flyer-mockups/481903080_2724640101061731_1049849463403877498_n.jpg",
        alt: "Мокъп на клубни флаери за събития",
      },
      {
        src: "/assets/legacy-project-files/flyer-mockups/481159328_2724640094395065_5692584808678090360_n.jpg",
        alt: "Мокъп на клубни флаери за събития",
      },
      {
        src: "/assets/legacy-project-files/flyer-mockups/481332918_2724640057728402_2347982715872970579_n.jpg",
        alt: "Мокъп на клубни флаери за събития",
      },
      {
        src: "/assets/legacy-project-files/flyer-mockups/481260778_2724640077728400_882415871851379020_n.jpg",
        alt: "Мокъп на клубни флаери за събития",
      },
    ],
  },
  {
    slug: "project-mockups",
    eyebrow: "архивен слой",
    title: "Колекция от мокъпи на част от проектите",
    description:
      "Отделен подбор от проектни мокъпи, който показва как знаци, логотипи и идентичности са били визуализирани в реални носители.",
    items: [
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9541.PNG",
        alt: "Мокъп на проектен знак",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9542.PNG",
        alt: "Мокъп на проектна идентичност",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9544.PNG",
        alt: "Мокъп на проектен постер",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9545.PNG",
        alt: "Мокъп на проектна корица",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9546.PNG",
        alt: "Мокъп на проектна визуализация",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9548.PNG",
        alt: "Мокъп на проектен носител",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9549.PNG",
        alt: "Мокъп на проектен знак върху носител",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9551.PNG",
        alt: "Мокъп на визуална система",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9552.PNG",
        alt: "Мокъп на дигитално приложение",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9553.PNG",
        alt: "Мокъп на проектно присъствие",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9554.PNG",
        alt: "Мокъп на проектен знак в дигитална среда",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/IMG_9556.PNG",
        alt: "Мокъп на проектна визуализация в пространствен носител",
      },
      {
        src: "/assets/legacy-project-files/projects-mockups/1647287824003.jpg",
        alt: "Мокъп на проектен носител в печатен формат",
      },
    ],
  },
];
