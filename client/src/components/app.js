import React from "react";
import { Router, Location } from "@reach/router";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home5 from "./pages/home5";
import Exploregrey from "./pages/exploreGrey";
import Colectiongrey from "./pages/colectionGrey";
import ItemDetailReduxgrey from "./pages/ItemDetailReduxGrey";

import { createGlobalStyle } from "styled-components";
import Stake from "./pages/stake";
import OldToken from "./pages/oldToken";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const app = () => (
  <div className="wraper">
    <GlobalStyles />

    <Header />

    <PosedRouter>
      <ScrollTop path="/">
        <Home5 path="/" />

        <Exploregrey path="/explore" />

        <Colectiongrey path="/my-account" />

        <ItemDetailReduxgrey path="/detail/:itemId" />

        <Stake path="/stake" />
        
        <OldToken path="/old-token" />
      </ScrollTop>
    </PosedRouter>

    <ScrollToTopBtn />
  </div>
);
export default app;
