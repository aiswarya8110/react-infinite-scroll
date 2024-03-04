import React, { useState, useEffect } from 'react';
import loader from './assets/loader.svg';
const App = ()=>{
   const [loading, setLoading ] = useState(true);
   const [ fetching, setFetching ] = useState(true);
   const [ images, setImages ] = useState([]);

   const fetchData = async()=>{
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.API_KEY}&count=10`);
        const data = await response.json();
        // console.log(data);
        setImages([...images, ...data]);
        setLoading(false);
        setFetching(false);
   }

   useEffect(()=>{
    // console.log("useEffect 1");
    const handleScroll = ()=>{
        if(scrollY > document.body.scrollHeight - 2000){
            setFetching(true);
        }
    }
    window.addEventListener("scroll", handleScroll)

    return ()=> {
        removeEventListener("scroll", handleScroll);
    }
   },[])
   
   useEffect(()=>{
    // console.log("useEffect 2");
        if(fetching){
            fetchData();
        };

   }, [fetching])

   return (
    <div className='flex flex-col justify-center items-center'>
        <h2 className='text-4xl my-8 font-bold'>Infinite Scroll</h2>
        {loading ? <img src={loader} alt="loading-img" /> : (
        <div className="w-1/2">
            {images.map((item, i)=><img className='w-full object-cover' key={`item.id${i}`} src={item.urls.regular} />)}
        </div>
        )
        }
    </div>
    )
}

export default App;