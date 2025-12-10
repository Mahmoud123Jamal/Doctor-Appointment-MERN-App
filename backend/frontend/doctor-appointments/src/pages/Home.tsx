import CallToAction from "../components/CallToAction";

import React, { Suspense } from "react";
import About from "./About";
import StatusWrapper from "../components/Status";
import Departments from "../components/Departments";
import ShowDoctors from "../components/showDoctors";
import { LoadingDots } from "../components/Loadings";
const HeroSlider = React.lazy(() => import("../components/HeroSlider"));
const Home = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <LoadingDots />
          </div>
        }
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
