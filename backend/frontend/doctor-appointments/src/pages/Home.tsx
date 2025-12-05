import CallToAction from "../components/CallToAction";

import React, { Suspense } from "react";
import About from "./About";
const HeroSlider = React.lazy(() => import("../components/HeroSlider"));
const Home = () => {
  return (
    <>
      <Suspense
        fallback={<div className="loading loading-dots loading-xl"></div>}
      >
        <HeroSlider />
      </Suspense>

      <CallToAction />
      <About />
    </>
  );
};

export default Home;
