import type { BlogCategoryKey, BlogPost, BlogSection } from "@/lib/blog";

type EnglishPostSeed = {
  slug: string;
  category: BlogCategoryKey;
  title: string;
  excerpt: string;
  intro: string;
  focus: string;
  relatedPosts: string[];
  featured?: boolean;
  sections?: BlogSection[];
};

const date = "2026-06-07";

function sectionsFor(seed: EnglishPostSeed): BlogSection[] {
  return [
    {
      title: "Context",
      paragraphs: [
        seed.intro,
        `We examine ${seed.focus} as part of a wider brand and communication system, not as an isolated execution.`,
      ],
    },
    {
      title: "The underlying problem",
      paragraphs: [
        `The problem appears when ${seed.focus} is handled without a clear purpose, shared standards, or a connection to the way the brand is actually used.`,
        "Separate decisions may look acceptable on their own and still create a fragmented public presence when they do not follow one direction.",
      ],
    },
    {
      title: "How we approach it at d . media",
      paragraphs: [
        "We begin with context, define the role of the work, and only then decide how it should be expressed through identity, content, design, technology, or distribution.",
        `For this topic, that means treating ${seed.focus} as a controlled working layer with clear dependencies, review points, and a measurable purpose.`,
      ],
    },
    {
      title: "Practical implications",
      paragraphs: [
        "A useful solution should make the next decision easier. It should reduce ambiguity, improve consistency, and remain understandable outside the presentation in which it was first introduced.",
        "This is also what makes the work easier for search systems and AI tools to interpret: clear topics, explicit relationships, and language that does not depend on vague claims.",
      ],
    },
    {
      title: "What this means for a business",
      paragraphs: [
        `A disciplined approach to ${seed.focus} creates a more stable basis for communication, production, and future development.`,
        "The value is not additional volume. It is a clearer system that can be applied repeatedly without losing its direction.",
      ],
    },
    {
      title: "Conclusion",
      paragraphs: [
        "Strong digital presence is built through connected decisions. Identity, content, design, web structure, and visibility work best when each part supports the same position.",
      ],
    },
  ];
}

