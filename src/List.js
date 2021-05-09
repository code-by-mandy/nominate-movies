const List = ({movie, nominate, button, disabled}) => {

    const clickHandler = (movie) => {
        nominate(movie);
        // toggle(movie);
    }
    return(
        <>
        <li>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <button onClick={() => clickHandler(movie)} disabled={disabled}>{button}</button>
        </li>
        </>
    );
}

export default List