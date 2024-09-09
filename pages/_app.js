import "@/styles/globals.scss";
import "@/styles/unity.scss";
import "@/styles/reset.css";
import "@/styles/loading.scss";
import "@/styles/style.css";
import { StartRobot } from "@/hook/startContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import React, { useState } from "react";
import Loading from "@/component/loading";
import LayoutMain from "@/component/layout/layout-main";

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Provider store={store}>
        <StartRobot>
          <LayoutMain>
            {loading && <Loading />}
            <Component {...pageProps} />
          </LayoutMain>
        </StartRobot>
      </Provider>
    </>
  );
};

export default App;
