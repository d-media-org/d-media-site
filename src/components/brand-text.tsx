import { Fragment } from "react";

export function BrandName({ className }: { className?: string }) {
  return <span className={`brand-name ${className ?? ""}`.trim()}>d . media</span>;
}

export function BrandText({ text }: { text: string }) {
  const parts = text.split("d . media");

  if (parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${index}-${part.slice(0, 12)}`}>
          {part}
          {index < parts.length - 1 ? <BrandName /> : null}
        </Fragment>
      ))}
    </>
  );
}
