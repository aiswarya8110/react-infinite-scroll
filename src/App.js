import React, { useState, useEffect } from "react";
import loader from "./assets/loader.svg";
const App = () => {
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [images, setImages] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=${process.env.API_KEY}&count=10`
    );
    const data = await response.json();
    setImages([...images, ...data]);
    setLoading(false);
    setFetching(false);
  };

  useEffect(() => {
    // console.log("useEffect 1");
    const handleScroll = () => {
      if (scrollY > document.body.scrollHeight - 2000) {
        setFetching(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log("useEffect 2");
    if (fetching) {
      fetchData();
    }
  }, [fetching]);

  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-r from-violet-500 to-gray-800">
      <div className="fixed top-0 left-0 right-0 backdrop-blur-md bg-gray-800/45 z-[999]">
        <h2 className="text-5xl font-bold font-bitter py-10 text-center">
          Seamless Scrolling
        </h2>
      </div>
      {loading ? (
        <img src={loader} alt="loading-img" />
      ) : (
        <div className="container pt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 md:px-10 lg:px-20 gap-10">
          {images.map((item, i) => (
            <div key={`item.id${i}`} className="my-auto">
              <img
                className="w-full object-cover rounded-2xl mb-10 hover:scale-105 transition duration-300 shadow-2xl border-[10px] border-white"
                src={item.urls.regular}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
