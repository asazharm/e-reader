import React, { useContext } from "react";
import AppContext from "@/contexts/AppContext/AppContext";
import { AppMode } from "@/contexts/AppContext/AppContextProvider";

const Preview = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="container p-4">
      <div className="container flex flex-col justify-center align-middle gap-6 h-max px-14 py-8 ">
        <img src="/bookcover.png" alt="" />
        <button
          onClick={() => {
            dispatch({ type: "SET_APPMODE", value: AppMode.Read });
          }}
          className=" w-full h-12 bg-primary text-white"
        >
          Читать
        </button>
      </div>
      <div className="container">
        <p className="text-lg font-bold leading-5 pb-4">{state?.book.title}</p>
        <p className="text-sm leading-5">{state?.book.author}</p>
        <p className="text-xs leading-5 pb-4 text-secondary">
          {state?.book.genre}
        </p>
        {/* <p className="text-base  pb-4">Описание</p>
        <p className="text-xs leading-5 text-justify tracking-wide">
          {state?.book.desc}
        </p> */}
      </div>
    </div>
  );
};

export default Preview;
