import { get } from "@vercel/edge-config";

type CtaConfig = {
  label: string;
  href: string;
};

type HomeSectionVisibility = {
  services: boolean;
  about: boolean;
};

export type SiteRuntimeConfig = {
  announcement: {
    text: string;
    href?: string;
  } | null;
  home: {
    sections: HomeSectionVisibility;
    heroPrimaryCta: CtaConfig;
    heroSecondaryCta: CtaConfig;
    finalPrimaryCta: CtaConfig;
    finalSecondaryCta: CtaConfig;
  };
  projects: {
    primaryCta: CtaConfig;
    secondaryCta: CtaConfig;
  };
  services: {
    primaryCta: CtaConfig;
    secondaryCta: CtaConfig;
  };
  contact: {
    primaryCta: CtaConfig;
    secondaryCta: CtaConfig;
  };
};

const fallbackSiteRuntimeConfig: SiteRuntimeConfig = {
  announcement: null,
  home: {
    sections: {
      services: true,
      about: true,
    },
    heroPrimaryCta: {
      label: "Прегледай услугите",
      href: "/services",
    },
    heroSecondaryCta: {
      label: "Започни запитване",
      href: "/contact",
    },
    finalPrimaryCta: {
      label: "Към контакт",
      href: "/contact",
    },
    finalSecondaryCta: {
      label: "Виж проектите",
      href: "/projects",
    },
  },
  projects: {
    primaryCta: {
      label: "Започни проект",
      href: "/contact",
    },
    secondaryCta: {
      label: "Услуги",
      href: "/services",
    },
  },
  services: {
    primaryCta: {
      label: "Към контакт",
      href: "/contact",
    },
    secondaryCta: {
      label: "Условия",
      href: "/terms",
    },
  },
  contact: {
    primaryCta: {
      label: "Изпрати e-mail",
      href: "mailto:contact@d-media.org",
    },
    secondaryCta: {
      label: "Прегледай услугите",
      href: "/services",
    },
  },
};

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeCtaConfig(
  fallback: CtaConfig,
  value: unknown,
): CtaConfig {
  if (!isObjectLike(value)) {
    return fallback;
  }

  return {
    label: typeof value.label === "string" ? value.label : fallback.label,
    href: typeof value.href === "string" ? value.href : fallback.href,
  };
}

export async function getSiteRuntimeConfig(): Promise<SiteRuntimeConfig> {
  if (!process.env.EDGE_CONFIG) {
    return fallbackSiteRuntimeConfig;
  }

  try {
    const edgeConfig = await get("siteRuntimeConfig");

    if (!isObjectLike(edgeConfig)) {
      return fallbackSiteRuntimeConfig;
    }

    const announcement = isObjectLike(edgeConfig.announcement)
      ? {
          text:
            typeof edgeConfig.announcement.text === "string"
              ? edgeConfig.announcement.text
              : "",
          href:
            typeof edgeConfig.announcement.href === "string"
              ? edgeConfig.announcement.href
              : undefined,
        }
      : null;

    const home = isObjectLike(edgeConfig.home) ? edgeConfig.home : {};
    const homeSections = isObjectLike(home.sections) ? home.sections : {};
    const projects = isObjectLike(edgeConfig.projects) ? edgeConfig.projects : {};
    const services = isObjectLike(edgeConfig.services) ? edgeConfig.services : {};
    const contact = isObjectLike(edgeConfig.contact) ? edgeConfig.contact : {};

    return {
      announcement:
        announcement && announcement.text.trim().length > 0 ? announcement : null,
      home: {
        sections: {
          services:
            typeof homeSections.services === "boolean"
              ? homeSections.services
              : fallbackSiteRuntimeConfig.home.sections.services,
          about:
            typeof homeSections.about === "boolean"
              ? homeSections.about
              : fallbackSiteRuntimeConfig.home.sections.about,
        },
        heroPrimaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.home.heroPrimaryCta,
          home.heroPrimaryCta,
        ),
        heroSecondaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.home.heroSecondaryCta,
          home.heroSecondaryCta,
        ),
        finalPrimaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.home.finalPrimaryCta,
          home.finalPrimaryCta,
        ),
        finalSecondaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.home.finalSecondaryCta,
          home.finalSecondaryCta,
        ),
      },
      projects: {
        primaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.projects.primaryCta,
          projects.primaryCta,
        ),
        secondaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.projects.secondaryCta,
          projects.secondaryCta,
        ),
      },
      services: {
        primaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.services.primaryCta,
          services.primaryCta,
        ),
        secondaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.services.secondaryCta,
          services.secondaryCta,
        ),
      },
      contact: {
        primaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.contact.primaryCta,
          contact.primaryCta,
        ),
        secondaryCta: mergeCtaConfig(
          fallbackSiteRuntimeConfig.contact.secondaryCta,
          contact.secondaryCta,
        ),
      },
    };
  } catch {
    return fallbackSiteRuntimeConfig;
  }
}
