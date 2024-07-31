import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";

function App() {

    let [watchlist,setWatchList] = useState([])

        
    let handleAddtoWatchList = (movieObj)=>{
        let newWatchList = [...watchlist , movieObj]
        localStorage.setItem('moviesApp' , JSON.stringify(newWatchList))
        
        setWatchList(newWatchList)
        console.log(newWatchList)
    }

    let handleRemoveFromWatchList = (movieObj) =>{
        let filteredWatchList = watchlist.filter((movie)=>{
            return movie.id != movieObj.id
        })
        localStorage.setItem('moviesApp' , JSON.stringify(filteredWatchList))
        setWatchList(filteredWatchList)
    }

    useEffect(()=>{
      let moviesFromLocalStorage = localStorage.getItem('moviesApp')
      if(!moviesFromLocalStorage){
        return
      }
      setWatchList(JSON.parse(moviesFromLocalStorage))
    },['moviesApp'])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist}/>
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
