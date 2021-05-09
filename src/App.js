import ReactModal from "react-modal";
import {useState, useEffect} from 'react';
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
  const [errorMsg, setErrorMsg] = useState(false);

  const getMovies = (searchInput) => {
      const url = new URL(`http://www.omdbapi.com/`);
      url.search = new URLSearchParams({
        apikey: "defd63df",
        s: searchInput,
        type: "movie",
      });
      fetch(url)
        .then(results => {
          return results.json();
        }).then(data => {
          const resultsRaw = data.Search;
          moviesButtonProp(getUnique(resultsRaw));
        }).catch(error => {
          setErrorMsg(true);
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
      if (item.nominated || nominees.length === 5) {
        item.disabled=true;
      } else {
        item.disabled=false;
      }
    });
    setResults(array);
    setErrorMsg(false);
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

  //pop up if nominees reach five
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  useEffect (() => {
    if (nominees.length === 5 && !closeModal) {
      setShowModal(true);
    } else if (nominees.length === 5 && closeModal) {
      setShowModal(false);
    }
  }, [nominees, closeModal])
  
  ReactModal.setAppElement('#root');

  return (
    <div>
      <h1>Nominate Movies!</h1>
      <p>Nominate up to five movies for the Amazing Damazing Movie Award!</p>
      <Search 
        getSearchString = {(searchInput) => setSearchString(searchInput)} 
        resetSearch = {searched}
      />
      <div className="nomination">
          <div className="searchResults">
            {
              !searchString ?
              <h2>Search for a movie you'd like to nominate!</h2>
              :
              errorMsg ?
              <h2>Hmmm.. looks like your search had no results. Try searching a different movie title!</h2> :
              <h2>Search results for "{searchString}"</h2>
            }
            
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
            
            {
              (errorMsg || !searchString) && nominees.length < 1 ?
              null :
              nominees.length === 1 ?
              <h2>You've nominated {nominees.length} movie:</h2> :
              nominees.length > 1 ?
              <h2>You've nominated {nominees.length} movies:</h2> :
              <h2>You've nominated 0 movies</h2>
            }
            
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

              <ReactModal
                isOpen={showModal}
                aria={{
                  labelledby: "heading",
                  describedby: "full_description"
                }}
                onRequestClose={() => setCloseModal(true)}
              >
              <h1 id="heading">You've reached five nominees!</h1>
              <p>To keep nominating, you'll have to remove at least one movie from your nominations list.</p>
              <button onClick={() => setCloseModal(true)}>Close</button>
            </ReactModal> 
            
          </div>
      </div>
    </div>
  );
}  

export default App;
