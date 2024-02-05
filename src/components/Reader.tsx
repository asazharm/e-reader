import AppContext from "@/contexts/AppContext/AppContext";
import { AppMode, ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import type { NavItem, Rendition } from "epubjs";
import Progressbar from "./Progressbar";

const renderChapters = (chapters: NavItem[]) => {
  return (
    <div className="absolute top-12 z-40 min-h-[calc(100dvh-3rem)] w-full bg-white p-4">
      {chapters.map((chapter) => (
        <div className="py-3">{chapter.label}</div>
      ))}
    </div>
  );
};

const Reader = () => {
  const { state, dispatch } = useContext(AppContext);

  const rendition = useRef<Rendition | undefined>(undefined);

  useEffect(() => {
    console.log(rendition.current);
  }, [rendition]);


  const onClickHandle = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.Read
          ? ReaderMode.Settings
          : ReaderMode.Read,
    });
  };

  const onLocationChanged = (epubcfi: string) =>
    dispatch({ type: "SET_LOCATION", value: epubcfi });

  const tocChangedHandle = (chapters: NavItem[]) => {
    dispatch({ type: "SET_CHAPTERS", value: chapters });
  };

  return (
    <>
      <div className={"h-[calc(100dvh-3rem)]"} onClick={onClickHandle}>
        <ReactReader
          tocChanged={tocChangedHandle}
          url="https://react-reader.metabits.no/files/alice.epub"
          location={state?.location || 0}
          locationChanged={onLocationChanged}
          swipeable
          showToc={false}
          getRendition={(_rendition: Rendition) => {
            console.log(_rendition)
            rendition.current = _rendition;
          }}
        />
      </div>

      {state?.readerMode === ReaderMode.Chapters &&
        renderChapters(state.chapters)}
      <Progressbar />
    </>
  );
};

export default Reader;
