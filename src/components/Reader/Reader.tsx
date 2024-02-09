import { ReactNode, useContext, useEffect, useRef } from "react";
import AppContext from "@/contexts/AppContext/AppContext";
import { ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import { IReactReaderStyle, ReactReader } from "react-reader";
import type { NavItem, Rendition } from "epubjs";
import { useSwipeable } from "react-swipeable";

import SpinnerIcon from "@/assets/spinner.svg?react";

import { Settings } from "@/components/Settings";
import Progressbar from "@/components/Progressbar";
import Chapters from "@/components/Chapters";
import AddedBookmark from "@/components/AddedBookmark";
import Bookmarks from "@/components/Bookmarks";

import { useReaderSettings } from "./use-reader-settings.ts";
import { useReaderPagination } from "./use-reader-pagination.ts";

const loadingView = (): ReactNode => {
  return (
    <div className="flex items-center justify-center h-dvh w-dvw">
      <SpinnerIcon />
    </div>
  );
};

const Reader = () => {
  const { state, dispatch } = useContext(AppContext);

  const rendition = useRef<Rendition | null>(null);

  const { font, setFont, fontSize, setFontSize, brightness, setBrightness } =
    useReaderSettings(rendition);

  const { pagination, handleLocationChange, progress, handlePageChange } =
    useReaderPagination(rendition);

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

    displayedLocation?.start &&
      dispatch({
        type: "SET_CHAPTERINDEX",
        value: displayedLocation?.start?.index,
      }); //problems with "react-reader" types.
  }, [state?.location]);

  const onLocationChanged = (epubcfi: string) => {
    dispatch({ type: "SET_LOCATION", value: epubcfi });
    handleLocationChange();
  };

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
        />

        <div
          className="z-30 absolute top-0 left-1/3 w-1/3 h-full"
          onClick={onClickHandle}
        />

        <div
          className="z-30 absolute top-0 left-2/3 w-1/3 h-full"
          onClick={nextPageHandle}
        />
      </div>

      {state?.readerMode === ReaderMode.Chapters && (
        <Chapters
          chapters={state.chapters}
          moveToTock={moveToToc}
          currentIndex={state.currentChapterIndex}
        />
      )}

      {state?.readerMode === ReaderMode.SettingsView && (
        <Settings
          fontSize={fontSize}
          setFontSize={setFontSize}
          brightness={brightness}
          setBrightness={setBrightness}
          rendition={rendition.current}
          font={font}
          setFont={setFont}
        />
      )}

      {state?.readerMode === ReaderMode.Bookmarks && <Bookmarks bookmarks={state.bookmarks} />}

      {state?.readerMode === ReaderMode.AddedBookmark && <AddedBookmark />}

      <Progressbar
        setPage={handlePageChange}
        total={pagination?.totalPages}
        page={pagination?.currentPage}
        title={state?.book.title}
        chapter={state?.chapters[state?.currentChapterIndex || 0]?.label}
        value={progress}
      />
    </>
  );
};

export default Reader;
