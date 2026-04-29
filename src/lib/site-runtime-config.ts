import { get } from "@vercel/edge-config";

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
  };
};

const fallbackSiteRuntimeConfig: SiteRuntimeConfig = {
  announcement: null,
  home: {
    sections: {
      services: true,
      about: true,
    },
  },
};

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
      },
    };
  } catch {
    return fallbackSiteRuntimeConfig;
  }
}
