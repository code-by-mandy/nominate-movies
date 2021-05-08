import {useState} from 'react';
import Search from './Search';
import Results from './Results';
import Nominees from './Nominees';

function App() {
  let searchInput = "";

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

  getMovies("guardian");

  return (
    <div>
      <h1>Nominate Movies!</h1>
      <p>Nominate up to five movies for the Amazing Damazing Movie Award!</p>
      <Search />
      <div className="nomination">
          <Results />
          <Nominees />
      </div>
    </div>
  );
}

export default App;
