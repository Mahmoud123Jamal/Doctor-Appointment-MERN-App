import CallToAction from "../components/CallToAction";

import React, { Suspense } from "react";
import About from "./About";
import StatusWrapper from "../components/Status";
import Departments from "../components/Departments";
import ShowDoctors from "../components/showDoctors";
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
      <StatusWrapper />
      <Departments />
      <ShowDoctors />
    </>
  );
};

export default React.memo(Home);
