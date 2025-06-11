import React from "react";

const BackgroundGradient = () => {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-190px] left-[100px] size-70 rounded-full bg-[radial-gradient(circle,_#4CE7ED66_0%,_#050A0E_100%)] blur-2xl md:top-[-230px] md:left-[-130px] md:size-90"></div>
        <div className="absolute top-[-150px] left-[-130px] size-80 rounded-full bg-[radial-gradient(circle,_#4CE7ED66_0%,_#050A0E_100%)] blur-2xl md:top-[-380px] md:left-[130px] md:size-110"></div>
        {/* <div className="absolute top-[150px] right-[-200px] size-120 rounded-full bg-[radial-gradient(circle,_#AB39E84D_0%,_#050A0E_100%)] blur-2xl md:top-[300px] md:size-110"></div> */}
      </div>
    </>
  );
};

export default BackgroundGradient;
