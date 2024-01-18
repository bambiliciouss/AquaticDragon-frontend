// import React from "react";

// const Loader = () => {
//   const containerStyle = {
//     display: "flex",
//     alignItems: "center", // Center vertically
//     justifyContent: "center", // Center horizontally
//     height: "100vh", // Set the container height to fill the viewport
//   };

//   const loaderStyle = {
//     color: "black",
//     fontSize: "79px",
//   };

//   return (
//     <div style={containerStyle}>
//       <i
//         className="now-ui-icons loader_refresh spin"
//         style={loaderStyle}
//       ></i>
//     </div>
//   );
// };

// export default Loader;

import React, { useState, useEffect } from "react";

const Loader = ({ loadingTime }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start loading when the component mounts
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Stop loading after the specified time
    }, loadingTime * 1000); // Convert loadingTime from seconds to milliseconds

    return () => {
      // Clean up the timeout when the component unmounts
      clearTimeout(loadingTimeout);
    };
  }, [loadingTime]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>
        <i
          className="now-ui-icons loader_refresh spin"
          style={{ color: "black", fontSize: "79px" }}></i>
      </div>
    );
  } else {
    // Return null when not loading
    return null;
  }
};

export default Loader;
