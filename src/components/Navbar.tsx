import React, { useContext, useEffect } from "react";
import AppContext from "@/contexts/AppContext/AppContext";
import { AppMode, ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import BurgerIcon from "@/assets/burger.svg?react";
import ConfigIcon from "@/assets/d.svg?react";
import ChaptersIcon from "@/assets/a.svg?react";
import BookmarksIcon from "@/assets/b.svg?react";
import AddBookmarkIcon from "@/assets/c.svg?react";
import ArrowLeftIcon from "@/assets/arrowLeft.svg?react";

const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);

  const burgerHandle = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.Read
          ? ReaderMode.Settings
          : ReaderMode.Read,
    });
  };
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
        switch (state?.readerMode) {
          case ReaderMode.Read:
            return (
              <div className="flex justify-between items-center w-full px-8">
                <p className={"flex items-center text-sm"}>
                  {state.book.title} {state.book.author}
                </p>
                <BurgerIcon onClick={burgerHandle} />
              </div>
            );
          case ReaderMode.Settings:
          case ReaderMode.Chapters:
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
                <ConfigIcon />
                <ChaptersIcon onClick={chaptersHandle} />
                <BookmarksIcon />
                <AddBookmarkIcon />
              </div>
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <div className="container z-50 flex justify-center align-middle h-12 shadow sticky top-0 bg-white">
      {renderContent()}
    </div>
  );
};

export default Navbar;
