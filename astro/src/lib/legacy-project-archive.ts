import type { Locale } from "@/lib/i18n";
import { oldFlyerItems } from "@/lib/old-flyer-assets";

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
      "Архив от клубни формати, които показват ритъм, атмосфера и работа в серия.",
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
      "Подбор от мокъпи, които показват как работата стои в реален носител и контекст.",
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
  {
    slug: "old-flyers",
    eyebrow: "архивен слой",
    title: "Архив флаери",
    description:
      "Ранен архив от флаери, подреден с първо вертикалните, а след това хоризонталните формати.",
    items: [...oldFlyerItems],
  },
];

const localizedLegacyCollections = {
  en: {
    "club-event-flyers": {
      eyebrow: "archive layer",
      title: "Collection of flyer mockups for club events",
      description: "An archive of club formats that shows rhythm, atmosphere, and work built in series.",
      alts: Array(5).fill("Mockup of club event flyers"),
    },
    "project-mockups": {
      eyebrow: "archive layer",
      title: "Collection of mockups from selected projects",
      description: "A selection of mockups showing how the work stands in real carriers and context.",
      alts: [
        "Mockup of a project mark",
        "Mockup of a project identity",
        "Mockup of a project poster",
        "Mockup of a project cover",
        "Mockup of a project visualisation",
        "Mockup of a project carrier",
        "Mockup of a project mark on a carrier",
        "Mockup of a visual system",
        "Mockup of a digital application",
        "Mockup of a project presence",
        "Mockup of a project mark in a digital environment",
        "Mockup of a project visualisation in a spatial carrier",
        "Mockup of a printed project carrier",
      ],
    },
    "old-flyers": {
      eyebrow: "archive layer",
      title: "Old Flyers",
      description: "An early flyer archive, arranged with the vertical formats first and the horizontal ones after them.",
      alts: Array(oldFlyerItems.length).fill("Archived flyer from earlier work"),
    },
  },
} as const;

export function getLegacyMockupCollections(locale: Locale) {
  if (locale === "bg") {
    return legacyMockupCollections;
  }

  return legacyMockupCollections.map((collection) => {
    const localized = localizedLegacyCollections.en[
      collection.slug as keyof typeof localizedLegacyCollections.en
    ];

    return {
      ...collection,
      eyebrow: localized.eyebrow,
      title: localized.title,
      description: localized.description,
      items: collection.items.map((item, index) => ({
        ...item,
        alt: localized.alts[index] ?? item.alt,
      })),
    };
  });
}
