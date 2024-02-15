import { useContext } from "react";
import AppContext from "@/contexts/AppContext/AppContext";
import {
  AppMode,
  Bookmark,
  ReaderMode,
} from "@/contexts/AppContext/AppContextProvider";

import ConfigIcon from "@/assets/config.svg?react";
import ChaptersIcon from "@/assets/chapters.svg?react";
import BookmarksIcon from "@/assets/bookmarks.svg?react";
import AddBookmarkIcon from "@/assets/addBookmark.svg?react";
import ArrowLeftIcon from "@/assets/arrowLeft.svg?react";

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);

  const chaptersHandle = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.Chapters
          ? ReaderMode.Settings
          : ReaderMode.Chapters,
    });
  };

  const openSettings = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.SettingsView
          ? ReaderMode.Settings
          : ReaderMode.SettingsView,
    });
  };

  const bookmarksHandle = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.Bookmarks
          ? ReaderMode.Settings
          : ReaderMode.Bookmarks,
    });
  };

  const addBookmarkHandle = () => {
    dispatch({ type: "SET_BOOKMARK_ACTIVE", value: true })

    dispatch({
      type: "ADD_BOOKMARK",
      value: {
        page: state?.currentPage || 0,
        title: state?.book.title || "",
        chapter: state?.chapters[state?.currentChapterIndex || 0].label || "",
        author: state?.book.author || "",
      } as Bookmark,
    });

    setTimeout(() => dispatch({ type: "SET_BOOKMARK_ACTIVE", value: false }), 2000)
  };

  const renderContent = () => {
    switch (state?.appMode) {
      case AppMode.Preview:
        return <p className={"flex justify-center w-full items-center text-sm"}>{"Книги"}</p>;
      case AppMode.Read:
        return (
          <div className="flex justify-between items-center w-full px-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <ArrowLeftIcon
                onClick={() => {
                  dispatch({ type: "SET_APPMODE", value: AppMode.Preview });
                }}
                className="min-w-min"
              />

              <div className="flex flex-col overflow-hidden">
                <p className={"items-center text-sm truncate ..."}>
                  {state.book.title}
                </p>

                <p className={"items-center text-sm truncate ..."}>
                  {state.book.author}
                </p>
              </div>
            </div>

            <div className="flex grow">
              <ConfigIcon
                stroke={
                  state.readerMode === ReaderMode.SettingsView
                    ? "#E21A1A"
                    : "black"
                }
                onClick={openSettings}
              />

              <ChaptersIcon
                stroke={
                  state.readerMode === ReaderMode.Chapters ? "#E21A1A" : "black"
                }
                onClick={chaptersHandle}
              />

              <BookmarksIcon
                stroke={
                  state.readerMode === ReaderMode.Bookmarks
                    ? "#E21A1A"
                    : "black"
                }
                onClick={bookmarksHandle}
              />

              <AddBookmarkIcon
                stroke={
                  state?.bookmarkIconHighlighted
                    ? "#E21A1A"
                    : "black"
                }
                onClick={addBookmarkHandle}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        transform: `translateY(${
          state?.appMode === AppMode.Read &&
          state.readerMode === ReaderMode.Read
            ? "-3rem"
            : 0
        })`,
        boxShadow: "0px 2px 3px 0px #00000040",
      }}
      className="z-50 flex justify-between align-middle h-12 shadow sticky top-0 bg-white transition-all"
    >
      {renderContent()}
    </div>
  );
};

export default Navbar;
