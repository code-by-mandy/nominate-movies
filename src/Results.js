const Results = ({resultsArray}) => {

    return (
        <>
            <ul>
                {resultsArray.map( 
                    (movie) => {
                        return (
                        <li key={movie.imdbID}>
                            <p>{movie.Title}</p>
                            <p>{movie.Year}</p>
                            <button>Nominate</button>
                        </li>
                        )
                    }
                )}
            </ul>
        </>
    )
}

export default Results