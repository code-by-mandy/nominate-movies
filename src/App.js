import {useState} from 'react';
import Search from './Search';
import List from './List';

function App() {
  
  //states for search string and whether search form has been submitted 
  const [searchString, setSearchString] = useState("");
  const [newSearch, setNewSearch] = useState(false);

  //if search form submitted, set newSearch state to true to trigger getMovies function
  const searched = (e) => {
    e.preventDefault();
    setNewSearch(true);
  }
  
  //get movies from API
  const [resultsArray, setResultsArray] = useState([]);

  const getMovies = (searchInput) => {
      const url = new URL(`http://www.omdbapi.com/`);
      url.search = new URLSearchParams({
        apikey: "defd63df",
        s: searchInput,
      });
      fetch(url)
        .then(results => {
          return results.json();
        }).then(data => {
          setResultsArray(data.Search);
        })
  }

  //if newSearch state is true (if search form was submitted), call getMovies with searchString value and reset newState to false.
  if (newSearch) {
    getMovies(searchString);
    setNewSearch(false);
  }

  //on click, nominate or remove movie
  const [nominees, setNominees] = useState([]);
  // const [inConsideration, setInConsideration] = useState([]);

  //nominate movie
  const nominate = (nomineeObj) => {

    //add nominated movie to nominee array
    const updatedNominees = [...nominees];
    updatedNominees.push(nomineeObj);
    setNominees(updatedNominees);
    
    //toggle nominate button disable attribute
    const resultsArrayCopy = [...resultsArray];
    nomineeObj.disabled=true;
    setResultsArray(resultsArrayCopy);
  }

  //remove movie
  const remove = (removeMovie) => {

    //remove clicked movie from nominee array
    const oldNominees = [...nominees];
    const updatedNominees = oldNominees.filter(filteredMovie => filteredMovie !== removeMovie);
    setNominees(updatedNominees);

    //toggle nominate button disable attribute
    const resultsArrayCopy = [...resultsArray];
    removeMovie.disabled=false;
    setResultsArray(resultsArrayCopy);
  }

  return (
    <div>
      <h1>Nominate Movies!</h1>
      <p>Nominate up to five movies for the Amazing Damazing Movie Award!</p>
      <Search getSearchString = {(searchInput) => setSearchString(searchInput)} resetSearch = {searched}/>
      <div className="nomination">
          <div className="searchResults">
            <h2>Search results for "{searchString}"</h2>
            <ul>
                {resultsArray.map(  
                  (movie) => {
                        return (
                        <List 
                          key={`${movie.imdbID}`} 
                          movie = {movie} 
                          nominate={nominate} 
                          button={'Nominate'}
                          disabled={movie.disabled}
                          />
                        )
                    }
                )}
              </ul>
          </div>
          <div className="nominees">
            <h2>Nominees</h2>
            <ul>
              {nominees.map( 
                (movie) => {
                    return (
                      <List 
                        key={`nominee${movie.imdbID}`} 
                        movie = {movie} 
                        nominate={remove} 
                        button={'Remove'}
                        disabled={false}
                        />
                    )
                  }
              )}
            </ul>
          </div>
      </div>
    </div>
  );
}  

export default App;
