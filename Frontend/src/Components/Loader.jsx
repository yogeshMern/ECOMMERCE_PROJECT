import { useState, useEffect } from "react";

const Loader = ({ duration = 600 }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity((prevOpacity) => Math.max(0, prevOpacity - 0.1)); // Decrease opacity by 0.1 in each interval

      if (opacity <= 0) {
        setOpacity(1); // Reset opacity to 1 when it reaches 0
      }
    }, duration / 10); // Divide duration by 10 for smoother effect

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [opacity, duration]);
  return (
    <>
      <h1
        className="text-4xl font-extrabold text-gray-600"
        style={{ opacity, transition: `opacity ${duration}ms linear` }}
      >
        Loading...
      </h1>
    </>
  );
};

export default Loader;
