import Link from "next/link";

export function AnnouncementBar({
  text,
  href,
}: {
  text: string;
  href?: string;
}) {
  if (!text.trim()) {
    return null;
  }

  return (
    <div className="announcement-bar">
      {href ? (
        <Link href={href} className="announcement-bar-link">
          <span>{text}</span>
        </Link>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
