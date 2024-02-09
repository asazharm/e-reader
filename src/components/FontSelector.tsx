import { FC, useMemo, useState, MouseEvent } from "react";

const fonts = ["Georgia", "Arial", "Verdana", "Helvetica", "Times New Roman"];

interface FontSelectorProps {
  font: string;

  setFont(font: string): void;
}

const FontSelector: FC<FontSelectorProps> = ({ font, setFont }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpened = () => setIsOpened((prevState) => !prevState);

  const otherFonts = useMemo(() => fonts.filter((f) => f !== font), [font]);

  const handleFont =
    (newFont: string) => (e: MouseEvent<HTMLParagraphElement>) => {
      e.stopPropagation();

      setFont(newFont);
      toggleOpened();
    };

  return (
    <div onClick={toggleOpened}>
      <p className="flex items-center justify-center text-2xl cursor-pointer py-3" style={{ fontFamily: font }}>
        {font}
      </p>

      {isOpened
        ? otherFonts.map((inner) => (
            <p
              className="flex items-center justify-center text-2xl cursor-pointer py-2 hover:text-red-600"
              onClick={handleFont(inner)}
              style={{ fontFamily: inner }}
            >
              {inner}
            </p>
          ))
        : null}
    </div>
  );
};

export default FontSelector;
