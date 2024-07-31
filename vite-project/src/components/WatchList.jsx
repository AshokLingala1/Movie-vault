import React, { useEffect, useState } from "react";
import genereids from "../utility/gener";
import handleRemoveFromWatchList from "../App"
function WatchList({ watchlist , setWatchList, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(['All Genres'])
  const [currGenre, setCurrGenre] = useState('All Genres')


  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter=(genre)=>{
    setCurrGenre(genre)
  }

  let sortIncreasing = () =>{
    let sortedIncreasing =   watchlist.sort((movieA, movieB) =>{
        return movieA.vote_average - movieB.vote_average
      })

      setWatchList([...sortedIncreasing])
  }

  let sortDecreasing = () =>{
    let sortedDecreasing= watchlist.sort((movieA, movieB) =>{
      return movieB.vote_average - movieA.vote_average
    })

    setWatchList([...sortedDecreasing])
  }


  let sortPopIncreasing = () =>{
    let popIncreasing = watchlist.sort((movieA,movieB)=>{
      return movieA.popularity - movieB.popularity
    })
    setWatchList([...popIncreasing])
  }
  let sortPopDecreasing = () =>{
    let popDecreasing = watchlist.sort((movieA,movieB)=>{
      return movieB.popularity - movieA.popularity
    })
    setWatchList([...popDecreasing])

  
  }
  useEffect(()=>{
    let temp= watchlist.map((movieObj)=>{
      return genereids[movieObj.genre_ids[0]]
    })

    temp = new Set(temp)
    setGenreList(['All Genres',...temp])
  },[watchlist])


  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre)=>{
            return <div onClick={()=>handleFilter(genre)} className={currGenre == genre?"flex justify-center h-[3rem] w-[9rem]  bg-blue-400 text-white font-bold rounded-xl items-center mx-4 my-4" : "flex justify-center h-[3rem] w-[9rem]  bg-gray-400/50 text-white font-bold rounded-xl items-center mx-4 my-4"}>
          {genre}
        </div>
        })}
        
      </div>

      <div className="flex justify-center my-4">
        <input
          placeholder="search movie"
          onChange={handleSearch}
          value={search}
          className="bg-gray-200 h-[3rem] w-[18rem] outline-none px-4"
          type="text"
        />
      </div>
      <div className="border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2"><i className="fa-solid fa-arrow-up"></i></div>
                  <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2"><i className="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>
                <div className=" flex flex justify-center"><span onClick={sortPopIncreasing} className="p-2 flex"><i className="fa-solid fa-arrow-up"></i></span>
                  <span className="flex">Popularity</span>
                <span onClick={sortPopDecreasing} className="p-2 flex"><i className="fa-solid fa-arrow-down"></i></span></div>
              </th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj)=>{
                if(currGenre=='All Genres'){
                    return true
                }else{
                  return genereids[movieObj.genre_ids[0]]==currGenre;
                }
            }).filter((movieObj) => {
                return movieObj.original_title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center">
                      <img
                        className="h-[10 rem] w-[6rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      />
                      <div className="mx-10">{movieObj.original_title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genereids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handleRemoveFromWatchList(movieObj)} className="text-red-800"><button>Delete</button></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
