import React, { ReactNode, useContext } from "react";
import Navbar from "./Navbar";
import AppContext from "@/contexts/AppContext/AppContext";
import { AppMode } from "@/contexts/AppContext/AppContextProvider";
import Progressbar from "./Progressbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
