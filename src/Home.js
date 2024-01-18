import React from "react";
// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

// core components
import IndexNavbar from "components/layout/Headers/IndexNavbar";
import IndexHeader from "components/layout/Headers/IndexHeader";
import DarkFooter from "components/layout/Footers/DarkFooter";

// sections for this page
import Images from "components/index-sections/Images.js";
import LandingPage from "components/index-sections/LandingPage";

import Loader from "components/layout/Loader";
import { useSelector } from "react-redux";
function Home() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Loader loadingTime={20} /> // Display the loader for 3 seconds
      ) : (
        <>
          <IndexNavbar />
          <div className="wrapper">
            <IndexHeader />
            <div className="main">
              {/* <Images /> */}
              <LandingPage />
            </div>

            <DarkFooter />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
