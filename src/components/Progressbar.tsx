import AppContext from "@/contexts/AppContext/AppContext";
import { ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import React, { useContext } from "react";

const Progressbar = () => {
  const { state } = useContext(AppContext);

  const renderProgress = () => {
    return (
      <div className="absolute bottom-0 z-50 w-full bg-white">
        <div
          className="bg-primary h-1 rounded-full"
          style={{ width: "45%" }}
        ></div>
      </div>
    );
  };

  return state?.readerMode === ReaderMode.Read ||
    state?.readerMode === ReaderMode.Settings
    ? renderProgress()
    : null;
};

export default Progressbar;
