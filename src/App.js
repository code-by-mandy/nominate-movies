import ReactModal from "react-modal";
import {useState, useEffect} from 'react';
import Search from './components/Search';
import List from './components/List';
import PopUp from './components/PopUp'

function App () {   

  //states for search string and whether search form has been submitted 
  const [searchString, setSearchString] = useState("");
  const [newSearch, setNewSearch] = useState(false);

  //if search form submitted, set newSearch state to true to trigger getMovies function
  const searched = (e) => {
    e.preventDefault();
    setNewSearch(true);
  }

  //state for storing movie results from API and boolean state for any API errors
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);

  //api call
  const getMovies = (searchInput) => {
      const url = new URL(`https://www.omdbapi.com/`);
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
        }).catch(() => {
          setErrorMsg(true);
        })
  }

  //helper function for toggling button disabled attribute per nomination
  const moviesButtonProp = (array) => {
    const nomineeArray = [...nominees];
    array.forEach(item => {
      item.nominated = false;
      nomineeArray.forEach(nominated => {
        if ((item.Title === nominated.Title) && (item.Year === nominated.Year)) {
          item.nominated = true;
        } 
      })
      if (item.nominated || nominees.length === 3) {
        item.disabled=true;
      } else {
        item.disabled=false;
      }
    });
    setResults(array);
    setErrorMsg(false);
  }

  //array state for storing nominated movies
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

  //helper function to filter for unique API results; array passed is of api results
  const getUnique = (array) => {

    const movieIDs = []
    array.forEach (item => {
      movieIDs.push(item.imdbID)
    })          
    
    const duplicateID = movieIDs.filter((movie, index) => movieIDs.indexOf(movie) !== index);
    const duplicateIDIndex = movieIDs.indexOf(duplicateID[0]);
    const uniqueArray = array.filter(movie => array.indexOf(movie) !== duplicateIDIndex);
    return uniqueArray;
  } 

  //pop up states
  const [showModal, setShowModal] = useState(false);
  const [noPopUp, setNoPopUp] = useState(false);


  useEffect (() => {
    if (nominees.length === 3 && !noPopUp ) {
      setShowModal(true);
    }
  }, [nominees, noPopUp])
  
  ReactModal.setAppElement('#root');

  //media query for search results width at 0 nominations
  useEffect (() => {
    const resultsBox = document.querySelector('.searchResults');
    const nomineesBox = document.querySelector('.nominees');

    if (nominees.length === 0) {
      resultsBox.classList.add("noNominations");
      nomineesBox.classList.add("noNominations");
    } else {
      resultsBox.classList.remove("noNominations");
      nomineesBox.classList.remove("noNominations");
    }
  })

  return (
    <div className='wrapper'>
      <header>
        <h1>Saturday Night Nominations</h1>
        <h2>Nominate up to three movies to watch this weekend!</h2>
      </header>
      <main>
        <div className="search">
          <p>To begin, search for a movie title:</p>
          <Search 
            getSearchString = {(searchInput) => setSearchString(searchInput)} 
            resetSearch = {searched}
          />
        </div>
        <div className="nomination">
          <div className="searchResults">
            {
              (!searchString && nominees.length >= 1) || searchString === ""
              ? <h3>Search for a movie you'd like to nominate!</h3>
              : errorMsg || !searchString 
              ? <h3>Hmmm.. looks like your search had no results. Try searching a different movie title!</h3> 
              : <h3>Search results for "{searchString}"</h3>
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
              (errorMsg || !searchString) && nominees.length < 1 
              ? null 
              : nominees.length === 1 
              ? <h3>You've nominated {nominees.length} movie:</h3> 
              : nominees.length > 1 && nominees.length < 3 
              ? <h3>You've nominated {nominees.length} movies:</h3> 
              : nominees.length === 3 
              ? <div>
                  <h3>You've nominated 3 movies!</h3> 
                </div>
              : <h3>You've nominated 0 movies</h3>
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

            {
              nominees.length === 3 ?
              <p className="tip"><em>Tip: to nominate a different movie, remove a movie.</em></p> :
              null
            }
            {/* Pop-up when number of nominees reach three */}
            <ReactModal 
              className="contentCSS"
              overlayClassName="overlayCSS"
              isOpen={showModal}
              contentLabel={"You're all set pop up"}
              onRequestClose={() => setShowModal(false)}              
            >                
              <PopUp 
                close={() => setShowModal(false)} 
                noPopUp={() => setNoPopUp(true)}
              />         
            </ReactModal> 
          </div>          
        </div>
      </main>
      <footer>
        <p>Mandy Poon &#169; 2021 | <a href="https://github.com/code-by-mandy/nominate-movies">Github repository</a> | Inspired by a tech challenge</p>
      </footer>
    </div>
  );
}  

export default App;
