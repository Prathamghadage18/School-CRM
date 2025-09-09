import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const ImageSlider = ({ slideImages, autoPlay = true, interval = 5000 }) => {
  const [counter, setCounter] = useState(0);
  const slidesRef = useRef(null);
  const timeoutRef = useRef(null);

  const goPrev = () => {
    setCounter((prev) =>
      prev === 0 ? slideImages.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCounter((prev) =>
      prev === slideImages.length - 1 ? 0 : prev + 1
    );
  };

  // Auto slide with cleanup
  useEffect(() => {
    if (autoPlay) {
      timeoutRef.current = setTimeout(goNext, interval);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [counter, autoPlay, interval]);

  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${counter * 100}%)`;
    }
  }, [counter]);

  return (
    <div
      className="relative w-full h-full overflow-hidden shadow-xl group"
      onMouseEnter={() => clearTimeout(timeoutRef.current)} // pause on hover
      onMouseLeave={() =>
        (timeoutRef.current = setTimeout(goNext, interval))
      } // resume
    >
      {/* Slides */}

      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        ref={slidesRef}
      >
        {slideImages.map((ele, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={ele.img}
              alt={ele.title}
              className="object-cover brightness-50 w-full h-full"
            />

            <div className="absolute inset-0 bg-animated"></div>

            {/* Slide Content */}
            <div className="sm:w-1/2 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-white text-center">
              <p className="sm:text-7xl text-5xl font-bold uppercase text-left drop-shadow-lg">
                {ele.title}
              </p>
              <hr className="my-4 ml-1 border-white/70" />
              <p className="text-left ml-1 text-gray-200">{ele.description}</p>

              <div className="flex gap-4 mt-6 justify-start text-sm text-black">
                <button className="sm:px-6 sm:py-3 px-4 py-2 rounded-lg bg-white  transition shadow">
                  {ele.buttonText1}
                </button>
                <button className="sm:px-6 sm:py-3 px-4 py-2 rounded-lg bg-gray-200  transition shadow">
                  {ele.buttonText2}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-20 w-full flex justify-end gap-4 items-center px-4 transform -translate-y-1/2">
        <button
          className="text-white sm:text-5xl text-3xl hover:scale-110 transition"
          onClick={goPrev}
        >
          <BsArrowLeftCircle />
        </button>
        <button
          className="text-white sm:text-5xl text-3xl hover:scale-110 transition"
          onClick={goNext}
        >
          <BsArrowRightCircle />
        </button>
      </div>

      {/* Dots Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex sm:gap-3 gap-1">
        {slideImages.map((_, ind) => (
          <button
            key={ind}
            onClick={() => setCounter(ind)}
            className={`sm:w-4 sm:h-4 w-2 h-2 rounded-full transition-all duration-300 ${counter === ind ? "bg-white scale-125 shadow-lg" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
