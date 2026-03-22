import Image from "next/image";

type BrandAssetProps = {
  lightSrc: string;
  darkSrc?: string;
  alt: string;
  width: number;
  height: number;
  darkWidth?: number;
  darkHeight?: number;
  priority?: boolean;
  className?: string;
};

export function BrandAsset({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  darkWidth,
  darkHeight,
  priority,
  className,
}: BrandAssetProps) {
  return (
    <span className={`brand-asset ${className ?? ""}`.trim()}>
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`brand-asset-light${darkSrc ? "" : " brand-asset-single"}`}
      />
      {darkSrc ? (
        <Image
          src={darkSrc}
          alt={alt}
          width={darkWidth ?? width}
          height={darkHeight ?? height}
          priority={priority}
          className="brand-asset-dark"
        />
      ) : null}
    </span>
  );
}
