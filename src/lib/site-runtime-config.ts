import { unstable_cache } from "next/cache";

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

const readSiteRuntimeConfig = unstable_cache(
  async (): Promise<SiteRuntimeConfig> => {
    return fallbackSiteRuntimeConfig;
  },
  ["site-runtime-config"],
  { revalidate: 300 }
);

export async function getSiteRuntimeConfig(): Promise<SiteRuntimeConfig> {
  return readSiteRuntimeConfig();
}
