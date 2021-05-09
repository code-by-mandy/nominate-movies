const Results = ({resultsArray, nominate}) => {


    return (
        <div>  
            <h3>Search Results</h3>
            <ul>
                {resultsArray.map( 
                    (movie) => {
                        return (
                        <li key={movie.imdbID}>
                            <p>{movie.Title}</p>
                            <p>{movie.Year}</p>
                            <button onClick={() => nominate(movie)}>Nominate</button>
                        </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}

export default Results