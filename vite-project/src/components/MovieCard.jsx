import React from "react";

function MovieCard({
  poster_path,
  name,
  handleAddtoWatchList,
  movieObj,
  handleRemoveFromWatchList,
  watchlist
}) {
  function doesContain(movieObj){
    for(let i=0; i<watchlist.length; i++) {
      if(watchlist[i].id == movieObj.id){
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[44vh] w-[150px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://tmdb.org/t/p/original/${poster_path})`
      }}
    >
      {doesContain(movieObj) ? (
        <div onClick={()=>handleRemoveFromWatchList(movieObj)} className="m-4 flex justify-center h-8 w-8 items-center rounded-xl bg-gray-900/80">
          &#10060;
        </div>
      ):(
        <div
          onClick={()=>handleAddtoWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-xl bg-gray-900/80"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
