import { ImageResponse } from "next/og";

import { blobAssetManifest } from "@/lib/blob-asset-manifest";

export const runtime = "nodejs";

async function loadImageDataUrl(relativePath: string) {
  const response = await fetch(
    blobAssetManifest[relativePath] ?? new URL(relativePath, "https://www.d-media.org"),
  );
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:${response.headers.get("content-type") ?? "image/png"};base64,${base64}`;
}

export async function GET() {
  const logotype = await loadImageDataUrl("/assets/brand/ONLY-logotype.png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f5f0",
          padding: "64px 84px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            alt="d . media logotype"
            src={logotype}
            style={{ width: 720, height: 196, objectFit: "contain" }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
