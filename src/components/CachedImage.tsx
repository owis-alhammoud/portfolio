"use client";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { getCachedImage, setCachedImage } from "../utils/imageDb";

export default function CachedImage(props: ImageProps & { alt: string }) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : "");

  useEffect(() => {
    if (typeof src !== "string") return;
    let cancelled = false;
    const key = `${src}`;

    getCachedImage(key)
      .then((cached) => {
        if (cancelled) return;
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
              setCachedImage(key, base64).catch(() => {});
              if (!cancelled) setImgSrc(base64);
            };
            reader.readAsDataURL(blob);
          })
          .catch(() => {
            if (!cancelled && typeof src === "string") {
              setImgSrc(src);
            }
          });
      })
      .catch(() => {
        if (!cancelled && typeof src === "string") {
          setImgSrc(src);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return <Image unoptimized width={1000}   height={1000}  loading="lazy" src={imgSrc} alt={alt} {...rest} />;
}
