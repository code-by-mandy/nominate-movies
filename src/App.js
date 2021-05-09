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
  const [results, setResults] = useState([]);

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
          const resultsRaw = data.Search;
          moviesButtonProp(getUnique(resultsRaw));
        })
  }

  const moviesButtonProp = (array) => {
    const nomineeArray = [...nominees];
    array.forEach(item => {
      item.nominated = false;
      nomineeArray.forEach(nominated => {
        if ((item.Title === nominated.Title) && (item.Year === nominated.Year)) {
          item.nominated = true;
        } 
      })
      if (item.nominated) {
        item.disabled=true;
      } else {
        item.disabled=false;
      }
    });
    setResults(array);
  }

  //on click, nominate or remove movie
  const [nominees, setNominees] = useState([]);

  //nominate movie
  const nominate = (nomineeObj) => {

    //add nominated movie to nominee array
    const updatedNominees = [...nominees];
    updatedNominees.push(nomineeObj);
    setNominees(updatedNominees);
    
    //update results array via new search so movie.display values are refreshed
    setNewSearch(true);
  }

  //remove movie
  const remove = (removeMovie) => {

    //remove clicked movie from nominee array
    const oldNominees = [...nominees];
    const updatedNominees = oldNominees.filter(filteredMovie => filteredMovie !== removeMovie);
    setNominees(updatedNominees);

    //update results array via new search so movie.display values are refreshed
    setNewSearch(true);
  }

   //if newSearch state is true (if search form was submitted), call getMovies with searchString value and reset newState to false.
   if (newSearch) {
    getMovies(searchString);
    setNewSearch(false);
   }

   

  //helper function to filter for unique API results; array passed is directly from api results
  const getUnique = (array) => {

    //create movieIDs array of imdbID values of each object returned from API search
    const movieIDs = []
    array.forEach (item => {
      movieIDs.push(item.imdbID)
    })          
    
    //get duplicate value in movieIDs array
    const duplicateID = movieIDs.filter((movie, index) => movieIDs.indexOf(movie) !== index);

    //get index of duplicate value in movieIDs array
    const duplicateIDIndex = movieIDs.indexOf(duplicateID[0]);

    //filter out object with same index in api results array
    const uniqueArray = array.filter(movie => array.indexOf(movie) !== duplicateIDIndex);

    //return filtered array with unique objects
    return uniqueArray;
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
                {results.map(  
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
