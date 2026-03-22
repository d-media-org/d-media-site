import { ProtectedImage } from "@/components/protected-image";

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
      <ProtectedImage
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`brand-asset-light${darkSrc ? "" : " brand-asset-single"}`}
      />
      {darkSrc ? (
        <ProtectedImage
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
