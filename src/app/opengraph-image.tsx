import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadFont(fileName: string) {
  const fontPath = path.join(process.cwd(), "public", "assets", "fonts", fileName);
  return readFile(fontPath);
}

export default async function OpenGraphImage() {
  const [pantonBlack, pantonRegular, pantonLight] = await Promise.all([
    loadFont("Panton-Black.ttf"),
    loadFont("Panton-Regular.ttf"),
    loadFont("Panton-Light.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f7f4",
          color: "#101010",
          position: "relative",
          fontFamily: "Panton Regular",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            borderRadius: 42,
            border: "2px solid #dbd8d1",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 74,
            borderRadius: 32,
            border: "2px solid #e9e6df",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "126px 120px 78px 120px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 18,
                fontFamily: "Panton Black",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ fontSize: 116, color: "#0a0a0a" }}>d</span>
              <span style={{ fontSize: 116, color: "#dcd8cf", marginLeft: -54 }}>.</span>
              <span style={{ fontSize: 116, color: "#8e8e8c", marginLeft: -8 }}>media</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: 920,
              }}
            >
              <span
                style={{
                  fontSize: 44,
                  lineHeight: 1.08,
                  fontFamily: "Panton Black",
                  letterSpacing: "-0.03em",
                }}
              >
                Бранд идентичност, съдържание и дигитално присъствие.
              </span>
              <span
                style={{
                  fontSize: 28,
                  lineHeight: 1.2,
                  color: "#6f6f6b",
                  fontFamily: "Panton Light",
                }}
              >
                Подредена визуална система за реална клиентска работа.
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 24,
              color: "#8a8a86",
              fontFamily: "Panton Regular",
            }}
          >
            <span>www.d-media.org</span>
            <span>София, България</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Panton Black", data: pantonBlack, style: "normal", weight: 900 },
        { name: "Panton Regular", data: pantonRegular, style: "normal", weight: 400 },
        { name: "Panton Light", data: pantonLight, style: "normal", weight: 300 },
      ],
    },
  );
}
