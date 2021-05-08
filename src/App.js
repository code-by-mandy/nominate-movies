import {useState, useEffect} from 'react';
import Search from './Search';
import Results from './Results';
import Nominees from './Nominees';

function App() {
  
  //get movies from API

  const [resultsArray, setResultsArray] = useState([]);

  const getMovies = (searchString) => {
    const url = new URL(`http://www.omdbapi.com/`);
    url.search = new URLSearchParams({
      apikey: "defd63df",
      s: searchString
    });
    fetch(url)
      .then(results => {
        return results.json();
      }).then(data => {
        setResultsArray(data.Search);
      })
  }

  useEffect (() => {
    getMovies("guardian");
  }, [])
  

  return (
    <div>
      <h1>Nominate Movies!</h1>
      <p>Nominate up to five movies for the Amazing Damazing Movie Award!</p>
      <Search />
      <div className="nomination">
          <Results resultsArray = {resultsArray}/>
          <Nominees />
      </div>
    </div>
  );
}

export default App;
