import React from "react";

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 anime">
      <section className="loader">
        <div className="slider" style={{ "--i": 0 }}></div>
        <div className="slider" style={{ "--i": 1 }}></div>
        <div className="slider" style={{ "--i": 2 }}></div>
        <div className="slider" style={{ "--i": 3 }}></div>
        <div className="slider" style={{ "--i": 4 }}></div>
      </section>
    </div>
  );
};

export default Loading;


