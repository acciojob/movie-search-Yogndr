
import React, { useEffect, useState } from "react";
import './../styles/App.css';



const App = () => {
  const[movie,setMovie]=useState("");
  const[fullinfo,setFullInfo]=useState([]);
  const[error,setError]=useState("")

  
   const fetchmovies=async()=>{
    try{
      const response=await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movie)}&apikey=99eb9fd1`)
      const ans=await response.json();

      if(ans.Response==="True"){
      setFullInfo(ans.Search);
    setError("");}
    else{
      setFullInfo([]);
      setError("Invalid movie name. Please try again.")
    }

    }
   catch (err) {
      console.error("Fetch error:", err);
      setFullInfo([]);
      setError("Something went wrong. Please try again.");
    }
    

   }
  return (
    <div>
      
       Search
       <br/>
       <input type="text" value={movie} onChange={(e)=>{
        setMovie(e.target.value)
       }}/>
       <button type="submit" onClick={fetchmovies} >Search</button>
       <form>
       {error && <p className="error">{error}</p>}
       <ul>
        {fullinfo.map((info)=>(
          <li key={info.imdbID}>
            <h4>{info.Title} {info.Year}</h4>
            <img src={info.Poster!=="N/A"?info.Poster:"https://via.placeholder.com/100"}
            alt={info.Title}
            width="100"/>
          </li>

        ))}
       </ul>
       </form>
      
    </div>
  )
}

export default App
