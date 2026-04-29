import Link from "next/link";

import { getUiCopy } from "@/lib/ui-copy";

export default function NotFound() {
  const ui = getUiCopy("bg");

  return (
    <main className="site-shell">
      <section className="section-grid">
        <div className="section-heading page-intro">
          <p className="eyebrow">{ui.notFound.eyebrow}</p>
          <h1>{ui.notFound.title}</h1>
          <Link href="/" className="button button-primary">
            {ui.notFound.home}
          </Link>
        </div>
      </section>
    </main>
  );
}
