import Image from "next/image";
import type { Photo as PhotoT } from "@/content/images";

type Props = {
  photo: PhotoT;
  sizes: string;
  className?: string;
  /** CSS object-position, art-directed per image. */
  position?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: 70 | 80;
  alt?: string;
};

export function Photo({ photo, sizes, className = "", position = "50% 50%", priority, fill = true, quality = 70, alt }: Props) {
  if (fill) {
    return (
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${className}`}
        style={{ objectPosition: position }}
      />
    );
  }
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}
