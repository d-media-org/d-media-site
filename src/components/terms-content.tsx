"use client";

import { useState } from "react";

import { BrandText } from "@/components/brand-text";
import type { LegalSection } from "@/lib/legal-content";

type SummarySection = {
  readonly title: string;
  readonly text: string;
};

type TermsContentCopy = {
  shortLabel: string;
  fullLabel: string;
  fullTitle: string;
};

export function TermsContent({
  copy,
  summaryItems,
  summarySections,
  fullSections,
}: {
  copy: TermsContentCopy;
  summaryItems: readonly string[];
  summarySections: readonly SummarySection[];
  fullSections: readonly LegalSection[];
}) {
  const [mode, setMode] = useState<"short" | "full">("short");

  const parseMarker = (text: string) => {
    const numberedMatch = text.match(/^(\d+(?:\.\d+){2,}\.)\s*(.+)$/);
    if (numberedMatch) {
      return { marker: numberedMatch[1], body: numberedMatch[2], kind: "numbered" as const };
    }

    const clauseMatch = text.match(/^(\d+\.\d+\.)\s*(.+)$/);
    if (clauseMatch) {
      return { marker: clauseMatch[1], body: clauseMatch[2], kind: "clause" as const };
    }

    const bracketMatch = text.match(/^(\(\d+\))\s*(.+)$/);
    if (bracketMatch) {
      return { marker: bracketMatch[1], body: bracketMatch[2], kind: "bracketed" as const };
    }

    return null;
  };

  const isNumberedBullet = (text: string) => parseMarker(text) !== null;

  const renderTextLine = (
    text: string,
    as: "p" | "li",
    key: string,
    forceDash = false,
  ) => {
    const Tag = as;
    const markerData = parseMarker(text);
    const classNames = ["terms-line"];

    if (forceDash) {
      classNames.push("is-dash");
    }

    if (markerData?.kind === "clause") {
      classNames.push("is-clause");
    }

    if (markerData) {
      classNames.push("is-marked");
      return (
        <Tag className={classNames.join(" ")} key={key}>
          <span className="terms-line-marker">{markerData.marker}</span>
          <span className="terms-line-text">
            <BrandText text={markerData.body} />
          </span>
        </Tag>
      );
    }

    return (
      <Tag className={classNames.join(" ")} key={key}>
        {forceDash ? <span className="terms-line-marker" aria-hidden="true">-</span> : null}
        <span className="terms-line-text">
          <BrandText text={text} />
        </span>
      </Tag>
    );
  };

  const renderSection = (section: LegalSection, level: 2 | 3 = 2) => {
    const Heading = level === 2 ? "h2" : "h3";
    const allBulletsAreUnnumbered = section.bullets?.every((bullet) => !isNumberedBullet(bullet));
    const bulletListClassName = allBulletsAreUnnumbered
      ? "terms-bullet-list terms-bullet-list-dash"
      : "terms-bullet-list";

    return (
      <section className={level === 2 ? "terms-block terms-full-section" : "terms-subsection"} key={`${section.id}-${section.title ?? ""}`}>
        {section.title ? (
          level === 3 ? (
            <Heading className="terms-marked-heading">
              <span className="terms-line-marker">{section.id}.</span>
              <span className="terms-line-text">{section.title}</span>
            </Heading>
          ) : (
            <Heading>{section.id}. {section.title}</Heading>
          )
        ) : null}

        {section.content?.map((paragraph) => renderTextLine(paragraph, "p", paragraph))}

        {section.bullets ? (
          <ul className={bulletListClassName}>
            {section.bullets.map((bullet) => renderTextLine(bullet, "li", bullet, !isNumberedBullet(bullet)))}
          </ul>
        ) : null}

        {section.subsections?.map((subsection) => renderSection(subsection, 3))}

        {section.tail?.map((paragraph) => renderTextLine(paragraph, "p", paragraph))}
      </section>
    );
  };

  return (
    <div className="terms-layout">
      <div className="terms-toggle" role="tablist" aria-label={copy.fullTitle}>
        <button
          type="button"
          className={mode === "short" ? "is-active" : undefined}
          aria-pressed={mode === "short"}
          onClick={() => setMode("short")}
        >
          {copy.shortLabel}
        </button>
        <button
          type="button"
          className={mode === "full" ? "is-active" : undefined}
          aria-pressed={mode === "full"}
          onClick={() => setMode("full")}
        >
          {copy.fullLabel}
        </button>
      </div>

      {mode === "short" ? (
        <div className="terms-short">
          <section className="terms-block card terms-short-card terms-short-primary">
            <ul className="terms-summary-list">
              {summaryItems.map((item) => (
                <li key={item}>
                  <BrandText text={item} />
                </li>
              ))}
            </ul>
          </section>

          <div className="terms-summary-grid">
            {summarySections.map((section) => (
              <section className="terms-block card terms-short-card" key={section.title}>
                <h2>{section.title}</h2>
                <p>
                  <BrandText text={section.text} />
                </p>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <div className="terms-full">
          <div className="terms-full-shell">
            {fullSections.map((section) => renderSection(section))}
          </div>
        </div>
      )}
    </div>
  );
}
