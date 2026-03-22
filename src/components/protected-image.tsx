"use client";

import Image, { type ImageProps } from "next/image";

type ProtectedImageProps = ImageProps & {
  protectionClassName?: string;
};

export function ProtectedImage({
  protectionClassName,
  className,
  alt,
  ...props
}: ProtectedImageProps) {
  return (
    <span
      className={`protected-image${protectionClassName ? ` ${protectionClassName}` : ""}`}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <Image
        alt={alt}
        {...props}
        draggable={false}
        className={className}
      />
      <span className="protected-image-shield" aria-hidden="true" />
    </span>
  );
}
