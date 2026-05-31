import { NextResponse } from "next/server";

import { getResolvedLegacyMockupCollections } from "@/lib/asset-url";
import { type Locale } from "@/lib/i18n";

type LegacyCollectionRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: Request, { params }: LegacyCollectionRouteProps) {
  const { slug } = await params;
  const locale: Locale = new URL(request.url).searchParams.get("locale") === "en" ? "en" : "bg";
  const collection = getResolvedLegacyMockupCollections(locale).find(
    (item) => item.slug === slug,
  );

  if (!collection) {
    return NextResponse.json({ items: [] }, { status: 404 });
  }

  return NextResponse.json(
    { items: collection.items },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
