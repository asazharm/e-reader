import Sidebar from "@/components/Sidebar.tsx";
import type { NavItem } from "epubjs";
import { FC } from "react";

interface ChaptersProps {
  chapters?: NavItem[];

  moveToTock(path: string): void;

  currentIndex?: number;
}

const Chapters: FC<ChaptersProps> = ({
  chapters: [first, ...others] = [],
  currentIndex,
  moveToTock,
}) => {
  const handleClick = (chapter: NavItem) => () => moveToTock(chapter.href);

  return (
    <Sidebar right={false}>
      <p className="font-bold leading-6 py-3 px-4">{first?.label}</p>

      {others.map((chapter, index) => (
        <div
          key={index}
          className="py-3 px-4"
          onClick={handleClick(chapter)}
          style={{
            background: currentIndex === index ? "#0000000A" : "white",
          }}
        >
          <p className="text-sm leading-5">{chapter.label}</p>
        </div>
      ))}
    </Sidebar>
  );
};

export default Chapters;
