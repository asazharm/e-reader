import { MutableRefObject, useEffect, useState } from "react";
import { Rendition } from "epubjs";
import { getReaderAppearance } from "@/utils/get-reader-appearance";

export const useReaderSettings = (
  rendition: MutableRefObject<Rendition | null>
) => {
  const [fontSize, setFontSize] = useState(14);
  const [brightness, setBrightness] = useState(10);
  const [font, setFont] = useState("Arial");

  useEffect(
    () => rendition.current?.themes.fontSize(`${fontSize * 10}%`),
    [fontSize]
  );

  useEffect(() => {
    const { bg, color } = getReaderAppearance(brightness);

    rendition.current?.themes.override("background-color", bg);
    rendition.current?.themes.override("color", color);
  }, [brightness]);

  useEffect(() => rendition.current?.themes.font(font), [font]);

  return {
    fontSize,
    setFontSize,
    brightness,
    setBrightness,
    font,
    setFont,
  };
};
