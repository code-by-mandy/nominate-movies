const Nominees = ({nominees}) => {
    return (
        <div>  
        <h3>Nominated</h3>
            <ul>
            {nominees.map( 
                    (movie) => {
                        return (
                        <li key={movie.imdbID}>
                            <p>{movie.Title}</p>
                            <p>{movie.Year}</p>
                            <button>Remove</button>
                        </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}

export default Nominees