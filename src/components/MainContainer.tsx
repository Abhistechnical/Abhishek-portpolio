import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
const About = lazy(() => import("./About"));
const Career = lazy(() => import("./Career"));
const Contact = lazy(() => import("./Contact"));
const Cursor = lazy(() => import("./Cursor"));
const Landing = lazy(() => import("./Landing"));
const WhatIDo = lazy(() => import("./WhatIDo"));
const Work = lazy(() => import("./Work"));
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Suspense fallback={null}>
              <Landing>{!isDesktopView && children}</Landing>
            </Suspense>
            <Suspense fallback={null}>
              <About />
            </Suspense>
            <Suspense fallback={null}>
              <WhatIDo />
            </Suspense>
            <Suspense fallback={null}>
              <Career />
            </Suspense>
            <Suspense fallback={null}>
              <Work />
            </Suspense>
            {isDesktopView && (
              <Suspense fallback={null}>
                <TechStack />
              </Suspense>
            )}
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