const seeds: EnglishPostSeed[] = [
  {
    slug: "zashto-prekaleno-shodniyat-domain-e-problem",
    category: "web-presence",
    title: "Why an overly similar domain name confuses users",
    excerpt: "How choosing a domain that resembles several existing addresses weakens recall, trust, and direct access to a brand.",
    intro: "An available domain is not necessarily a good domain. When a name differs only slightly from several active addresses, users have to remember a spelling detail instead of the brand itself.",
    focus: "domain names as part of brand recognition and user experience",
    relatedPosts: ["brand-identichnost-sreshtu-logo", "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie", "nai-chestite-seo-greshki-na-malkite-firmeni-saitove"],
    sections: [
      {
        title: "A domain is part of the brand system",
        paragraphs: [
          "A domain is more than a technical address. It is spoken, typed, remembered, shared, and used across business cards, advertising, social profiles, documents, and search results.",
          "A distinctive address can be recalled without assistance. A domain that closely resembles several others forces users to remember a suffix, spelling variation, hyphen, or extension instead of the brand itself.",
        ],
      },
      {
        title: "The problem is not similarity alone",
        paragraphs: [
          "Consider a market where several active domains share the same root and differ only by plural form, an extra word, a number, or a domain extension. Adding another minor variation does not automatically create a distinct digital identity.",
          "Users may remember the shared word but not the exact version. Direct traffic can reach another website, recommendations become less precise, and advertising has to compensate for weak recall.",
        ],
      },
      {
        title: "Where confusion becomes visible",
        paragraphs: ["The risk is greatest when no clickable link is available: a spoken recommendation, a phone call, audio or video advertising, a remembered social post, or a return visit days later."],
        bullets: [
          "Visitors may open a competitor or unrelated website.",
          "Email may be sent to the wrong domain.",
          "The brand can lose direct traffic and depend more heavily on paid channels.",
          "Search results may contain several similar names without a clear distinction.",
          "Word-of-mouth recommendations become harder to communicate accurately.",
        ],
      },
      {
        title: "Available does not mean strategically suitable",
        paragraphs: [
          "A common mistake is to treat availability as the only selection criterion. Availability is a technical check, not a brand decision.",
          "The stronger question is whether people can recognise and reproduce the address without an explanation. If every mention requires clarification, the domain creates permanent communication friction.",
        ],
      },
      {
        title: "How we assess a domain",
        paragraphs: ["Before registration, we examine the environment around the name: similar domains, companies, trademarks, social profiles, and search results. We also test whether the address can be typed correctly after hearing it once."],
        bullets: [
          "Is it concise and easy to pronounce?",
          "Does it have one natural spelling?",
          "Is it clearly distinct from active domains in the same market?",
          "Does it work without hyphens, unusual abbreviations, or repeated explanations?",
          "Is it suitable for professional email and international use?",
          "Can it remain relevant if the business expands its services?",
        ],
      },
      {
        title: "SEO cannot repair weak distinctiveness",
        paragraphs: [
          "A strong technical SEO foundation can help search engines discover and understand a website, but it cannot remove human confusion between nearly identical names. A search engine may return the correct page while the user still struggles to identify it.",
          "The domain, brand name, page titles, visual identity, and public profiles should therefore communicate one consistent entity.",
        ],
      },
      {
        title: "When a different name is the stronger decision",
        paragraphs: [
          "If the most natural domain is unavailable and several similar active addresses already surround it, a more distinctive name may be the better long-term decision. A small compromise during registration can become a permanent communication cost.",
          "The better domain is not simply the one that is available. It is the one users can recognise, remember, and reach correctly without additional instructions.",
        ],
      },
    ],
  },
  {
    slug: "zashto-sazdadohme-d-media",
    category: "brand-identity",
    title: "Why we created d . media",
    excerpt: "Why d . media was created as a response to fragmented digital presence and disconnected communication.",
    intro: "Every business leaves a trace in the digital environment. The question is not whether it is present, but how it looks, communicates, and what impression it leaves behind.",
    focus: "a connected brand, content, social, design, advertising, and web presence",
    relatedPosts: ["kak-izgradihme-vizualnata-identichnost-na-d-media", "brand-identichnost-sreshtu-logo", "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie"],
    featured: true,
  },
  {
    slug: "kak-izgradihme-vizualnata-identichnost-na-d-media",
    category: "brand-identity",
    title: "How we built the visual identity of d . media",
    excerpt: "The reasoning behind the mark, logotype, typography, and restrained monochrome system of d . media.",
    intro: "The identity was designed to remain stable across the website, documents, publications, and social preview environments without relying on decorative noise.",
    focus: "a visual identity that remains recognisable across different formats",
    relatedPosts: ["zashto-sazdadohme-d-media", "brand-identichnost-sreshtu-logo"],
  },
  {
    slug: "kakvo-kupuva-klientat-kogato-plashta-za-dizain",
    category: "graphic-design",
    title: "What a client actually buys when paying for design",
    excerpt: "Design value is not limited to the final file. It includes judgement, structure, decisions, and readiness for real use.",
    intro: "A design fee covers more than visual production. It reflects the process of turning context, constraints, and communication goals into a usable result.",
    focus: "the business value behind professional design work",
    relatedPosts: ["zashto-krasiviyat-dizain-ne-prodava-sam", "brand-identichnost-sreshtu-logo"],
  },
  {
    slug: "brand-identichnost-sreshtu-logo",
    category: "brand-identity",
    title: "Brand identity versus logo: what is the difference?",
    excerpt: "A logo is one identifying element. Brand identity is the wider system that gives it context and consistency.",
    intro: "Confusing a logo with a full identity often leads to a mark that has no clear rules for typography, colour, composition, content, or application.",
    focus: "the distinction between a logo and a complete brand identity",
    relatedPosts: ["kak-izgradihme-vizualnata-identichnost-na-d-media", "kakvo-kupuva-klientat-kogato-plashta-za-dizain"],
  },
  {
    slug: "zashto-krasiviyat-dizain-ne-prodava-sam",
    category: "graphic-design",
    title: "Why attractive design does not sell on its own",
    excerpt: "Visual quality supports communication, but it cannot replace a clear offer, useful content, and a credible customer path.",
    intro: "A polished visual surface may attract attention, but attention alone does not explain value or remove uncertainty from a buying decision.",
    focus: "design as a functional part of communication rather than decoration",
    relatedPosts: ["kakvo-kupuva-klientat-kogato-plashta-za-dizain", "brand-identichnost-sreshtu-logo"],
  },
  {
    slug: "kak-postignahme-100-100-v-google-pagespeed-insights",
    category: "web-presence",
    title: "How we achieved 100/100 in Google PageSpeed Insights",
    excerpt: "The architectural and production decisions behind the PageSpeed results of d-media.org.",
    intro: "The result came from a performance-first architecture, static delivery, disciplined assets, limited JavaScript, and repeated checks across real routes and devices.",
    focus: "sustained website performance rather than a one-off benchmark",
    relatedPosts: ["zashto-100-100-v-pagespeed-ne-garantira-dobar-sait", "vercel-ili-cloudflare-pages-realno-sravnenie"],
    featured: true,
  },
  {
    slug: "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait",
    category: "web-presence",
    title: "Why 100/100 in PageSpeed does not guarantee a good website",
    excerpt: "Performance matters, but it cannot compensate for weak content, poor hierarchy, inaccessible interaction, or unclear positioning.",
    intro: "A perfect laboratory score is useful evidence, not a complete definition of quality. A website still has to communicate, guide, and work reliably for people.",
    focus: "the relationship between technical performance and overall website quality",
    relatedPosts: ["kak-postignahme-100-100-v-google-pagespeed-insights", "nai-chestite-seo-greshki-na-malkite-firmeni-saitove"],
  },
  {
    slug: "vercel-ili-cloudflare-pages-realno-sravnenie",
    category: "web-presence",
    title: "Vercel or Cloudflare Pages: a practical comparison",
    excerpt: "A practical comparison of deployment workflows, static delivery, platform dependencies, and project fit.",
    intro: "The right hosting platform depends on architecture, operational needs, deployment workflow, and the amount of platform-specific functionality the project genuinely uses.",
    focus: "choosing deployment infrastructure around the project rather than brand preference",
    relatedPosts: ["kak-postignahme-100-100-v-google-pagespeed-insights", "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait"],
  },
  {
    slug: "kakvo-e-geo-i-zashto-shte-promeni-seo",
    category: "seo-geo",
    title: "What is GEO and why will it change SEO?",
    excerpt: "How generative engine optimisation extends established SEO work through clearer entities, answers, and machine-readable context.",
    intro: "GEO focuses on making information easier for generative systems to understand, connect, and cite. It complements technical and editorial SEO rather than replacing it.",
    focus: "content that is useful to both search engines and generative systems",
    relatedPosts: ["kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait", "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes"],
  },
  {
    slug: "kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait",
    category: "seo-geo",
    title: "What is llms.txt and does your website need it?",
    excerpt: "What the proposed llms.txt standard does, where it may help, and why it is not an official ranking factor.",
    intro: "llms.txt is a lightweight proposed convention for guiding AI tools toward important information. It can improve orientation, but it does not guarantee ranking or citation.",
    focus: "using llms.txt as a supporting AI-readiness layer without overstating its role",
    relatedPosts: ["kakvo-e-geo-i-zashto-shte-promeni-seo", "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes"],
  },
  {
    slug: "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes",
    category: "seo-geo",
    title: "What ChatGPT sees when it analyses your business",
    excerpt: "How clear services, entity signals, structured content, and consistent public information shape AI interpretation.",
    intro: "AI systems do not see a business through one page alone. They combine public descriptions, service language, structured data, articles, links, and external references.",
    focus: "the signals that help AI systems form a coherent understanding of a business",
    relatedPosts: ["kakvo-e-geo-i-zashto-shte-promeni-seo", "nai-chestite-seo-greshki-na-malkite-firmeni-saitove"],
  },
  {
    slug: "nai-chestite-seo-greshki-na-malkite-firmeni-saitove",
    category: "seo-geo",
    title: "The most common SEO mistakes on small business websites",
    excerpt: "Missing page purpose, duplicated metadata, weak internal links, unclear services, and technical inconsistencies reduce visibility.",
    intro: "Small websites rarely fail because they lack hundreds of pages. They fail when the few pages they have do not explain the business clearly or connect into a coherent structure.",
    focus: "a reliable SEO foundation for compact business websites",
    relatedPosts: ["kakvo-e-geo-i-zashto-shte-promeni-seo", "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait"],
  },
  {
    slug: "10-greshki-v-socialnite-mrezhi",
    category: "social-media",
    title: "10 social media mistakes we see every day",
    excerpt: "Inconsistent visuals, unclear purpose, weak formats, and publishing without a system make channels harder to recognise and maintain.",
    intro: "Most social media problems are not caused by one bad post. They come from repeated decisions made without a stable visual and editorial direction.",
    focus: "social media communication built around a repeatable system",
    relatedPosts: ["zashto-publikuvaneto-vseki-den-ne-e-strategiya", "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie"],
  },
  {
    slug: "zashto-publikuvaneto-vseki-den-ne-e-strategiya",
    category: "social-media",
    title: "Why publishing every day is not a strategy",
    excerpt: "Frequency cannot replace purpose, relevance, format discipline, and a clear relationship with business goals.",
    intro: "Daily publishing may increase output while making the channel less coherent. A strategy defines what should be said, to whom, why, and in which format.",
    focus: "social publishing guided by purpose rather than volume",
    relatedPosts: ["10-greshki-v-socialnite-mrezhi", "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie"],
  },
  {
    slug: "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
    category: "content",
    title: "How to build a consistent digital presence",
    excerpt: "A consistent presence connects identity, website, content, social channels, and advertising through shared rules.",
    intro: "Consistency does not mean repeating the same layout everywhere. It means that every channel expresses the same position through an appropriate format.",
    focus: "a coherent digital presence across multiple channels",
    relatedPosts: ["zashto-sazdadohme-d-media", "10-greshki-v-socialnite-mrezhi"],
  },
  {
    slug: "kak-ai-promenya-grafichniya-dizain-prez-2026",
    category: "ai-design",
    title: "How AI is changing graphic design in 2026",
    excerpt: "AI changes research, iteration, production, and image workflows, while judgement and responsibility remain human tasks.",
    intro: "AI is becoming part of everyday design production, but faster output does not automatically create stronger communication or more original direction.",
    focus: "responsible use of AI within a professional design process",
    relatedPosts: ["kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni", "avtorski-prava-ai-i-dizain"],
  },
  {
    slug: "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni",
    category: "ai-design",
    title: "Where AI helps designers and where it cannot replace them",
    excerpt: "AI can accelerate exploration and production, but it cannot own context, taste, accountability, or the final decision.",
    intro: "The useful question is not whether AI replaces designers, but which tasks benefit from automation and which still require interpretation and professional judgement.",
    focus: "the division between assisted production and design responsibility",
    relatedPosts: ["kak-ai-promenya-grafichniya-dizain-prez-2026", "avtorski-prava-ai-i-dizain"],
  },
  {
    slug: "avtorski-prava-ai-i-dizain",
    category: "ai-design",
    title: "Copyright, AI, and design: what businesses should know",
    excerpt: "AI-assisted work requires attention to source material, licences, platform terms, review, and the rights attached to final deliverables.",
    intro: "Using an AI tool does not remove questions about origin, permission, ownership, or responsibility. These issues should be considered before generated material enters commercial use.",
    focus: "the practical rights and risk questions around AI-assisted design",
    relatedPosts: ["kak-ai-promenya-grafichniya-dizain-prez-2026", "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni"],
  },
  {
    slug: "kak-dostignahme-100-100-100-100-na-d-media-org",
    category: "case-studies",
    title: "How d-media.org reached 100/100/100/100",
    excerpt: "A case study on the architecture, asset discipline, accessibility, SEO, and QA process behind the verified Lighthouse results.",
    intro: "d-media.org was developed as a working platform, not a demonstration page. Performance, accessibility, best practices, and SEO were treated as one production standard.",
    focus: "the verified performance and quality system behind d-media.org",
    relatedPosts: ["kak-postignahme-100-100-v-google-pagespeed-insights", "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait"],
    featured: true,
  },
];

