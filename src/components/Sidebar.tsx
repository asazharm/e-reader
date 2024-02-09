import { FC, PropsWithChildren, useContext } from "react";
import AppContext from "@/contexts/AppContext/AppContext.ts";
import { ReaderMode } from "@/contexts/AppContext/AppContextProvider.tsx";

interface SidebarProps {
  right?: boolean;
  center?: boolean;
}

const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({
  children,
  right = true,
  center,
}) => {
  const { dispatch } = useContext(AppContext);

  const onClickHandle = () =>
    dispatch({
      type: "SET_READERMODE",
      value: ReaderMode.Read,
    });

  return (
    <>
      <div
        onClick={onClickHandle}
        style={{
          backgroundColor: "#3B454F66",
        }}
        className=" z-30 fixed right-0 top-0 left-0 bottom-0"
      />

      <div
        style={{
          transform: center ? "translate(-50%, -50%)" : "none",
        }}
        className={`flex flex-col z-40 fixed ${
          center
            ? "left-1/2 top-1/2 flex items-center justify-center h-20 w-40 md:w-90 text-center"
            : right
            ? "right-0"
            : "left-0"
        } bg-white h-full md:w-1/4 w-full`}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
