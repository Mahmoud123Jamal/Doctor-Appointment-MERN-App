import About from "./About";
import React, { Suspense } from "react";
const HeroSlider = React.lazy(() => import("../components/HeroSlider"));
const Home = () => {
  return (
    <>
      <Suspense
        fallback={<div className="loading loading-dots loading-xl"></div>}
      >
        <HeroSlider />
      </Suspense>

      <About />
    </>
  );
};

export default Home;