export const publishedEnPosts: BlogPost[] = seeds.map((seed) => {
  const sections = seed.sections ?? sectionsFor(seed);
  const wordCount = [seed.title, seed.excerpt, seed.intro, ...sections.flatMap((section) => [section.title, ...section.paragraphs])]
    .join(" ")
    .trim()
    .split(/\s+/u).length;

  return {
    slug: seed.slug,
    category: seed.category,
    datePublished: date,
    dateModified: date,
    readingTime: Math.max(3, Math.ceil(wordCount / 180)),
    title: seed.title,
    excerpt: seed.excerpt,
    intro: seed.intro,
    metaTitle: seed.title,
    metaDescription: seed.excerpt,
    seoTitle: seed.title,
    seoDescription: seed.excerpt,
    author: "d . media",
    tags: [seed.category, "d . media", seed.focus],
    keywords: [seed.category, "d . media", seed.focus],
    language: "en-US",
    featured: seed.featured ?? false,
    draft: false,
    relatedPosts: seed.relatedPosts,
    sections,
    relatedLinks: [
      { href: "/services", label: "Explore services" },
      { href: "/projects", label: "View selected work" },
    ],
    ctaTitle: "If this is part of your current scope, start with context.",
    ctaText: "Send the project, required outcome, current situation, and timing. We will return a clear next step based on the real scope.",
    ctaPrimaryLabel: "Send project context",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Explore services",
    ctaSecondaryHref: "/services",
  };
});
