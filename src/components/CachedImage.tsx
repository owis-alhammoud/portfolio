"use client";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { getCachedImage, setCachedImage } from "../utils/imageCache";

export default function CachedImage(props: ImageProps & { alt: string }) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : "");

  useEffect(() => {
    if (typeof src !== "string") return;
    let cancelled = false;
    let objectUrl: string | undefined;
    const key = `${src}`;

    getCachedImage(key)
      .then((cached) => {
        if (cancelled) return;
        if (cached) {
          objectUrl = URL.createObjectURL(cached);
          setImgSrc(objectUrl);
          return;
        }

        fetch(src)
          .then((res) => {
            if (!res.ok) throw new Error("failed");
            setCachedImage(key, res.clone()).catch(() => {});
            return res.blob();
          })
          .then((blob) => {
            if (cancelled) return;
            objectUrl = URL.createObjectURL(blob);
            setImgSrc(objectUrl);
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
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return <Image unoptimized width={1000}   height={1000}  loading="lazy" src={imgSrc} alt={alt} {...rest} />;
}
