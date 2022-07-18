import React from "react";
import { Router, Location } from "@reach/router";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Home5 from "./pages/home5";
import Exploregrey from "./pages/exploreGrey";
import Colectiongrey from "./pages/colectionGrey";
import ItemDetailReduxgrey from "./pages/ItemDetailReduxGrey";

import { createGlobalStyle } from "styled-components";

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
        {/* <Home exact path="/">
          <Redirect to="/home" />
        </Home> */}
        {/* <HomeGrey path="/homeGrey" />
        <Home1 path="/home1" />
        <Home1grey path="/home1Grey" />
        <Home2 path="/home2" />
        <Home2grey path="/home2Grey" />
        <Home3 path="/home3" />
        <Home4 path="/home4" /> */}
        <Home5 path="/" />
        {/* <Home6 path="/home6" />
        <Explore path="/explore" /> */}
        <Exploregrey path="/explore" />
        {/* <Explore2 path="/explore2" />
        <Explore2grey path="/explore2Grey" />
        <ExploreOpensea path="/exploreOpensea" />
        <RankingRedux path="/rangking" />
        <RankingReduxgrey path="/rangkingGrey" />
        <Auction path="/Auction" />
        <Auctiongrey path="/AuctionGrey" />
        <Helpcenter path="/helpcenter" />
        <Helpcentergrey path="/helpcenterGrey" />
        <Colection path="/colection/:collectionId" /> */}
        <Colectiongrey path="/my-account" />
        {/* <ItemDetailRedux path="/ItemDetail/:nftId" /> */}
        <ItemDetailReduxgrey path="/detail/:itemId" />
        {/* <Author path="/Author/:authorId" />
        <Profile path="/Profile/:authorId" />
        <AuthorGrey path="/AuthorGrey/:authorId" />
        <AuthorOpensea path="/AuthorOpensea" />
        <Wallet path="/wallet" />
        <WalletGrey path="/walletGrey" />
        <Login path="/login" />
        <Logingrey path="/loginGrey" />
        <LoginTwo path="/loginTwo" />
        <LoginTwogrey path="/loginTwoGrey" />
        <Register path="/register" />
        <Registergrey path="/registerGrey" />
        <Price path="/price" />
        <Works path="/works" />
        <News path="/news" />
        <NewsSingle path="/news/:postId" />
        <Create path="/create" />
        <Creategrey path="/createGrey" />
        <Create2 path="/create2" />
        <Create3 path="/create3" />
        <Createoption path="/createOptions" />
        <Activity path="/activity" />
        <Activitygrey path="/activityGrey" />
        <Contact path="/contact" />
        <Contactgrey path="/contactGrey" />
        <ElegantIcons path="/elegantIcons" />
        <EtlineIcons path="/etlineIcons" />
        <FontAwesomeIcons path="/fontAwesomeIcons" />
        <Accordion path="/accordion" />
        <Alerts path="/alerts" />
        <Progressbar path="/progressbar" />
        <Tabs path="/tabs" />
        <Minter path="/mint" />
        <Mintergrey path="/minter" /> */}
      </ScrollTop>
    </PosedRouter>
    <ScrollToTopBtn />
  </div>
);
export default app;
