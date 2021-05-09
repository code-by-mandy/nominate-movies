const List = ({movie, nominate, button, disabled}) => {

    return(
        <>
        <li>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <button onClick={() => nominate(movie)} disabled={disabled}>{button}</button>
        </li>
        </>
    );
}

export default List