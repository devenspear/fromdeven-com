"use client";

import Image from "next/image";

interface PolaroidPhotoProps {
  src: string;
  alt: string;
  position: "left" | "right";
  index: number;
}

export function PolaroidPhoto({ src, alt, position }: PolaroidPhotoProps) {
  return (
    <div
      className={`
        polaroid-photo
        ${position === "left" ? "float-left" : "float-right"}
        clear-both
      `}
    >
      <div className="polaroid-frame">
        <div className="polaroid-image-container">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={400}
            className="polaroid-image"
            sizes="(max-width: 480px) 240px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 300px"
          />
        </div>
      </div>
    </div>
  );
}
