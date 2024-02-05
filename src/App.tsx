import { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Reader from "./components/Reader";
import { AppMode } from "./contexts/AppContext/AppContextProvider";
import AppContext from "./contexts/AppContext/AppContext";
import Preview from "./components/Preview";

function App() {
  const { state } = useContext(AppContext);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const renderContent = () => {
    switch (state?.appMode) {
      case AppMode.Read:
        return <Reader />;
      case AppMode.Preview:
        return <Preview />;
      default:
        return null;
    }
  };

  return <Layout>{renderContent()}</Layout>;
}

export default App;
