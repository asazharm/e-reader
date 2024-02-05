import React, { useContext, useEffect } from "react";
import AppContext from "@/contexts/AppContext/AppContext";
import { AppMode, ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import BurgerIcon from "@/assets/burger.svg?react";
import ConfigIcon from "@/assets/config.svg?react";
import ChaptersIcon from "@/assets/chapters.svg?react";
import BookmarksIcon from "@/assets/bookmarks.svg?react";
import AddBookmarkIcon from "@/assets/addBookmark.svg?react";
import ArrowLeftIcon from "@/assets/arrowLeft.svg?react";

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);

  // const configHandle = () => {};
  const chaptersHandle = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.Chapters
          ? ReaderMode.Settings
          : ReaderMode.Chapters,
    });
  };
  // const bookmarksHandle = () => {};
  // const addBookmarkHandle = () => {};

  const renderContent = () => {
    switch (state?.appMode) {
      case AppMode.Preview:
        return <p className={"flex items-center text-sm"}>{"Книги"}</p>;
      case AppMode.Read:
        return (
          <div className="flex justify-between items-center w-full px-4">
            <ArrowLeftIcon
              onClick={() => {
                dispatch({ type: "SET_APPMODE", value: AppMode.Preview });
              }}
            />
            <p className={"items-center text-sm truncate ... px-4 w-1/2"}>
              {state.book.title} {state.book.author}
            </p>
            <ConfigIcon stroke={"gray"} />
            <ChaptersIcon
              stroke={
                state.readerMode === ReaderMode.Chapters ? "#E21A1A" : "black"
              }
              onClick={chaptersHandle}
            />
            <BookmarksIcon stroke={"gray"} />
            <AddBookmarkIcon stroke={"gray"} />
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
          state?.readerMode === ReaderMode.Read ? "-3rem" : 0
        })`,
      }}
      className="container z-50 flex justify-center align-middle h-12 shadow sticky top-0 bg-white transition-all"
    >
      {renderContent()}
    </div>
  );
};

export default Navbar;
