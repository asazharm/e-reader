import React, { ReactNode, useContext, useEffect, useRef } from "react";
import AppContext from "@/contexts/AppContext/AppContext";
import { ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import { IReactReaderStyle, ReactReader } from "react-reader";
import type { NavItem, Rendition } from "epubjs";
import Progressbar from "./Progressbar";
import { useSwipeable } from "react-swipeable";
import SpinnerIcon from "@/assets/spinner.svg?react";

const loadingView = (): ReactNode => {
  return (
    <div className="flex items-center justify-center h-dvh w-dvw">
      <SpinnerIcon />
    </div>
  );
};

const renderChapters = (
  chapters: NavItem[],
  currentChapterIndex: number,
  moveToTock: (cfi: string) => void
): ReactNode => {
  const chaptersCpy = [...chapters];

  return (
    <div className="absolute top-12 z-40 min-h-100dvh w-full bg-white p-4">
      <p className="font-bold leading-6">{chaptersCpy.shift()?.label}</p>
      {chaptersCpy.map((chapter, index) => (
        <div
          className="py-3"
          onClick={() => moveToTock(chapter.href)}
          style={{
            background: currentChapterIndex === index ? "#0000000A" : "white",
          }}
        >
          <p className="text-sm leading-5">{chapter.label}</p>
        </div>
      ))}
    </div>
  );
};

const Reader = () => {
  const { state, dispatch } = useContext(AppContext);

  const rendition = useRef<Rendition | undefined>(undefined);

  const onClickHandle = () => {
    dispatch({
      type: "SET_READERMODE",
      value:
        state?.readerMode === ReaderMode.Read
          ? ReaderMode.Settings
          : ReaderMode.Read,
    });
  };

  useEffect(() => {
    if (!rendition.current || !state?.location) return;
    const displayedLocation = rendition.current.currentLocation();
    dispatch({
      type: "SET_CHAPTERINDEX",
      value: displayedLocation?.start.index,
    }); //problems with "react-reader" types.
  }, [state?.location]);

  // useEffect(() => {
  //   if (!rendition.current) return;
  //   rendition.current.location
  //   percentageFromCfi;
  // }, [rendition]);

  const onLocationChanged = (epubcfi: string) =>
    dispatch({ type: "SET_LOCATION", value: epubcfi });

  const tocChangedHandle = (chapters: NavItem[]) => {
    dispatch({ type: "SET_CHAPTERS", value: chapters });
  };

  const moveToToc = (cfi: string) => {
    if (!rendition.current) return;
    rendition.current.display(cfi);
    dispatch({ type: "SET_READERMODE", value: ReaderMode.Read });
  };

  const nextPageHandle = () => {
    if (!rendition.current) return;
    rendition.current.next();
  };
  const prevPageHandle = () => {
    if (!rendition.current) return;
    rendition.current.prev();
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwipedLeft: () => {
      nextPageHandle();
    },
    onSwipedRight: () => {
      prevPageHandle();
    },
  });

  return (
    <>
      <div {...handlers} id="reader" className={"h-100dvh]"}>
        <ReactReader
          readerStyles={{} as IReactReaderStyle}
          epubViewStyles={{
            view: {
              height: "100dvh",
              width: "100%",
              position: "absolute",
              top: "0",
            },
            viewHolder: {},
          }}
          tocChanged={tocChangedHandle}
          url="https://react-reader.metabits.no/files/alice.epub"
          location={state?.location || 0}
          locationChanged={onLocationChanged}
          swipeable
          showToc={false}
          getRendition={(_rendition: Rendition) => {
            rendition.current = _rendition;
          }}
          loadingView={loadingView()}
        />
        <div
          className="z-30 absolute top-0 left-0 w-1/3 h-full"
          onClick={prevPageHandle}
        ></div>
        <div
          className="z-30 absolute top-0 left-1/3 w-1/3 h-full"
          onClick={onClickHandle}
        ></div>
        <div
          className="z-30 absolute top-0 left-2/3 w-1/3 h-full"
          onClick={nextPageHandle}
        ></div>
      </div>

      {state?.readerMode === ReaderMode.Chapters &&
        renderChapters(state.chapters, state.currentChapterIndex, moveToToc)}
      <Progressbar />
    </>
  );
};

export default Reader;
