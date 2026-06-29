import { getCollection, type CollectionEntry } from "astro:content";
import { getAbsolutePageUrl } from "@/lib/seo";

export type KnowledgeBaseArticle = CollectionEntry<"knowledge-base">;

export async function getKnowledgeBaseArticles() {
  const articles = await getCollection("knowledge-base", ({ data }) => data.status === "published");

  return articles.sort((a, b) => {
    if (a.data.category !== b.data.category) return a.data.category.localeCompare(b.data.category, "bg");
    if (a.data.type !== b.data.type) return a.data.type === "pillar" ? -1 : 1;
    return a.data.title.localeCompare(b.data.title, "bg");
  });
}

export async function getKnowledgeBaseArticleBySlug(slug: string) {
  const articles = await getKnowledgeBaseArticles();
  return articles.find((article) => article.data.slug === slug);
}

export async function getRelatedKnowledgeBaseArticles(article: KnowledgeBaseArticle) {
  const articles = await getKnowledgeBaseArticles();
  const relatedSlugs = new Set(article.data.internalLinks);

  return articles.filter((item) => relatedSlugs.has(item.data.slug));
}

export function getKnowledgeBaseArticlePath(slug: string) {
  return `/knowledge-base/${slug}`;
}

export function getKnowledgeBaseArticleUrl(slug: string) {
  return getAbsolutePageUrl("bg", getKnowledgeBaseArticlePath(slug));
}

export function groupKnowledgeBaseArticles(articles: KnowledgeBaseArticle[]) {
  return articles.reduce<Record<string, Record<string, KnowledgeBaseArticle[]>>>((groups, article) => {
    groups[article.data.category] ??= {};
    groups[article.data.category][article.data.cluster] ??= [];
    groups[article.data.category][article.data.cluster].push(article);
    return groups;
  }, {});
}
