"use client";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export default function CachedImage(props: ImageProps & { alt: string }) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : "");

  useEffect(() => {
    if (typeof src !== "string") return;
    const key = `img-cache:${src}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      setImgSrc(cached);
      return;
    }
    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          try {
            localStorage.setItem(key, base64);
          } catch {
            // storage full or disabled
          }
          setImgSrc(base64);
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {});
  }, [src]);

  return <Image src={imgSrc} alt={alt} {...rest} />;
}
