import { Bookmark } from "@/contexts/AppContext/AppContextProvider";
import { FC } from "react";
import Sidebar from "@/components/Sidebar.tsx";

interface BookmarksProps {
  bookmarks?: Bookmark[];
}

const Bookmarks: FC<BookmarksProps> = ({ bookmarks = [] }) => (
  <Sidebar right={false}>
    {bookmarks.map((bookmark) => (
      <div
        key={bookmark.page}
        className="flex justify-between items-center py-3 px-4"
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-sm">
            {bookmark.title}. {bookmark.author}
          </p>

          <p className="text-xs text-secondary">{bookmark.chapter}</p>
        </div>

        <p className="text-sm font-bold">{bookmark.page}</p>
      </div>
    ))}
  </Sidebar>
);

export default Bookmarks;
