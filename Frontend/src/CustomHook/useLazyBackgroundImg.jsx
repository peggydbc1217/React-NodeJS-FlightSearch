import React, { useEffect, useRef, useState } from "react";

const useLazyBackgroundImg = (url) => {
  // const [inView, setInView] = useState(false);
  const [sourceLoaded, setSourceLoaded] = useState(null);
  // const placeholderRef = useRef();
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries, obs) => {
  //     for (const entry of entries) {
  //       console.log(entry.isIntersecting);
  //       if (entry.isIntersecting) {
  //         setInView(true);
  //         obs.disconnect();
  //       }
  //     }
  //   }, {});
  //   observer.observe(placeholderRef.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      setSourceLoaded(url);
    };
  }, [url]);

  return sourceLoaded;
  // <div
  //   style={{
  //     backgroundImage: inView ? "" : `url(${url})`,
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat",
  //     filter: `${inView ? "blur(0px)" : "blur(10px)"}`,
  //   }}
  //   ref={placeholderRef}
  // >
  //   {children}
  // </div>

  // return inView ? (
  //   <img {...props} alt={props.alt || ""} />
  // ) : (
  //   <img
  //     {...props}
  //     ref={placeholderRef}
  //     src={placeholder}
  //     alt={props.alt || ""}
  //   />
  // );
};
export default useLazyBackgroundImg;
