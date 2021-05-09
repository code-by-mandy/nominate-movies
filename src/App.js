import {useState, useEffect} from 'react';
import Search from './Search';
import Results from './Results';
import Nominees from './Nominees';

function App() {
  
  //get search string 

  const [searchString, setSearchString] = useState("");
  const [newSearch, setNewSearch] = useState(false);

  //if search form submitted, set newSearch state to true to trigger getMovies function
  const searched = (e) => {
    e.preventDefault();
    setNewSearch(true);
  }
  
  //get movies from API

  const [resultsArray, setResultsArray] = useState([]);

  const getMovies = (searchparam) => {
      const url = new URL(`http://www.omdbapi.com/`);
      url.search = new URLSearchParams({
        apikey: "defd63df",
        s: searchparam,
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

  //on click, nominate movie
  const [nominees, setNominees] = useState([]);

  const nominate = nomineeObj => {
    const updatedNominees = [...nominees];
    // const updatedNominees = []
   
    // // check if movie is already there
    // oldNominees.map(movie => {
    //   if (movie !== nomineeObj) {
    //     updatedNominees.push(movie);
    //     return(
    //      updatedNominees
    //     )
    //   }
    // })
    updatedNominees.push(nomineeObj);
    setNominees(updatedNominees);
  }

  // onclick, remove movie
  const remove = removeMovie => {
    const oldNominees = [...nominees];
    const updatedNominees = oldNominees.filter(filteredMovie => filteredMovie !== removeMovie)
    setNominees(updatedNominees);
  }


  return (
    <div>
      <h1>Nominate Movies!</h1>
      <p>Nominate up to five movies for the Amazing Damazing Movie Award!</p>
      <Search getSearchString = {(searchInput) => setSearchString(searchInput)} resetSearch = {searched}/>
      <div className="nomination">
          <Results resultsArray = {resultsArray} nominate={nominate}/>
          <Nominees nominees={nominees} remove={remove}/>
      </div>
    </div>
  );
}  

export default App;
